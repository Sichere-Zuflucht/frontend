const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { sendRequestDeleted } = require('./email')

const {
  coachInitialMail,
  // womanSuggestedDates,
  coachAcceptedDate,
} = require('./emailTemplates')

exports.getRequests = functions.https.onCall((data, context) => {
  return admin
    .firestore()
    .collection('requests')
    .where('ids', 'array-contains', context.auth.uid)
    .get()
    .then((snap) => {
      const data = []
      snap.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      })
      return data
    })
})

exports.sendRequest = functions.https.onCall(async (data, context) => {
  const womanData = await admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .collection('public')
    .doc('data')
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
      suggestions: [],
      womanUserName: womanData.userName,
      womanAvatar: womanData.avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
})

// maybe interesting for later, if sichere zuflucht account is existing
/* exports.sendHousingRequest = functions.https.onCall(async (data, context) => {
  const womanData = await admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .get()
    .then((doc) => doc.data())

  await admin
    .firestore()
    .collection('houseRequests')
    .add({
      eMails: housingInitialMail(
        womanData.userName,
        data.message,
        context.auth.uid
      ),
      gotAnswer: false,
      womanId: context.auth.uid,
      message: data.message,
      womanUserName: womanData.userName,
      womanAvatar: womanData.avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
}) */

exports.addSuggestions = functions.https.onCall(async (data, context) => {
  // get the inital request
  await admin
    .firestore()
    .collection('requests')
    .doc(data.requestId)
    .get()
    .then((ref) => {
      // const requestData = ref.data()

      // update request
      admin.firestore().collection('requests').doc(data.requestId).set(
        {
          /* eMails: admin.firestore.FieldValue.arrayUnion(
              womanSuggestedDates(
                data.coachName,
                data.suggestions,
                requestData.womanId
              )
            ), */
          suggestions: data.suggestions,
          coachAnswered: true,
          videoType: data.videoType,
          updatedAt: new Date(),
        },
        { merge: true }
      )
    })
})

exports.acceptDate = functions.https.onCall(async (data, context) => {
  // get the inital request
  await admin
    .firestore()
    .collection('requests')
    .doc(data.requestId)
    .get()
    .then((ref) => {
      const requestData = ref.data()

      // update request
      admin
        .firestore()
        .collection('requests')
        .doc(data.requestId)
        .set(
          {
            eMails: admin.firestore.FieldValue.arrayUnion(
              coachAcceptedDate(
                data.coachName,
                data.acceptedDate,
                requestData.coachId
              )
            ),
            acceptedDate: data.acceptedDate,
            updatedAt: new Date(),
            video: data.video,
          },
          { merge: true }
        )
    })
})

exports.delete = functions.https.onCall((data, context) => {
  const docRef = admin.firestore().collection('requests').doc(data.docId)
  return docRef.get().then((doc) => {
    if (doc.data().ids.includes(context.auth.uid)) {
      sendRequestDeleted(doc.data().acceptedDate || {}) // .date)
      return docRef.delete()
    }
    return false
  })
})
