const functions = require('firebase-functions')
const admin = require('firebase-admin')

const {
  coachInitialMail,
  womanSuggestedDates,
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

exports.getRequestsRealtime = functions.https.onCall((data, context) => {
  const p = new Promise((resolve, reject) => {
    admin
      .firestore()
      .collection('requests')
      .where('ids', 'array-contains', context.auth.uid)
      .onSnapshot((snap) => {
        const requests = []
        snap.docs.forEach((u, i) => {
          requests.push({
            id: u.id,
            ...u.data(),
          })
          if (i === snap.docs.length - 1) {
            resolve(requests)
          }
        })
      })
  })
  p.then((res) => {
    return res
  })
  return p
})

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
      suggestions: [],
      womanUserName: womanData.userName,
      womanAvatar: womanData.avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
})

exports.addSuggestions = functions.https.onCall(async (data, context) => {
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
              womanSuggestedDates(
                data.coachName,
                data.suggestions,
                requestData.womanId
              )
            ),
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
            jitsiLink: data.jitsiLink,
            redLink: data.redLink,
          },
          { merge: true }
        )
    })
})
