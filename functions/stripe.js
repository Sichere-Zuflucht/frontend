const functions = require('firebase-functions')
const admin = require('firebase-admin')
const stripe = require('stripe')(functions.config().stripe.sk)

exports.getStripeLink = functions.https.onCall(async (data, context) => {
  // verify this user is not registered with stripe (look in firebase)
  const privateRef = admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .collection('private')
    .doc('data')
  const privateData = await privateRef.get().then((doc) => doc.data())

  let stripeId
  if (!privateData.stripe) {
    // create new customer account if not existing
    const customer = await stripe.account.create({
      type: 'express',
      country: 'DE',
      email: data.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    })
    stripeId = customer.id
    // save result in firebase
    privateRef.set(
      { stripe: { id: stripeId, verified: false } },
      { merge: true }
    )
    privateData.stripe = { id: stripeId }
  } else {
    stripeId = privateData.stripe.id
  }
  const base = data.isDev
    ? 'http://localhost/frontend'
    : 'https://sichere-zuflucht.github.io/frontend'

  const accountLink = await stripe.accountLinks.create({
    account: stripeId,
    refresh_url: base + '/bezahlung/error',
    return_url: base + '/bezahlung/approved',
    type: 'account_onboarding',
  })
  privateRef.set({ stripe: { accountLink } }, { merge: true })

  // save in firebase
  return accountLink
})

exports.checkStripeAccount = functions.https.onCall(async (data, context) => {
  // verify this user is not registered with stripe (look in firebase)
  const privateDoc = admin
    .firestore()
    .collection('users')
    .doc(context.auth.uid)
    .collection('private')
    .doc('data')
  const privateData = await privateDoc.get().then((doc) => doc.data())
  if (privateData.stripe) {
    return await stripe.account.retrieve(privateData.stripe.id)
  }
  return {}
})

exports.createPaymentForCoaching = async (coachID, requestID, isDev) => {
  const coach = await admin
    .firestore()
    .collection('users')
    .doc(coachID)
    .get()
    .then((doc) => doc.data())

  const base = isDev
    ? 'http://localhost:3000'
    : 'https://sichere-zuflucht.github.io/frontend'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    client_reference_id: requestID,
    line_items: [
      {
        name: 'Coaching',
        amount: 6000,
        currency: 'eur',
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: 1000,
      on_behalf_of: coach.stripe.id,
      transfer_data: {
        destination: coach.stripe.id,
      },
    },
    mode: 'payment',
    success_url: base + '/bezahlung/approved',
    cancel_url: base + '/bezahlung/error',
  })

  return session.id
}

exports.payCoaching = functions.https.onCall(async (data, context) => {
  functions.logger.log('payCoach', data)

  const responseDoc = admin
    .firestore()
    .collection('requests')
    .doc(data.responseID)
  const responseData = await responseDoc.get().then((doc) => doc.data())

  return this.createPaymentForCoaching(
    responseData.coachId,
    data.responseID,
    data.isDev
  )
})

exports.stripeWebhook = functions.https.onRequest((req, res) => {
  const requestID = req.body.data.object.client_reference_id

  const request = admin.firestore().collection('requests').doc(requestID)
  request
    .set({ payed: true }, { merge: true })
    .then(res.send('seemed to work'))
    .catch(() => res.status(400).send('oh no did not work'))
})

exports.accountUpdated = functions.https.onRequest(async (req, res) => {
  functions.logger.log('accountupdated', req.body)

  const email = req.body.data.object.email
  const chargesEnabled = req.body.data.object.charges_enabled
  const payoutsEnabled = req.body.data.object.payouts_enabled

  // const snapshot = await admin
  //   .firestore()
  //   .collection('users')
  //   .where('private/data/email', '==', email)
  //   .get()

  const snapshot = await admin
    .firestore()
    .collectionGroup('private')
    .where('email', '==', email)
    .get()

  if (snapshot.empty) {
    res.status(400).send('User with email not found')
    return
  }
  functions.logger.log('accountupdated', snapshot)
  admin
    .firestore()
    .collection('users')
    .doc(snapshot.docs[0].id)
    .collection('private')
    .doc('data')
    .set(
      {
        stripe: {
          chargesEnabled,
          payoutsEnabled,
          verified: chargesEnabled && payoutsEnabled,
        },
      },
      { merge: true }
    )

  res.send('yes')
})
