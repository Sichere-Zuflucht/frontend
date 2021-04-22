<template>
  <v-container>
    <v-row>
      <v-form>
        <v-text-field v-model="email" label="E-mail" required></v-text-field
      ></v-form>
      <v-btn @click="login">Registrierung abschließen</v-btn>
    </v-row>
    <v-row v-if="showError">
      Irgendetwas ist schief gelaufen. Versuche dich erneut zu registrieren.
      <v-btn :to="{ path: '/sign-up' }">Erneut registrieren</v-btn>
    </v-row>
  </v-container>
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
