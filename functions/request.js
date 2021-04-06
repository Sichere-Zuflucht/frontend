const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { coachInitialMail } = require('./emailTemplates')

exports.sendRequest = functions.https.onCall((data, context) => {
  admin
    .firestore()
    .collection('requests')
    .add({
      eMails: [coachInitialMail(data.coachName, data.message, data.coachUID)],
      coachAnswered: false,
    })
    .then(function (docRef) {
      admin
        .firestore()
        .collection('users')
        .doc(context.auth.uid)
        .collection('requests_new')
        .doc(docRef.id)
        .set({ ref: docRef })
      admin
        .firestore()
        .collection('users')
        .doc(data.coachUID)
        .collection('requests_new')
        .doc(docRef.id)
        .set({ ref: docRef })
    })
})
