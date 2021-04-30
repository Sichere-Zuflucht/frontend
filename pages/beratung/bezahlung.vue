<template>
  <v-container>
    <h1 class="text-h1 secondary--text">Bezahlung</h1>
    <p class="caption">
      Wir nutzen als Zahlungssystem den Anbieter
      <a href="https://stripe.com" target="_blank">Stripe</a>.
    </p>
    <div v-if="!user.stripe">
      <p class="caption">
        Bitte registrieren Sie sich, damit die Frauen Ihre Angebote bezahlen
        können.
      </p>
      <v-btn
        :loading="loading"
        :disabled="disabled"
        color="secondary"
        target="_blank"
        @click="addStripe"
        >bei Stripe registrieren</v-btn
      >
      <p class="caption">
        Sie werden zur Stripes Registrierungsseite weitergeleitet.
      </p>
      <p v-if="stripeRegisterURL" class="caption">
        Falls die Weiterleitung nicht funktioniert, kopiere und öffne bitte
        folgende URL: {{ stripeRegisterURL }}
      </p>
    </div>
    <div v-else>
      <h2 class="text-h2 primary--text">Stripe Übersicht</h2>
      <div v-if="stripeData">
        <p>Kartenzahlung:</p>
      </div>
      <v-card v-for="(item, i) of stripeData" :key="i">
        <v-card-text>
          <p>
            Betrag: {{ item.amount }} {{ item.currency.toUpperCase() }}<br />

            erstellt am: {{ new Date(item.created).getDate() }}.{{
              new Date(item.created).getMonth() + 1
            }}.{{ new Date(item.created).getFullYear() }}
          </p>

          <v-btn @click="more(item.id)">Mehr</v-btn>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      stripeRegisterURL: null,
      loading: false,
      disabled: false,
      stripeData: {},
    }
  },
  mounted() {
    this.user = this.$store.getters['modules/user/user']
    this.run()
  },
  methods: {
    addStripe() {
      this.loading = true
      this.$fire.functions
        .httpsCallable('stripe-getStripeLink')({ email: this.user.email })
        .then((stripeData) => {
          this.stripeRegisterURL = stripeData.data.url
          this.loading = false
          this.disabled = true
          if (
            confirm(
              'Sichere Zuflucht möchte Sie weiterleiten zu: ' +
                stripeData.data.url
            )
          ) {
            window.open(stripeData.data.url, '_blank').focus()
          }
        })
    },
    run() {
      fetch('https://api.stripe.com/v1/payment_intents', {
        headers: {
          Authorization: 'Bearer ' + this.$config.STRIPE_SK,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.stripeData = data.data
        })
    },
    more(pi) {
      fetch('https://api.stripe.com/v1/payment_intents/' + pi, {
        headers: {
          Authorization: 'Bearer ' + this.$config.STRIPE_SK,
        },
      })
        .then((response) => response.json())
        .then((data) => {})
    },
  },
}
</script>
