<template>
  <div>
    <h1 class="text-h1 primary--text mb-4">Verifizierung<br />anfragen</h1>

    <div v-if="!isVerifying && !verified">
      <p>
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
          <v-form ref="verifyForm" v-model="verifyVal">
            <v-text-field
              v-model="verPhone"
              label="Tel./Handy.*"
              outlined
              type="tel"
              :rules="rules.phone"
            ></v-text-field>
            <v-text-field
              v-model="verWeb"
              label="Webseite"
              outlined
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-btn
                v-if="user"
                color="secondary"
                :disabled="!verifyVal"
                :loading="updateVerifyLoading"
                @click="updateVerify"
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
        Ihnen telefonisch melden werden. Sollten Sie nach 48 Stunden noch keinen
        Anruf von uns erhalten haben, können Sie sich über den Button erneut
        verifizieren.
      </p>
      <v-row class="mt-3">
        <v-btn v-show="!expand" @click="expand = !expand"
          >neu verifizieren</v-btn
        >
      </v-row>
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
          <v-form ref="verifyForm" v-model="verifyVal">
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
                :disabled="!verifyVal"
                @click="updateVerify"
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
      Wir müssen gewährleisten, dass wir nur Personen in unseren
      Berater*innenkreis aufnehmen, die unseren Frauen auch wirklich
      qualifiziert helfen können. Deshalb prüfen wir jede einzelne Anmeldung.
    </p>
    <v-btn class="pl-0" color="primary" text
      >Mehr Infos auf unserer Berater*innenseite</v-btn
    >
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
      updateVerifyLoading: false,
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
      this.updateVerifyLoading = true
      this.$store
        .dispatch('modules/user/requestVerify', {
          tel: this.verPhone,
          www: this.verWeb,
        })
        .then(() => (this.updateVerifyLoading = false))
    },
  },
}
</script>
