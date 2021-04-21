const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.getStripeLink = functions.https.onCall(async (data, context) => {
  functions.logger.log('stripe', functions.config().stripe.sk)
  const stripe = require('stripe')(functions.config().stripe.sk)

  // verify this user is not registered with stripe (look in firebase)
  const userDoc = admin.firestore().collection('users').doc(context.auth.uid)
  const userData = await userDoc.get().then((doc) => doc.data())

  let stripeId
  if (!userData.stripe) {
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
    userDoc.set({ stripe: { id: stripeId } }, { merge: true })
    userData.stripe = { id: stripeId }
  } else {
    stripeId = userData.stripe.id
  }

  let accountLink
  // verify accountlink does not exist already in firebase
  if (
    !userData.stripe.accountLink ||
    // generate only new link when old one is expired
    new Date(userData.stripe.accountLink.expires_at * 1000) <= new Date()
  ) {
    // create new accountlink if not existing
    accountLink = await stripe.accountLinks.create({
      account: stripeId,
      refresh_url: 'https://sichere-zuflucht.de',
      return_url: 'https://sichere-zuflucht.de',
      type: 'account_onboarding',
    })
    userDoc.set({ stripe: { accountLink } }, { merge: true })
  } else {
    accountLink = userData.stripe.accountLink
  }
  // save in firebase
  return accountLink
})
