<template>
  <div v-if="coach">
    <v-sheet class="d-flex justify-center pt-8" style="position: relative"
      ><v-avatar :lazy-src="coach.avatar" :src="coach.avatar" size="162">
        <v-img :lazy-src="coach.avatar" :src="coach.avatar"></v-img
      ></v-avatar>
      <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            color="secondary"
            icon
            elevation="1"
            class="white"
            style="position: absolute; bottom: 5px; margin-left: 30%"
            ><v-icon>mdi-share-variant</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-card-title
            ><h2 class="text-h2 primary--text">Teilen</h2></v-card-title
          ><v-text-field
            ref="link"
            :label="copied ? 'Link copied' : 'Click to copy link'"
            class="pa-4"
            readonly
            :value="linkVal"
            @click="copy"
          ></v-text-field
          ><v-alert v-if="!copied" type="info" color="secondary" text
            >Link kopieren</v-alert
          >
          <v-alert v-else type="success" text>Link kopiert</v-alert></v-card
        ></v-dialog
      >
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
        <v-chip
          v-for="tag in coach.info.topicArea"
          :key="tag"
          outlined
          color="primary"
          class="mr-1 mb-1 caption"
        >
          <p class="black--text ma-0 pa-0">{{ tag }}</p>
        </v-chip>
      </div>
      <div v-if="coach.info.since">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Ich bin Coach/Berater*in seit dem Jahr:
        </p>
        <div class="d-flex flex-wrap">
          {{ coach.info.since }}
        </div>
      </div>

      <div v-if="coach.info.history">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Mein beruflicher Hintergrund:
        </p>
        <div class="d-flex flex-wrap">
          {{ coach.info.history }}
        </div>
      </div>
      <div v-if="coach.info.focus">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Meine Schwerpunkte sind:
        </p>
        <div class="d-flex flex-wrap">
          {{ coach.info.focus }}
        </div>
      </div>
      <div v-if="coach.info.coachingTopics">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Meine Beratungs-/Coaching-Themen sind:
        </p>
        <div class="d-flex flex-wrap">
          {{ coach.info.coachingTopics }}
        </div>
      </div>
      <div v-if="coach.info.description">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Etwas Persönliches über mich:
        </p>
        <div class="d-flex flex-wrap">
          {{ coach.info.description }}
        </div>
      </div>
      <div v-if="coach.info.assistance">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Ich kann diese konkrete Hilfestellung anbieten:
        </p>
        <div class="d-flex flex-wrap">
          {{ coach.info.assistance }}
        </div>
      </div>
      <div v-if="this.coachUID != this.user.uid">
        <v-card
          outlined
          class="mt-8"
          :style="'border: 1px solid ' + $vuetify.theme.themes.light.secondary"
          elevation="2"
        >
          <v-card-title class="text-h2 secondary--text"
            >online-beratungstermin anfragen</v-card-title
          >
          <v-card-text v-if="user.uid">
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
              <v-alert
                v-if="error.status"
                color="error"
                class="white--text mt-4"
                >{{ error.message }}
              </v-alert>
              <p class="caption">
                Die Terminvorschläge werden von der/dem Berater*in bestätigt.
                Danach kannst du die Beratung verbindlich buchen. <br /><br />
                <a color="primary">Wie läuft das Beratungsgespräch ab?</a
                ><br /><a color="primary"> Infos zur Termineinhaltung </a
                ><br /><a color="primary"> zu Preisen</a>
              </p>
            </v-form>
          </v-card-text>
          <v-card-text v-else
            ><p class="font-weight-bold my-2 caption">
              Melde dich bei Sichere Zuflucht an, um diese/n Berater*in
              kontaktieren zu können.
            </p>
            <v-btn nuxt to="/signup" color="secondary">Registrieren</v-btn
            ><v-btn nuxt to="/login" text>Einloggen</v-btn></v-card-text
          >
        </v-card>
        <v-divider class="mt-16 mb-6" />
        <h2 class="text-h2 mt-8 secondary--text">weitere Berater*innen</h2>
        <p class="caption">
          <b>Per Online-Beratung</b> werden dir unsere Berater*innen und Coaches
          zuhören und weiter helfen. Schau dich um, Sie beraten in vielen
          Themen.
        </p>
        <div v-if="filteredCoaches.length > 0">
          <div
            v-for="(coaching, i) in filteredCoaches.slice(0, 2)"
            :key="i"
            class="mt-5"
          >
            <CoachingList :coach="coaching" />
          </div>
        </div>
      </div>
      <div v-else class="mt-16">
        <v-btn to="edit-profil" nuxt color="secondary">Profil bearbeiten</v-btn>
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
      dialog: false,
      linkVal:
        this.$config.baseUrl + '/beratung/' + this.$route.params.beratung,
      copied: false,
    }
  },
  computed: {
    coachName() {
      return this.coach.firstName + ' ' + this.coach.lastName
    },
  },
  mounted() {
    this.coachUID = this.$route.params.beratung
    this.user = this.$store.getters['modules/user/user']
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
          : this.coachUID === this.user.uid
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
    copy() {
      const markup = this.$refs.link
      markup.focus()
      document.execCommand('selectAll', false, null)
      this.copied = document.execCommand('copy')
    },
  },
}
</script>
