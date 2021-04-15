<template><div></div></template>

<script>
export default {
  data() {
    this.publishableKey = process.env.STRIPE_PK
    return {
      loading: false,
      lineItems: [
        {
          price: 'some-price-id', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'http://localhost:3000',
      cancelURL: 'http://localhost:3000',
    }
  },
  methods: {
    submit() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout()
    },
  },
}
/*
export default {
  data() {
    return {
      valid: false,
      processing: '',
      disabled: true,
      succeeded: false,
      buttonload: false,
      error: '',
      clientSecret: '',
      card: {},
    }
  },
  mounted() {
    const elements = this.$stripe.elements()
    this.card = elements.create('card')
    this.card.mount('#card-element')
  },
  methods: {
    async handleSubmit(ev) {
      ev.preventDefault()
      this.processing = true
      const payload = await this.$stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.elements.getElement(this.card),
        },
      })
      if (payload.error) {
        this.error = 'Payment failed ' + payload.error.message
        this.processing = false
      } else {
        this.error = null
        this.processing = false
        this.succeeded = true
      }
    },
    handleChange(event) {
      console.log('is changing')
      this.disabled = event.empty
      this.error = event.error ? event.error.message : ''
    },
  },
}
*/
</script>
