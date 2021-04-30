<template>
  <div>
    <h1 class="text-h1 primary--text mb-4">Registrierung</h1>
    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="email"
            label="Registrierte E-mail"
            persistent-hint
            hint="Füge die E-mail ein, mit der du eine Registrierung angefordert hattest."
            required
          ></v-text-field
        ></v-form>
        <v-btn @click="login" class="my-4" color="secondary"
          >Registrierung abschließen</v-btn
        >
        <v-alert v-if="showError" color="error" dark>
          <p>
            Irgendetwas ist schief gelaufen. Versuche dich erneut zu
            registrieren.
          </p>
          <v-btn nuxt to="/signup">Erneut registrieren</v-btn>
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      showError: false,
    }
  },
  mounted() {
    this.register()
  },
  methods: {
    register() {
      // Confirm the link is a sign-in with email link.
      if (this.$fire.auth.isSignInWithEmailLink(window.location.href)) {
        const email = window.localStorage.getItem('emailForSignIn')
        if (email) {
          this.email = email
          this.login()
        }
      }
    },
    login() {
      // The client SDK will parse the code from the link for you.
      this.$fire.auth
        .signInWithEmailLink(this.email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn')
          this.$router.push({
            path: '/update-profile',
            query: { eMail: this.email },
          })
        })
        .catch((e) => {
          this.showError = true
        })
    },
  },
}
</script>
