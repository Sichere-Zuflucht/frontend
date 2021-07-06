<template>
  <div>
    <h2 class="text-h2 primary--text">Verifizierung</h2>

    <div v-if="!isVerifying && !verified">
      <p class="mt-4">
        <b
          >Wir prüfen jede Anmeldung persönlich und schalten erst im Anschluss
          Ihr Profil frei.</b
        ><br />
        Jede Person, die uns als Berater*in unterstützen möchte, wird von uns
        auf Echtheit geprüft. So können wir gewährleisten, dass wir nur
        professionelle Berater*innen zulassen.
      </p>
      <p class="mt-4">
        <b>Wir wollen Sie kennenlernen</b><br />
        Deshalb bitten wir Sie um Ihre Kontaktdaten, damit wir uns in den
        nächsten 48h persönlich bei Ihnen melden können.
      </p>
      <v-card
        :style="'border: 1px solid ' + $vuetify.theme.themes.light.secondary"
      >
        <v-card-title class="font-weight-bold secondary--text"
          >Kontaktdaten</v-card-title
        >
        <v-card-text>
          <v-form v-model="verifyVal" ref="verifyForm">
            <v-text-field
              label="Tel./Hdy.*"
              outlined
              type="tel"
              :rules="rules.phone"
              v-model="verPhone"
            ></v-text-field>
            <v-text-field
              label="Webseite"
              outlined
              v-model="verWeb"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-btn
                v-if="user"
                color="secondary"
                @click="updateVerify"
                :disabled="!verifyVal"
                >Senden</v-btn
              >
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
    <div v-else-if="isVerifying && !verified">
      <v-chip color="secondary" small class="my-2" dark
        >wird verifiziert...</v-chip
      >
      <p class="caption my-4">
        Sie haben uns ihre Kontaktdaten zugeschickt, anhand denen wir uns bei
        Ihnen melden werden. Sollten Sie nach 48 Stunden noch keine Antwort von
        uns erhalten haben, dann prüfen Sie bitte zuerst Ihre Email Inbox und
        den Spam Ordner, bevor Sie uns erneut kontaktieren.
      </p>
      <v-btn v-show="!expand" @click="expand = !expand"
        >Erneut kontaktieren</v-btn
      >
    </div>
    <div v-else>
      <v-alert type="info" color="success" class="my-4"
        >Sie sind erfolgreich verifiziert</v-alert
      >
    </div>
    <v-expand-transition>
      <v-card
        v-show="expand"
        v-if="!verified"
        :style="'border: 1px solid ' + $vuetify.theme.themes.light.secondary"
      >
        <v-card-title class="font-weight-bold secondary--text"
          >Kontaktdaten</v-card-title
        >
        <v-card-text>
          <v-form v-model="verifyVal" ref="verifyForm">
            <v-text-field
              label="Tel./Hdy.*"
              outlined
              type="tel"
              :rules="rules.phone"
            ></v-text-field>
            <v-text-field label="Webseite" outlined></v-text-field>

            <div class="d-flex justify-center">
              <v-btn
                v-if="user"
                color="secondary"
                @click="updateVerify"
                :disabled="!verifyVal"
                >Senden</v-btn
              >
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-expand-transition>
    <v-divider class="my-16" />
    <p class="mt-4">
      <b>Warum ist die Verifizierung nötig?</b><br />
      Wir müssen gewährleisten, dass wir nur Personen in unseren Beraterkreis
      aufnehmen, die unseren Frauen auch wirklich qualifiziert helfen können.
      Deshalb prüfen wir jede einzelne Anmeldung.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    for: {
      type: String,
      default: 'Coach', // Coach, Woman, Landlord
    },
  },
  data() {
    return {
      verifyVal: false,
      rules: {
        phone: [
          (v) => !!v || 'Nummer ist erforderlich',
          (v) =>
            /^0[0-9]{1,15}$/.test(v) ||
            /^\+[1-9][0-9]{1,15}$/.test(v) ||
            'Nummer muss mit 0 oder gültiger Ländervorwahl mit + beginnen',
        ],
      },
      expand: this.isVerifying,
      verPhone: '',
      verWeb: '',
    }
  },
  computed: {
    isVerifying() {
      return this.$store.getters['modules/user/isVerifying']
    },
    verified() {
      return this.$store.getters['modules/user/verified']
    },
    user() {
      return this.$store.getters['modules/user/user']
    },
  },
  methods: {
    updateVerify() {
      this.$fire.functions.httpsCallable('email-sendVerifyAccMail')({
        tel: this.verPhone,
        www: this.verWeb,
      })
      const uid = this.user.uid
      const verifySetting = {
        isVerifying: true,
        verified: false,
      }
      this.$store.dispatch('modules/user/setVerify', {
        uid,
        verifySetting,
      })
    },
  },
}
</script>
