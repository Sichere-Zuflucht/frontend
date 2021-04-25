<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field v-model="firstName" label="Vorname" required></v-text-field>
      <v-text-field v-model="lastName" label="Nachname" required></v-text-field>
      <v-select
        v-model="membership"
        :items="memberships"
        label="Als was meldest du dich an?"
        item-text="description"
        return-object
      ></v-select>
      <v-text-field
        v-model="password"
        label="Passwort"
        :rules="passwordRules"
        :type="value ? 'password' : 'text'"
        :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="() => (value = !value)"
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
        >Erstellen</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'ProfileInformation',
  data() {
    return {
      value: String,
      valid: false,
      lastName: '',
      firstName: '',
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
    this.$fire.firestore
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
      const db = this.$fire.firestore
      this.$fire.auth.currentUser
        .updatePassword(this.password)
        .catch((e) => {
          console.error(e)
          this.showError = true
        })
        .then(() => {
          return this.$store.dispatch('modules/user/createFirebaseUser', {
            uid: this.$fire.auth.currentUser.uid,
            userData: {
              firstName: this.firstName,
              lastName: this.lastName,
              avatar:
                'https://picsum.photos/seed/' +
                this.$fire.auth.currentUser.uid.substring(0, 8) +
                '/200',
              createdAt: new Date(),
              userName: this.$fire.auth.currentUser.uid.substring(0, 8),
              email: this.$fire.auth.currentUser.email,
              membership: db.collection('memberships').doc(this.membership.id),
              stripe: false,
              verifySetting: {
                isVerifying: false,
                verified: false,
              },
            },
          })
        })
        .then(() => {
          this.loading = false
          this.$router.push('/profile')
        })
    },
  },
}
</script>
