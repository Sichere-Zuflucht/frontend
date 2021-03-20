<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="surName" label="Vorname" required></v-text-field>
      <v-select
        :items="memberships"
        v-model="membership"
        label="Als was meldest du dich an?"
        item-text="description"
        item-value="name"
      ></v-select>
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
      memberships: [],
      membership: undefined,
    }
  },
  mounted() {
    window.$nuxt.$fire.firestore
      .collection('memberships')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.memberships.push(doc.data())
          if (!this.membership) this.membership = doc.data()
        })
      })
  },
  methods: {
    updateProfile() {
      this.loading = true
      const db = window.$nuxt.$fire.firestore
      window.$nuxt.$fire.auth.currentUser
        .updatePassword(this.password)
        .catch((e) => {
          console.error(e)
          this.showError = true
        })
        .then(() => {
          db.collection('users/')
            .doc(window.$nuxt.$fire.auth.currentUser.uid)
            .set({
              fistName: this.surName,
              lastName: this.name,
              avatar: 'https://picsum.photos/seed/g00385/200',
              createdAt: new Date(),
              membership: db
                .collection('memberships')
                .doc(this.membership.name),
            })
        })
        .then(() => {
          this.loading = false
          this.$router.push('/' + this.membership.name)
        })
    },
  },
}
</script>
