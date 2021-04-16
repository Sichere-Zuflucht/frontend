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

async function sendMail(emailData) {
  const { email } = await admin
    .firestore()
    .collection('users')
    .doc(emailData.uid)
    .get()
    .then((snap) => snap.data())

  const mailOptions = {
    from: 's.fellner@sichere-zuflucht.de',
    to: email,
    subject: emailData.subject,
    html: emailData.html,
  }

  return transporter.sendMail(mailOptions)
}

exports.sendMail = functions.firestore
  .document('/requests/{id}')
  .onWrite(async function (change, context) {
    // Exit when the data is deleted.
    if (!change.after.exists) {
      return null
    }

    const after = change.after.data()

    // for each email check if it was sent already, if not send it and set sent
    // to true
    const eMails = await Promise.all(
      after.eMails.map((email, idx) => {
        if (!email.sent) {
          return sendMail(email).then(() => {
            email.sent = true
            functions.logger.log('sendMail', email)
            return email
          })
        }
        return Promise.resolve(email)
      })
    )

    // now update all emails
    return change.after.ref.set({ eMails }, { merge: true })
  })
