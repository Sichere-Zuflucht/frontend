const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
admin.initializeApp()

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: 'apikey',
    pass: functions.config().sendmail.sendgridkey,
  },
})

async function sendMail(uid, notificationObject) {
  const { email } = await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then((snap) => snap.data())

  const mailOptions = {
    from: 's.fellner@sichere-zuflucht.de',
    to: email,
    subject: notificationObject.subject,
    html: notificationObject.html,
  }

  return transporter.sendMail(mailOptions)
}

// request or response objects are created
exports.addRequestOrResponse = functions.firestore
  .document('/users/{userId}/{collectionId}/{notificationObjectId}')
  .onCreate(function (snap, context) {
    const notificationObject = snap.data()

    functions.logger.log(
      'addRequestOrResponse',
      context.params.userId,
      context.params.notificationObjectId,
      notificationObject
    )
    return sendMail(context.params.userId, notificationObject)
  })

// request or response objects are created
exports.updateRequest = functions.firestore
  .document('/users/{userId}/requests/{notificationObjectId}')
  .onUpdate(function (change, context) {
    const before = change.before.data()
    const after = change.after.data()

    if (after.acceptedDate === before.acceptedDate) {
      functions.logger.log('updateRequest: No update on accepted date')
      return () => 200
    }

    functions.logger.log(
      'updateRequest',
      context.params.userId,
      context.params.notificationObjectId,
      after
    )
    return sendMail(context.params.userId, after)
  })
