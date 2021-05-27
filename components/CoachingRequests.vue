<template>
  <v-card
    elevation="2"
    nuxt
    :ripple="clickable"
    :to="clickable ? '/beratung/' + coach.id : null"
    outlined
    :style="'border: 1px solid ' + $vuetify.theme.themes.light.primary"
  >
    <v-sheet
      color="grey lighten-5"
      class="d-flex"
      :style="
        'border-bottom: 1px solid ' +
        $vuetify.theme.themes.light.primary +
        ' !important'
      "
    >
      <v-avatar color="primary ma-5" size="35%"
        ><v-img :src="coach.avatar"
      /></v-avatar>
      <div class="ma-5 ml-2 d-flex flex-column justify-center">
        <h2 class="secondary--text text-h2">
          {{ coach.firstName }} {{ coach.lastName }}
        </h2>
        <h3 class="mt-2 text-h5">
          {{ coach.profession }}
        </h3>
      </div>
    </v-sheet>

    <v-card-text v-if="response">
      <p class="text-uppercase font-weight-bold mb-1 mt-2 caption">
        Vorschläge für einen Online-Beratungstermin
      </p>
      <div v-if="!response.coachAnswered">
        Der Coach hat auf deine Anfrage noch nicht reagiert.
      </div>
      <div v-else-if="!response.acceptedDate">
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="date"
              :items="response.suggestions"
              outlined
              dense
              hide-details
              color="primary"
              label="Bitte wählen"
              class="my-2"
            ></v-select>
            <p class="caption">
              Nach der Terminbestätigung wirst du direkt zu unserem
              Zahlungsanbieter „stripe“ weitergeleitet. Nach deiner Zahlung
              senden wir dir eine Termin-Bestätigung per E-Mail.
            </p>
            <v-btn
              color="success"
              :loading="payButtonLoading"
              :disabled="!date"
              @click="pay"
              block
              >{{ acceptText }}</v-btn
            >
          </v-col>
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
    <v-card-actions
      style="border-top: 1px solid lightgrey"
      class="align-stretch pa-4"
    >
      <v-btn
        small
        color="primary"
        outlined
        nuxt
        :to="'/beratung/' + response.coachId"
        >{{ coach.id }} Neue Anfrage stellen</v-btn
      >
      <v-dialog v-model="isDelete" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn small text color="primary" v-bind="attrs" v-on="on"
            >Termin löschen</v-btn
          >
        </template>
        <v-alert type="warning" class="mt-2 ma-2"
          >wirklich löschen?

          <v-btn light @click="cancel(response.id)" class="mr-1"
            >Ja, löschen</v-btn
          ><v-btn light @click="isDelete = false"> nein </v-btn></v-alert
        >
      </v-dialog>
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
          : 'Termin verbindlich buchen'
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
      this.$fire.functions
        .httpsCallable('email-sendRequestDeleted')(this.response.acceptedDate)
        .then(() => {
          this.isDelete = false
        })
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
