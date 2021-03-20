<template>
  <v-container>
    <v-form v-model="valid" style="width: 100%">
      <v-row>
        <v-col>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col
          ><v-btn :loading="loading" :disabled="!valid" @click="signup">
            Registrieren
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row v-if="showConfirmation" class="text-h4">
      Dir wurde an {{ email }} eine Bestätigunsmail geschickt. Bitte folge den
      Anweisungen dort.</v-row
    >
    <v-btn @click="$router.push({ path: '/update-profile2' })"></v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    loading: false,
    showConfirmation: false,
  }),
  mounted() {
    const email = window.localStorage.getItem('emailForSignIn')
    if (email) {
      this.email = email
      this.showConfirmation = true
    }
  },
  methods: {
    signup() {
      this.loading = true
      window.$nuxt.$fire.auth
        .sendSignInLinkToEmail(this.email, {
          url: process.env.baseUrl + '/register',
          handleCodeInApp: true,
        })
        .then(() => {
          this.loading = false
          this.showConfirmation = true
          window.localStorage.setItem('emailForSignIn', this.email)
        })
    },
  },
}
</script>
