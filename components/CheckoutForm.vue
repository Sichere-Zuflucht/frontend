<template>
  <v-form
    v-model="valid"
    id="payment-form"
    onSubmit="return false;"
    @submit="handleSubmit"
  >
    <v-row>
      <div id="card-element" @change="handleChange"></div>
      <!--<CardElement id="card-element" options={cardStyle} onChange={handleChange} />-->
    </v-row>
    <v-row>
      <v-btn
        :disabled="processing || disabled || succeeded"
        id="submit"
        :loading="buttonload"
        @click="handleSubmit"
        >Pay now
      </v-btn>
    </v-row>
    <v-row v-if="error">
      <v-alert type="alert">
        {{ error }}
      </v-alert>
    </v-row>
    <v-row v-if="succeeded">
      <v-alert type="success">
        Payment succeeded, see the result in your
        <a href="https://dashboard.stripe.com/test/payments">
          Stripe dashboard.
        </a>
        Refresh the page to pay again.
      </v-alert>
    </v-row>
  </v-form>
</template>

<script>
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
</script>
