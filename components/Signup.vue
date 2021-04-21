<template>
  <v-form
    ref="form"
    v-model="valid"
    style="width: 100%"
    class="mb-4"
    @submit="
      (e) => {
        e.preventDefault()
      }
    "
  >
    <v-stepper v-model="e1">
      <v-stepper-items>
        <v-stepper-content step="1">
          <p class="my-4">
            Füge eine eMail ein, um dich einzuloggen / zu registrieren.
          </p>
          <v-text-field
            type="email"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            append-icon="mdi-arrow-right"
          ></v-text-field>

          <v-btn
            color="primary"
            :loading="loading"
            :disabled="!valid"
            @click="next"
            >Weiter</v-btn
          >
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-text-field
            v-if="requestPassword"
            v-model="password"
            label="Passwort"
            :type="value ? 'password' : 'text'"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
            required
          ></v-text-field>
          <p class="my-4" v-else>
            Willst du dich mit der eMail <b>{{ email }}</b> bei Sichere Zuflucht
            zu registrieren?
          </p>
          <v-btn
            v-if="requestPassword"
            class="inline"
            color="success"
            :loading="loading"
            :disabled="!valid"
            @click="login"
            >Einloggen</v-btn
          >
          <v-btn
            v-else
            color="success"
            :loading="loading"
            :disabled="!valid"
            @click="register"
            >{{ buttonText }}</v-btn
          >
          <v-btn @click="e1 = 1" text class="inline"> Zurück </v-btn>
          <v-alert
            v-if="showConfirmation"
            color="success"
            class="white--text mt-4"
            >Eine Bestätigunsmail wurde an {{ email }} geschickt. Überprüfe
            bitte auch den Spam Ordner, falls keine eMail ankommen sollte. Bitte
            folge den dort beschriebenen Anweisungen.</v-alert
          >
          <v-alert v-if="error.status" color="error" class="white--text mt-4">{{
            error.message
          }}</v-alert>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    value: String,
    e1: 1,
    valid: false,
    email: '',
    password: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) =>
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(v) ||
        'E-mail must be valid',
    ],
    loading: false,
    showConfirmation: false,
    baseUrl: '',
    requestPassword: false,
    showRegister: false,
    buttonText: 'Registrieren',
    error: {
      status: false,
      message: '',
    },
  }),
  mounted() {
    this.baseUrl = window.location.origin + process.env.base
    const email = window.localStorage.getItem('emailForSignIn')
    if (email) {
      this.email = email
      this.showConfirmation = true
    }
  },
  methods: {
    next() {
      if (!this.$refs.form.validate()) return
      this.showConfirmation = false
      this.$nuxt.$fire.auth
        .fetchSignInMethodsForEmail(this.email)
        .then((loginMethods) => {
          if (loginMethods.length > 1) {
            this.requestPassword = true
          } else {
            this.requestPassword = false
          }
          this.e1 = 2
        })
    },
    login() {
      this.loading = true
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading = false
          this.$router.push('/profile')
        })
        .catch((err) => {
          this.loading = false
          this.error.status = true
          this.error.message = err.message
        })
    },
    register() {
      if (!this.$refs.form.validate()) return
      this.loading = true
      this.$fire.auth
        .sendSignInLinkToEmail(this.email, {
          url: this.baseUrl + '/register',
          handleCodeInApp: true,
        })
        .then(() => {
          this.buttonText = 'Gesendet'
          this.valid = false
          this.loading = false
          this.showConfirmation = true
          window.localStorage.setItem('emailForSignIn', this.email)
        })
    },
  },
}
</script>
