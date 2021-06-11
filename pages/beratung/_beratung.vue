<template>
  <div v-if="coach">
    <v-sheet class="d-flex justify-center pt-8"
      ><v-avatar :lazy-src="coach.avatar" :src="coach.avatar" size="162">
        <v-img :lazy-src="coach.avatar" :src="coach.avatar"></v-img
      ></v-avatar>
    </v-sheet>
    <v-container>
      <h1 class="text-center text-h1 primary--text text-uppercase">
        {{ coach.firstName }} {{ coach.lastName }}
      </h1>
      <h2 class="text-center text-h5 mb-8">
        {{ coach.profession }}
      </h2>

      <p class="font-weight-bold mb-1 mt-2 caption">Fachgebiet</p>
      <div class="d-flex flex-wrap">
        <v-chip outlined color="primary" class="mr-1 mb-1 caption">
          <p class="black--text ma-0 pa-0">{{ coach.info.topicArea }}</p>
        </v-chip>
      </div>
      <p class="font-weight-bold mb-1 mt-2 caption">Themen</p>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in coach.info.topicPoints"
          :key="tag"
          outlined
          color="primary"
          class="mr-1 mb-1 caption"
        >
          <p class="black--text ma-0 pa-0">{{ tag }}</p>
        </v-chip>
      </div>
      <p v-if="coach.description" class="font-weight-bold mb-1 mt-2 caption">
        Wer bin ich?
      </p>
      <div v-if="coach.description" class="d-flex flex-wrap">
        {{ coach.description }}
      </div>

      <v-card
        outlined
        class="mt-8"
        :style="'border: 1px solid ' + $vuetify.theme.themes.light.secondary"
        elevation="2"
      >
        <v-card-title class="text-h2 secondary--text"
          >online-beratungstermin anfragen</v-card-title
        >
        <v-card-text>
          <p class="font-weight-bold mb-1 mt-2 caption">
            Schlage dieser*m Berater*in passende Termine für euer
            Beratungsgespräch vor.
          </p>
          <p>
            Deine Vorschläge sollten an Werktagen sein und mind. 24h in der
            Zukunft liegen.
          </p>

          <v-form
            ref="form"
            class="pb-8 pt-4"
            @submit="
              (e) => {
                e.preventDefault()
              }
            "
          >
            <v-textarea
              v-model="message"
              outlined
              color="secondary"
              placeholder="Schlage hier Termine vor (Tag, Monat, Jahr, Uhrzeit) und am besten auch dein Thema:"
              value="Jemand möchte mit Ihnen Kontakt aufnehmen."
              label="persönliche Anfrage schreiben"
            ></v-textarea>

            <p>Preis pro 60 Min.: <b>50 €</b></p>

            <div class="d-flex flex-row-reverse mb-4">
              <v-btn
                color="secondary"
                :loading="loading"
                :disabled="isDisabled"
                @click="sendRequest"
                >{{ buttonText }}
              </v-btn>
            </div>
            <v-alert
              v-if="showConfirmation"
              color="success"
              dark
              class="mt-4 d-flex flex-column justify-center"
              ><v-icon class="mb-4">mdi-check</v-icon>
              <p class="mb-0">
                Deine Anfrage wurde gesendet. {{ coachName }} wird sich
                innerhalb der nächsten 24h per E-Mail bei dir melden.
              </p>
            </v-alert>
            <v-alert v-if="error.status" color="error" class="white--text mt-4"
              >{{ error.message }}
            </v-alert>
            <p class="caption">
              Die Terminvorschläge werden von der/dem Berater*in bestätigt.
              Danach kannst du die Beratung verbindlich buchen. <br /><br />
              <a color="primary">Wie läuft das Beratungsgespräch ab?</a><br /><a
                color="primary"
              >
                Infos zur Termineinhaltung </a
              ><br /><a color="primary"> zu Preisen</a>
            </p>
          </v-form>
        </v-card-text>
      </v-card>
      <h2 class="text-h2 mt-8 secondary--text">weitere Berater*innen</h2>
      <p class="caption">
        <b>Per Online-Beratung</b> werden dir unsere Berater*innen und Coaches
        zuhören und weiter helfen. Schau dich um, Sie beraten in vielen Themen.
      </p>
      <div v-if="filteredCoaches.length > 0">
        <div
          v-for="(coaching, i) in filteredCoaches.slice(0, 2)"
          :key="i"
          class="mt-5"
        >
          <Coaching :coach="coaching" />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coach: null,
      message: '',
      coachUID: '',
      showAddInfo: false,
      loading: false,
      isDisabled: false,
      buttonText: 'Terminanfrage senden',
      showConfirmation: false,
      error: {
        status: false,
        message: '',
      },
      allCoaches: [],
      filteredCoaches: [],
    }
  },
  computed: {
    coachName() {
      return this.coach.firstName + ' ' + this.coach.lastName
    },
  },
  mounted() {
    this.coachUID = this.$route.params.beratung
    /* this.$fire.firestore
      .collection('users')
      .doc(this.coachUID)
      .get()
      .then((e) => {
        console.log('result data: ', e)
        this.coach = e.data()
      }) */
    const coachMembership = this.$fire.firestore
      .collection('memberships')
      .doc('Coach')
    this.$fire.firestore
      .collection('users')
      .doc(this.coachUID)
      .get()
      .then((e) => {
        e.data().verifySetting.verified &&
        e.data().stripe &&
        e.data().info !== false
          ? (this.coach = e.data())
          : this.$router.push('/')
      })
      .then(() => {
        this.$fire.firestore
          .collection('users')
          .where('membership', '==', coachMembership)
          .get()
          .then((ref) => {
            ref.docs.forEach((doc) => {
              const data = doc.data()
              if (data.info && data.verifySetting.verified && data.stripe)
                if (this.coachUID !== doc.id)
                  this.allCoaches.push({ id: doc.id, ...data })
              // if (data.info) this.allCoaches.push({ id: doc.id, ...data })
            })
          })
          .then(() => {
            function shuffleArray(array) {
              for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                const temp = array[i]
                array[i] = array[j]
                array[j] = temp
              }
              return array
            }
            console.log(shuffleArray(this.allCoaches))

            this.filteredCoaches = shuffleArray(this.allCoaches)
          })
      })
  },
  methods: {
    sendRequest() {
      this.loading = true
      this.$fire.functions
        .httpsCallable('request-sendRequest')({
          coachName: this.coachName,
          message: this.message,
          coachUID: this.coachUID,
          createdAt: new Date(),
          isDev: this.$config.isDev,
        })
        .then(() => {
          this.buttonText = 'versendet'
          this.loading = false
          this.showConfirmation = true
          this.isDisabled = true
        })
        .catch((err) => {
          this.error.status = true
          this.error.message = err.message
        })
    },
  },
}
</script>
