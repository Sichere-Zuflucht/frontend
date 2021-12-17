const _ = require('lodash')

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const firebaseTools = require('firebase-tools')

exports.create = functions.https.onCall(async (data, context) => {
  const membership = admin
    .firestore()
    .collection('memberships')
    .doc(data.public.membership)

  // eslint-disable-next-line no-unused-vars
  const membershipData = (await membership.get()).data()
  // add custom claim for page restriction
  const claims = {
    membership: membershipData.id,
    routing: membershipData.routing,
  }
  await admin.auth().setCustomUserClaims(context.auth.uid, claims)

  // todo do verification of data (i.e. all inputs not empty etc.)
  const userName = context.auth.uid.substr(0, 8)
  _.merge(data.public, {
    userName,
    // avatar: data.public.avatar, // : base + '/coach-avatar.jpg', // 'https://picsum.photos/seed/' + userName + '/200',
    membership,
    info: false,
  })

  _.merge(data.private, {
    verifySetting: {
      isVerifying: false,
      verified: false,
    },
    stripe: false,
    createdAt: new Date(),
  })

  functions.logger.log('create user', data)
  functions.logger.log('with id', context.auth.uid)
  // admin.firestore().collection('memberships').doc().create({})
  const docRef = admin.firestore().collection('users').doc(context.auth.uid)
  docRef.set({})
  await docRef.collection('public').doc('data').set(data.public)
  await docRef.collection('private').doc('data').set(data.private)
  return _.merge(context.auth.token, claims)
})

exports.setData = functions.https.onCall(({ data, priv }, context) => {
  // todo verify data here
  // i.e. this should not be able to tinker with the verification stuff
  if ('verifySetting' in Object.keys(data)) return false
  return admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .collection(priv ? 'private' : 'public')
    .doc('data')
    .set(data, { merge: true })
})

exports.getCoaches = functions.https.onCall(async (data, context) => {
  // find private docs with fulfill the criteria coach
  const search = await admin
    .firestore()
    .collectionGroup('private')
    .where('verifySetting.verified', '==', true)
    .get()

  functions.logger.log('search:', search)

  // get the parent and its id
  // then traverse back down to the public folder
  // return both
  return Promise.all(
    search.docs.map(async (doc) => {
      return {
        uid: doc.ref.parent.parent.id,
        ...(
          await doc.ref.parent.parent.collection('public').doc('data').get()
        ).data(),
      }
    })
  )
})

exports.delete = functions.https.onCall(async (uid, context) => {
  // delete requests
  await admin
    .firestore()
    .collection('requests')
    .where('ids', 'array-contains', uid)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        doc.ref.delete()
      })
    })

  // delete user in auth
  await admin.auth().deleteUser(uid)
  // delete user in firestore
  return await firebaseTools.firestore.delete('/users/' + uid, {
    project: process.env.GCLOUD_PROJECT,
    recursive: true,
    yes: true,
  })
})
