<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="surName" label="Vorname" required></v-text-field>
      <v-text-field
        v-model="password"
        label="Passwort"
        :rules="passwordRules"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="password2"
        :rules="passwordRules2"
        label="Passwort wiederholen"
        type="password"
        required
      ></v-text-field>
      <v-btn :loading="loading" :disabled="!valid" @click="updateProfile"
        >Update</v-btn
      >
    </v-form>
    <v-row v-if="showError">
      Irgendetwas ist schief gelaufen. Versuche dich erneut zu registrieren.
      <v-btn :to="{ path: '/sign-up' }">Erneut registrieren</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProfileInformation',
  data() {
    return {
      valid: false,
      name: '',
      surName: '',
      password: '',
      password2: '',
      passwordRules: [
        (v) => !!v || 'Passwort nicht vergessen',
        (v) =>
          (!!v && v.length >= 8) ||
          'Passwort muss mindestens 8 Zeichen lang sein',
      ],
      passwordRules2: [
        (v) => !!v || 'Passwort nicht vergessen',
        (v) =>
          (!!v && v === this.password) || 'Passwörter müssen übereinstimmen',
      ],
      showError: false,
      loading: false,
    }
  },
  methods: {
    updateProfile() {
      this.loading = true
      window.$nuxt.$fire.auth.currentUser
        .updatePassword(this.password)
        .catch(() => (this.showError = true))
        .then(() => {
          // window.$nuxt.$fire.firestore.collection('users').doc().push({
          //   fistName: this.surName,
          //   lastName: this.name,
          //   avatar: 'https://picsum.photos/seed/g00385/200',
          // })
        })
        .then(() => {
          this.loading = false
          // this.$router.push('/')
        })
    },
  },
}
</script>
