<template>
  <v-row class="ma-0">
    <v-col cols="12" md="6" height="100%" class="pa-0">
      <v-sheet color="secondary" dark height="100%">
        <v-container
          style="max-width: 450px; position: sticky; top: 100px"
          class="ma-auto"
        >
          <h1 class="text-h2 white--text text-uppercase pb-8">
            SCHÖN, DASS DU DA BIST! <br />DU KANNST DIREKT LOSLEGEN.
          </h1>
          <p>Bitte schließe als erstes deine Registrierung ab.</p>
          <v-icon large>mdi-arrow-right-thin</v-icon></v-container
        ></v-sheet
      ></v-col
    ><v-col cols="12" md="6" class="pa-0">
      <v-container>
        <v-stepper v-if="memberships" v-model="stepper" elevation="0">
          <v-stepper-header style="box-shadow: none">
            <v-stepper-step
              step="1"
              :complete="stepper > 1"
              :editable="stepper > 1"
              :color="stepper > 1 ? 'success' : 'primary'"
            >
              Anliegen
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              step="2"
              :complete="stepper > 2"
              :editable="stepper > 2"
              :color="stepper > 2 ? 'success' : 'primary'"
            >
              Anmeldung
            </v-stepper-step>
            <v-divider
              v-if="membership ? membership.id === 'Coach' : false"
            ></v-divider>
            <v-stepper-step
              v-if="membership ? membership.id === 'Coach' : false"
              step="3"
              :complete="stepper > 3"
            >
              Verifizierung
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items class="pb-4">
            <v-stepper-content step="1">
              <h2 class="text-h2 secondary--text pb-4">Dein/Ihr Anliegen</h2>
              <v-chip-group
                v-model="membership"
                column
                mandatory
                style="width: 260px"
                class="d-flex flex-column"
              >
                <v-chip
                  v-for="(n, i) in memberships"
                  :key="i"
                  :value="n"
                  outlined
                  active-class="primary primary--text font-weight-bold"
                >
                  <v-icon class="pr-2">{{ n.icon }}</v-icon>
                  <p class="ma-0" style="padding-top: 2px">
                    {{ n.description }}
                  </p>
                </v-chip>
              </v-chip-group>
              <v-btn
                color="secondary"
                class="mt-4"
                style="float: right"
                @click="stepper++"
                >Weiter</v-btn
              >
            </v-stepper-content>
          </v-stepper-items>
          <v-stepper-items>
            <v-stepper-content step="2">
              <div v-if="membership ? membership.id === 'Coach' : false">
                <h2 class="text-h2 secondary--text pb-4">Anmeldung</h2>
                <p>
                  Ihr Vor- und Nachname werden in Ihrem Profil öffentlich
                  sichtbar sein.
                </p>
              </div>
              <div v-else>
                <h2 class="text-h2 secondary--text pb-4">Passwort</h2>
                <p>
                  Du brauchst ein Passwort, um dich in dein Konto einzuloggen
                  und mit den Berater*innen Kontakt aufnehmen zu können.
                </p>
              </div>
              <v-form ref="form" v-model="validMem" class="pt-8">
                <v-text-field
                  v-if="membership ? membership.id === 'Coach' : false"
                  v-model="firstName"
                  class="secondary--text font-weight-bold"
                  :rules="rules.textRules"
                  label="Vorname"
                  type="name"
                ></v-text-field>
                <v-text-field
                  v-if="membership ? membership.id === 'Coach' : false"
                  v-model="lastName"
                  class="secondary--text font-weight-bold"
                  :rules="rules.textRules"
                  label="Nachname"
                  type="name"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  class="secondary--text font-weight-bold"
                  label="Passwort"
                  :rules="rules.passwordRules"
                  :type="hidePassword ? 'password' : 'text'"
                  :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                  persistent-hint
                  hint="Nutzen Sie ein sicheres Passwort. Mindestens 8 Zeichen, eine Zahl, ein Sonderzeichen (#?!@$ %^&*-), einmal Groß- und Kleinschreibung."
                  @click:append="() => (hidePassword = !hidePassword)"
                ></v-text-field>
                <v-text-field
                  v-model="password2"
                  class="secondary--text font-weight-bold"
                  :rules="rules.passwordRules2"
                  label="Passwort wiederholen"
                  type="password"
                ></v-text-field>
                <v-btn
                  v-if="membership ? membership.id === 'Coach' : false"
                  color="secondary"
                  class="mt-4"
                  style="float: right"
                  :disabled="!validMem"
                  @click="stepper++"
                  >Weiter</v-btn
                >
                <v-btn
                  v-else
                  color="secondary"
                  class="mt-4"
                  style="float: right"
                  :loading="loading"
                  :disabled="!validMem"
                  @click="updateProfile"
                  >Passwort speichern</v-btn
                ></v-form
              >
            </v-stepper-content></v-stepper-items
          >
          <v-stepper-items>
            <v-stepper-content step="3">
              <div v-if="!success">
                <h2 class="text-h2 secondary--text pb-4">Verifizierung</h2>
                <p>
                  Wir prüfen Ihr Profil auf Echtheit. Dafür benötigen wir Ihre
                  Telefonnummer, E-Mail-Adresse und ggf. Webseite.
                </p>
                <nuxt-link to="" target="_blank"
                  >Warum ist eine Verifizierung nötig?</nuxt-link
                >
                <v-form ref="verify" v-model="validRef" class="pt-8">
                  <v-text-field
                    v-model="verPhone"
                    class="secondary--text font-weight-bold"
                    :rules="rules.phone"
                    label="Telefonnummer"
                    type="tel"
                  ></v-text-field>
                  <p class="caption pb-4">
                    Wir nehmen innerhalb der nächsten Tage mit Ihnen Kontakt
                    auf, um Sie kennenzulernen und offene Fragen klären zu
                    können.
                  </p>
                  <v-text-field
                    v-model="verEmail"
                    class="secondary--text font-weight-bold"
                    :rules="rules.email"
                    label="E-Mail-Adresse"
                    type="email"
                    persistent-hint
                    hint="Über die wir mit Ihnen Kontakt aufnehmen dürfen."
                  ></v-text-field>
                  <v-text-field
                    v-model="verWeb"
                    class="secondary--text font-weight-bold"
                    label="Webseite (optional)"
                  ></v-text-field>
                  <v-btn
                    color="secondary"
                    :loading="loading"
                    :disabled="!validRef"
                    class="mt-4"
                    style="float: right"
                    @click="updateProfile"
                    >Verifizierung starten</v-btn
                  >
                </v-form>
              </div>
              <div v-else>
                <h2 class="text-h2 secondary--text pb-4">
                  VERIFIZIERUNG GESTARTET
                </h2>
                <p>
                  Es kann einige Tage dauern, bis wir uns bei Ihnen melden.
                  Nutzen Sie die Zeit gern, um Ihr Profil zu erstellen.
                </p>
                <v-btn color="secondary" class="my-4" to="/beratung/edit-profil"
                  >Profil anlegen</v-btn
                >
                <p>
                  Sobald Ihr Profil vollständig ist und Sie verifiziert sind,
                  stellen wir Ihr Profil online und Sie können mit der Beratung
                  beginnen.
                </p>
              </div>
              <v-alert v-if="error">{{ error ? error : '' }}</v-alert>
            </v-stepper-content></v-stepper-items
          >
        </v-stepper>
      </v-container></v-col
    ></v-row
  >
</template>

<script>
export default {
  name: 'UpdateProfile',
  data() {
    return {
      validMem: false,
      validRef: false,
      stepper: 1,
      // email: this.$store.getters['modules/user/user'].claims.email,
      lastName: null,
      firstName: null,
      rules: {
        textRules: [
          // (v) => !!v || 'Bitte ausfüllen',
          (v) => (v && v.length >= 3) || 'mind. 3 Zeichen lang',
        ],
        passwordRules: [
          (v) =>
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
              v
            ) ||
            'Nutzen Sie ein sicheres Passwort. Mindestens 8 Zeichen, eine Zahl, ein Sonderzeichen (#?!@$ %^&*-), einmal Groß- und Kleinschreibung.',
        ],
        passwordRules2: [
          (v) => !!v || 'Passwortüberprüfung nicht vergessen',
          (v) =>
            (!!v && v === this.password) || 'Passwörter müssen übereinstimmen',
        ],
        phone: [
          (v) => !!v || 'Telefonnummer nicht vergessen',
          (v) =>
            /^(?:\+\d{2}|0|00\d{2})(?:\s*\d{3}){2}\s*\d{4,10}/.test(v) ||
            'Ungültiges Format',
        ],
        email: [
          (v) =>
            /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(v) ||
            'Ungültiges Format',
        ],
      },
      password: '',
      hidePassword: true,
      password2: '',
      showError: false,
      loading: false,
      memberships: [],
      membership: undefined,
      verPhone: '',
      verEmail: '',
      verWeb: '',
      success: false,
      error: null,
    }
  },
  async fetch() {
    this.memberships = (
      await this.$fire.firestore.collection('memberships').get()
    ).docs.map((doc) => doc.data())
    this.memberships.reverse()
    this.membership = this.memberships[0]
  },
  fetchOnServer: false,
  methods: {
    updateProfile() {
      this.loading = true
      this.$fire.auth.currentUser
        .updatePassword(this.password)
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e)
          this.showError = true
          this.loading = false
        })
        .then(() => {
          const createdUserData = {}
          if (this.membership.id === 'Coach') {
            createdUserData.public = {
              firstName: this.firstName,
              lastName: this.lastName,
              membership: this.membership.id,
            }
            createdUserData.private = {
              email: this.$fire.auth.currentUser.email,
            }
            this.$store
              .dispatch('modules/user/requestVerify', {
                tel: this.verPhone,
                www: this.verWeb,
                email: this.verEmail,
              })
              .then(() => {
                this.loading = false
                this.success = true
              })
            return this.$store.dispatch('modules/user/createFirebaseUser', {
              userData: createdUserData,
              redirectTo: false,
            })
          } else {
            createdUserData.public = {
              membership: this.membership.id,
            }
            createdUserData.private = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.$fire.auth.currentUser.email,
            }
            window.localStorage.setItem('newWoman', true)
            return this.$store.dispatch('modules/user/createFirebaseUser', {
              userData: createdUserData,
              redirectTo: true,
            })
          }
        })
    },
  },
}
</script>
