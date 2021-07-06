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

exports.setInfo = functions.https.onCall((info, context) => {
  // todo verify info here
  return admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .collection('public')
    .doc('data')
    .set({ info }, { merge: true })
})

exports.setVerify = functions.https.onCall((verifySetting, context) => {
  // todo verify info here
  return admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .collection('private')
    .doc('data')
    .set({ verifySetting }, { merge: true })
})
