<template>
  <v-card
    elevation="2"
    nuxt
    :ripple="false"
    style="padding: 12px"
    max-width="300px"
  >
    <v-sheet class="d-flex">
      <v-avatar color="primary my-5 mx-3" size="80"
        ><v-img :src="pubCoachData.avatar"
      /></v-avatar>
      <div class="ma-5 ml-2 d-flex flex-column justify-center">
        <h2 class="secondary--text text-h2">
          {{ pubCoachData.firstName }} {{ pubCoachData.lastName }}
        </h2>
        <h3 class="mt-2 text-h5">
          {{ pubCoachData.profession }}
        </h3>
      </div>
    </v-sheet>
    <v-card-text class="pt-0">
      <p class="font-weight-bold mb-1 mt-2 caption">Fachgebiet</p>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in pubCoachData.info.topicArea"
          :key="tag"
          outlined
          color="primary"
          class="mr-1 mb-1 caption"
        >
          <p class="black--text ma-0 pa-0">{{ tag }}</p>
        </v-chip>
      </div>
    </v-card-text>
    <v-card-actions class="my-4">
      <v-btn absolute right color="primary" :to="'/berater/' + pubCoachData.uid"
        >Profil ansehen</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Coaching',
  props: {
    pubCoachData: {
      type: Object,
      default: () => {},
    },
    response: {
      type: Object,
      default: () => {},
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      acceptText: this.response
        ? this.response.payed
          ? 'Bezahlt'
          : 'Bezahlen'
        : null,
      acceptLoading: false,
      acceptDisable: true,
      date: null,
      payButtonLoading: false,
      isDelete: false,
    }
  },
  methods: {
    cancel(doc) {
      const db = this.$fire.firestore
      db.collection('requests').doc(doc).delete()
      this.$fire.functions.httpsCallable('email-sendRequestDeleted')(
        this.response.acceptedDate
      )
    },
    async pay() {
      this.payButtonLoading = true
      const paymentID = (
        await this.$fire.functions.httpsCallable('stripe-payCoaching')({
          responseID: this.response.id,
          isDev: this.$config.isDev,
        })
      ).data

      this.$stripe.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as argument here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: paymentID,
      })
    },
  },
}
</script>
