<template>
  <v-card
    elevation="2"
    nuxt
    :ripple="clickable"
    :to="clickable ? '/beratung/' + coach.id : null"
    style="padding: 12px"
  >
    <div class="d-flex" style="padding: 12px">
      <v-avatar color="primary" size="35%"
        ><v-img :src="coach.avatar"
      /></v-avatar>
      <div class="pt-2 px-3">
        <h2 class="secondary--text text-h2">
          {{ coach.firstName }} {{ coach.lastName }}
        </h2>
        <h3 class="accent--text text-h5">
          {{ coach.profession }}
        </h3>
      </div>
    </div>
    <v-card-text class="pt-0">
      <p class="text-uppercase font-weight-bold mb-1 mt-2 caption">
        Fachgebiet
      </p>
      <div class="d-flex flex-wrap">
        <v-chip label outlined color="primary" class="mr-1 mb-1">
          {{ coach.info.topicArea }}
        </v-chip>
      </div>
      <p class="text-uppercase font-weight-bold mb-1 mt-2 caption">Themen</p>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in coach.info.topicPoints"
          :key="tag"
          label
          outlined
          color="primary"
          class="mr-1 mb-1"
        >
          {{ tag }}
        </v-chip>
      </div>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in coach.info.languages"
          :key="tag"
          label
          color="secondary"
          class="mr-1 mb-1"
        >
          <v-icon left> mdi-translate </v-icon>{{ tag }}
        </v-chip>
      </div>
    </v-card-text>
    <v-card-text v-if="response">
      <div v-if="!response.coachAnswered">
        Der Coach hat auf deine Anfrage noch nicht reagiert.
      </div>
      <div v-else-if="!response.acceptedDate">
        <p class="caption">
          Wähle einen der Termine aus, welche dein/e Berater*in die
          vorgeschlagen hat:
        </p>
        <v-row>
          <v-col cols="7">
            <v-select
              v-model="date"
              :items="response.suggestions"
              label="vorg. Termine"
              dense
            ></v-select>
          </v-col>
          <v-col cols="5" class="pt-5 success--text font-weight-bold"
            >Preis: 60€</v-col
          >
        </v-row>
        <v-row class="mb-2">
          <v-btn
            color="success"
            :loading="payButtonLoading"
            :disabled="!date"
            @click="pay"
            >{{ acceptText }}</v-btn
          ><v-btn plain color="orange">Nachfragen</v-btn>
          <v-btn plain @click="cancel(response)" class="pa-0">Absagen</v-btn>
        </v-row>
      </div>
      <div v-else>
        <v-btn
          class="my-2"
          color="success"
          target="_blank"
          :href="
            response.videoType === 'Jitsi'
              ? response.jitsiLink
              : response.redLink.codePatient
          "
          >zum Videocall
        </v-btn>
        <v-alert dark text dense color="success"
          >Zugesagt für {{ response.acceptedDate }}</v-alert
        >
      </div>
    </v-card-text>
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
    response: null,
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
      acceptText: this.response.payed ? 'Bezahlt' : 'Bezahlen',
      acceptLoading: false,
      acceptDisable: true,
      date: null,
      payButtonLoading: false,
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
    cancel(coaching) {
      const db = this.$fire.firestore
      db.collection('users/' + coaching.id + '/requests')
        .doc(this.$store.state.user.uid)
        .delete()
      db.collection('users/' + this.user.uid + '/response')
        .doc(coaching.id)
        .delete()
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
  watch: {
    response(res) {
      console.log(res)
    },
  },
}
</script>
