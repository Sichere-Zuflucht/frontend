const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { coachInitialMail } = require('./emailTemplates')

exports.sendRequest = functions.https.onCall(async (data, context) => {
  const womanData = await admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .get()
    .then((doc) => doc.data())

  await admin
    .firestore()
    .collection('requests')
    .add({
      eMails: [coachInitialMail(data.coachName, data.message, data.coachUID)],
      coachAnswered: false,
      coachId: data.coachUID,
      womanId: context.auth.uid,
      ids: [data.coachUID, context.auth.uid],
      message: data.message,
      dates: [],
      womanUserName: womanData.userName,
      womanAvatar: womanData.avatar,
    })
})

exports.getRequests = functions.https.onCall((data, context) => {
  return admin
    .firestore()
    .collection('requests')
    .where('ids', 'array-contains', context.auth.uid)
    .get()
    .then((snap) => {
      const data = []
      snap.forEach((doc) => {
        data.push(doc.data())
      })
      return data
    })
})
