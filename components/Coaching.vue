<template>
  <v-card elevation="2" nuxt :ripple="false" style="padding: 12px">
    <v-sheet class="d-flex">
      <v-avatar color="primary ma-5" size="35%"
        ><v-img :src="coach.public.avatar"
      /></v-avatar>
      <div class="ma-5 ml-2 d-flex flex-column justify-center">
        <h2 class="secondary--text text-h2">
          {{ coach.public.firstName }} {{ coach.public.lastName }}
        </h2>
        <h3 class="mt-2 text-h5">
          {{ coach.public.profession }}
        </h3>
      </div>
    </v-sheet>
    <v-card-text class="pt-0">
      <p class="font-weight-bold mb-1 mt-2 caption">Fachgebiet</p>
      <div class="d-flex flex-wrap">
        <v-chip outlined color="primary" class="mr-1 mb-1 caption">
          <p class="black--text ma-0 pa-0">{{ coach.public.info.topicArea }}</p>
        </v-chip>
      </div>
      <p class="font-weight-bold mb-1 mt-2 caption">Themen</p>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in coach.public.info.topicPoints"
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
      <v-btn absolute right color="primary" :to="'/beratung/' + coach.id"
        >Profil ansehen</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Coaching',
  props: {
    coach: {
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
    async getRedLink(humanResponse, dateInput) {
      this.acceptLoading = true
      const data = {
        method: 'getEntrycodes',
        date: dateInput,
        token: this.$config.RED_API,
      }
      const response = await fetch(
        'https://redclient.redmedical.de/service/video',
        {
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      await response
        .json()
        .then((redRes) => {
          if (redRes.success) {
            const jitsi =
              'https://meet.jit.si/' +
              humanResponse.coach.firstName.toLowerCase() +
              '_' +
              humanResponse.coach.lastName.toLowerCase() +
              '&?' +
              humanResponse.id
            this.$fire.functions
              .httpsCallable('request-acceptDate')({
                coachName:
                  humanResponse.coach.firstName +
                  ' ' +
                  humanResponse.coach.lastName,
                acceptedDate: dateInput,
                requestId: humanResponse.id,
                jitsiLink: jitsi,
                redLink: {
                  codeArzt:
                    'https://video.redmedical.de/#/login?name=' +
                    humanResponse.coach.firstName +
                    ' ' +
                    humanResponse.coach.lastName +
                    '&code=' +
                    redRes.codeArzt,
                  codePatient:
                    'https://video.redmedical.de/#/login?name=unbekannt&code=' +
                    redRes.codePatient,
                },
              })
              .then(() => {
                this.acceptDisable = true
              })
          }
        })
        .catch((error) => {
          console.log('err: ', error)
        })
      humanResponse.acceptedDate = dateInput
    },
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
