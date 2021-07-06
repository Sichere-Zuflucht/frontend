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
  _.merge(data, {
    verifySetting: {
      isVerifying: false,
      verified: false,
    },
    stripe: false,
    createdAt: new Date(),
    public: {
      userName,
      avatar: 'https://picsum.photos/seed/' + userName + '/200',
      membership,
    },
  })

  functions.logger.log('create user', data)
  functions.logger.log('with id', context.auth.uid)
  // admin.firestore().collection('memberships').doc().create({})
  return admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .set(data)
    .then(() => context.auth.token)
})

exports.setInfo = functions.https.onCall((info, context) => {
  // todo verify info here
  return admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .set({ public: { info } }, { merge: true })
})

exports.setVerify = functions.https.onCall((verifySetting, context) => {
  // todo verify info here
  return admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .set({ verifySetting }, { merge: true })
})
