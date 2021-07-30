<template>
  <div v-if="pubData">
    <v-sheet class="d-flex justify-center pt-8" style="position: relative"
      ><v-avatar :lazy-src="pubData.avatar" :src="pubData.avatar" size="162">
        <v-img :lazy-src="pubData.avatar" :src="pubData.avatar"></v-img
      ></v-avatar>
      <v-dialog v-model="dialog" width="400">
        <template #activator="{ on }">
          <v-btn
            color="secondary"
            icon
            elevation="1"
            class="white"
            style="position: absolute; bottom: 5px; margin-left: 30%"
            v-on="on"
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
        {{ pubData.firstName }} {{ pubData.lastName }}
      </h1>
      <h2 class="text-center text-h5 mb-8">
        {{ pubData.profession }}
      </h2>

      <p class="font-weight-bold mb-1 mt-2 caption">Fachgebiet</p>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in pubData.info.topicArea"
          :key="tag"
          outlined
          color="primary"
          class="mr-1 mb-1 caption"
        >
          <p class="black--text ma-0 pa-0">{{ tag }}</p>
        </v-chip>
      </div>
      <div v-if="pubData.info.since">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Ich bin Coach/Berater*in seit dem Jahr:
        </p>
        <div class="d-flex flex-wrap">
          {{ pubData.info.since }}
        </div>
      </div>

      <div v-if="pubData.info.history">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Mein beruflicher Hintergrund:
        </p>
        <div class="d-flex flex-wrap">
          {{ pubData.info.history }}
        </div>
      </div>
      <div v-if="pubData.info.focus">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Meine Schwerpunkte sind:
        </p>
        <div class="d-flex flex-wrap">
          {{ pubData.info.focus }}
        </div>
      </div>
      <div v-if="pubData.info.coachingTopics">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Meine Beratungs-/Coaching-Themen sind:
        </p>
        <div class="d-flex flex-wrap">
          {{ pubData.info.coachingTopics }}
        </div>
      </div>
      <div v-if="pubData.info.description">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Etwas Persönliches über mich:
        </p>
        <div class="d-flex flex-wrap">
          {{ pubData.info.description }}
        </div>
      </div>
      <div v-if="pubData.info.assistance">
        <p class="font-weight-bold mb-0 mt-4 caption">
          Ich kann diese konkrete Hilfestellung anbieten:
        </p>
        <div class="d-flex flex-wrap">
          {{ pubData.info.assistance }}
        </div>
      </div>
      <div v-if="$route.params.beratung !== $store.getters['modules/user/uid']">
        <v-card
          outlined
          class="mt-8"
          :style="'border: 1px solid ' + $vuetify.theme.themes.light.secondary"
          elevation="2"
        >
          <v-card-title class="text-h2 secondary--text"
            >online-beratungstermin anfragen</v-card-title
          >
          <v-card-text v-if="$store.getters['modules/user/isAuthenticated']">
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
            <v-btn nuxt to="/registration/signup" color="secondary"
              >Registrieren</v-btn
            ><v-btn nuxt to="/registration/signin" text
              >Einloggen</v-btn
            ></v-card-text
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
            <CoachingProfileWrapper :coach="coaching" />
          </div>
        </div>
      </div>
      <div v-else class="mt-16">
        <v-btn to="/beratung/edit-profil" nuxt color="secondary"
          >Profil bearbeiten</v-btn
        >
      </div>
    </v-container>
  </div>
  <div v-else>
    <v-sheet class="ma-5">
      <v-row>Dieser coach konnte leider nicht gefunden werden. </v-row>
      <v-row><v-btn @click="$router.go(-1)">zurück</v-btn></v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  middleware: 'showCoach',
  data() {
    return {
      message: '',
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
      pubData: null,
    }
  },
  async fetch() {
    if (
      this.$route.params.beratung === this.$store.getters['modules/user/uid']
    ) {
      this.pubData = this.$store.getters['modules/user/public']
    } else {
      this.pubData = (
        await this.$fire.firestore
          .collection('users')
          .doc(this.$route.params.beratung)
          .collection('public')
          .doc('data')
          .get()
      ).data()
    }
  },
  fetchOnServer: false,
  computed: {
    coachName() {
      return this.pubData.firstName + ' ' + this.pubData.lastName
    },
  },
  methods: {
    sendRequest() {
      this.loading = true
      this.$fire.functions
        .httpsCallable('request-sendRequest')({
          coachName: this.coachName,
          message: this.message,
          coachUID: this.$route.params.beratung,
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
