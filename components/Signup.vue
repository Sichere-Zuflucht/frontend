<template>
  <v-container>
    <v-row>
      <v-form
        v-model="valid"
        style="width: 100%"
        class="mb-4"
        onSubmit="return false;"
        @submit="handleEmail"
      >
        <v-row>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            append-icon="mdi-arrow-right"
          ></v-text-field>
        </v-row>
        <v-row v-if="requestPassword">
          <v-text-field
            v-model="password"
            label="Passwort"
            type="password"
            required
          ></v-text-field>
        </v-row>
        <v-row
          ><v-btn :loading="loading" :disabled="!valid" @click="handleEmail"
            >Next</v-btn
          ></v-row
        >
      </v-form>
    </v-row>
    <v-row v-if="showConfirmation" class="text-h4">
      Dir wurde an {{ email }} eine Bestätigunsmail geschickt. Bitte folge den
      Anweisungen dort.</v-row
    >
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: '',
    password: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    loading: false,
    showConfirmation: false,
    baseUrl: '',
    requestPassword: false,
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
    signup() {
      this.loading = true
      window.$nuxt.$fire.auth
        .sendSignInLinkToEmail(this.email, {
          url: this.baseUrl + '/register',
          handleCodeInApp: true,
        })
        .then(() => {
          this.loading = false
          this.showConfirmation = true
          window.localStorage.setItem('emailForSignIn', this.email)
        })
    },
    handleEmail() {
      if (!this.valid) return
      if (!this.requestPassword) {
        window.$nuxt.$fire.auth
          .fetchSignInMethodsForEmail(this.email)
          .then((loginMethods) => {
            if (loginMethods.length <= 1) {
              this.signup()
            } else {
              this.requestPassword = true
            }
          })
      } else {
        this.loading = true
        window.$nuxt.$fire.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.loading = false
            this.$router.push('/')
          })
      }
    },
  },
}
</script>
