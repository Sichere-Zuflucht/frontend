const _ = require('lodash')

const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.create = functions.https.onCall(async (data, context) => {
  const membership = await admin
    .firestore()
    .collection('memberships')
    .doc(data.public.membership)

  // todo do verification of data (i.e. all inputs not empty etc.)
  const userName = context.auth.uid.substr(0, 8)
  _.merge(data.public, {
    userName,
    avatar: 'https://picsum.photos/seed/' + userName + '/200',
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
  return context.auth.token
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
