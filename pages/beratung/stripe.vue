<template>
  <v-container>
    <v-btn @click="registerUser">Bei Stripe registrieren</v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    async registerUser() {
      const stripe = require('stripe')(process.env.STRIPE_SK)
      // const useremail = this.$store.state.user.email
      // const stripe = require('stripe')('sk_test_51IbjZeFRsEq5IriE4dP2xjLM2WP3lu3Nmqe7DBze4XDXSLUroQdXZW2jwKuG4WtmQVLCXMktsuNuU7N1h6AD8LxH00Avd7UeQy');
      stripe.accounts
        .create()
        .then((e) => {
          console.log(e)
        })
        .catch((err) => {
          console.log(err)
        })
      const account = await stripe.accounts.create({
        type: 'express',
      })
      console.log(account)

      /* const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 4,
          exp_year: 2022,
          cvc: '314',
        },
      }) */

      // console.log('acc: ', paymentMethod)
    },
  },
}
</script>
