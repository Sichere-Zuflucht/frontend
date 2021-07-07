<template>
  <v-container>
    <h1 class="text-h1 secondary--text">Bezahlung</h1>
    <p class="caption">
      Wir nutzen als Zahlungssystem den Anbieter
      <a href="https://stripe.com" target="_blank">Stripe</a>.
    </p>
    <div v-if="stripe !== undefined && !(stripe && stripe.verified)">
      <p v-if="!stripe" class="caption">
        Bitte registrieren Sie sich, damit Frauen Ihre Angebote bezahlen können.
      </p>
      <div>
        <h2 class="text-h2 primary--text">Step 1</h2>
        <div v-if="!stripe.chargesEnabled">
          <p class="mb-0">Aktuell können Sie keine Zahlungen entgegennehmen.</p>
          <v-btn
            :loading="loading"
            :disabled="disabled"
            color="secondary"
            target="_blank"
            @click="addStripe"
            >bei Stripe registrieren
          </v-btn>
          <p class="caption">
            Sie werden zur Stripes Registrierungsseite weitergeleitet.
          </p>
        </div>
        <v-alert v-else type="success" color="success"
          >Bei Stripe registriert</v-alert
        >

        <h2 class="text-h2 primary--text mt-8">Step 2</h2>
        <div v-if="!stripe.payoutsEnabled">
          <p v-if="!stripe.chargesEnabled">Schließen Sie zuerst Schritt 1 ab</p>
          <div v-else>
            <p class="mb-0">
              Aktuell können Sie sich kein Geld auszahlen lassen.
            </p>
            <v-btn
              :loading="loading"
              :disabled="disabled"
              color="secondary"
              target="_blank"
              @click="addStripe"
              >Auszahlung hinzufügen
            </v-btn>
            <p class="caption">
              Sie werden zur Stripes Registrierungsseite weitergeleitet.
            </p>
          </div>
        </div>
      </div>

      <!--      somehow make sure this button is shown until this is returning that payments are approved maybe even update firebase and return -->
      <!--      charges_enabled-->
      <!--      payouts_enabled-->
      <!--      <v-btn @click="getStripeData"></v-btn> -->

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
      stripeRegisterURL: null,
      loading: false,
      disabled: false,
      stripeData: {},
    }
  },
  computed: {
    user() {
      return this.$store.state.modules.user
    },
    stripe() {
      try {
        return this.$store.getters['modules/user/stripe']
      } catch (TypeError) {
        return 'type error'
      }
    },
  },
  methods: {
    addStripe() {
      this.loading = true
      this.$fire.functions
        .httpsCallable('stripe-getStripeLink')({
          email: this.user.private.email,
          isDev: this.$config.isDev,
        })
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
            location.replace(this.stripeRegisterURL)
          }
        })
    },
    getStripeData() {
      this.$fire.functions
        .httpsCallable('stripe-checkStripeAccount')()
        .then((a) => console.log(a))
    },
  },
}
</script>
