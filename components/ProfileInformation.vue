<template>
  <v-container>
    <h1 class="text-h1 primary--text mb-4">Schön, dass du da bist!</h1>
    <h2 class="text-h2 secondary--text mb-4">Du kannst direkt loslegen.</h2>
    <p class="caption">Bitte vervollständige als erstes dein Profil.</p>
    <v-form ref="form" v-model="valid" class="mb-8 mt-16">
      <h2 class="text-h2 secondary--text">Was möchtest du?</h2>
      <v-radio-group mandatory v-model="membership">
        <v-radio
          v-for="(n, i) in memberships"
          :key="i"
          :label="n.description"
          :value="n"
          class="align-start"
        >
          <template slot="label">
            <p class="ma-0" style="padding-top: 2px">
              <b>{{ n.description }}</b
              ><br />{{ n.subdescription }}
            </p>
          </template>
        </v-radio>
      </v-radio-group>
      <h2 class="text-h2 secondary--text mt-6">Wer bist du?</h2>
      <p v-if="membership ? (membership.id === 'Coach' ? true : false) : false">
        Diese Angaben werden später in deinem Profil zu sehen sein. Du kannst
        sie aber jederzeit anpassen.
      </p>
      <v-text-field
        class="secondary--text font-weight-bold"
        v-model="firstName"
        :rules="textRules"
        label="Vorname"
      ></v-text-field>
      <v-text-field
        class="secondary--text font-weight-bold"
        v-model="lastName"
        :rules="textRules"
        label="Nachname"
      ></v-text-field>
      <v-text-field
        v-if="membership ? (membership.id === 'Coach' ? true : false) : false"
        type="text"
        class="secondary--text font-weight-bold"
        v-model="profession"
        :rules="textRules"
        label="Beruf"
      ></v-text-field>
      <v-text-field
        class="secondary--text font-weight-bold"
        v-model="password"
        label="Passwort"
        :rules="passwordRules"
        :type="hidePassword ? 'password' : 'text'"
        :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="() => (hidePassword = !hidePassword)"
      ></v-text-field>
      <v-text-field
        class="secondary--text font-weight-bold"
        v-model="password2"
        :rules="passwordRules2"
        label="Passwort wiederholen"
        type="password"
      ></v-text-field>
      <v-btn
        color="secondary"
        absolute
        right
        :loading="loading"
        :disabled="!valid"
        @click="updateProfile"
        >Profil speichern</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'ProfileInformation',
  data() {
    return {
      valid: false,
      lastName: null,
      firstName: null,
      textRules: [
        // (v) => !!v || 'Bitte ausfüllen',
        (v) => (v && v.length >= 3) || 'mind. 3 Zeichen lang',
      ],
      requiredRule: [(v) => !!v || 'Bitte ausfüllen'],
      profession: null,
      password: '',
      hidePassword: true,
      password2: '',
      passwordRules: [
        (v) => !!v || 'Passwort nicht vergessen',
        (v) =>
          (!!v && v.length >= 8) ||
          'Passwort muss mindestens 8 Zeichen lang sein',
      ],
      passwordRules2: [
        (v) => !!v || 'Passwortüberprüfung nicht vergessen',
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
          this.memberships.sort(function (a, b) {
            return a < b ? 1 : -1
          })
        })
      })
  },
  methods: {
    updateProfile() {
      this.$refs.form.validate()
      if (!this.$refs.form.validate()) return
      this.loading = true
      const db = this.$fire.firestore
      this.$fire.auth.currentUser
        .updatePassword(this.password)
        .catch((e) => {
          console.error(e)
          this.showError = true
        })
        .then(() => {
          let createdUserData = {}
          if (this.membership.id === 'Coach') {
            createdUserData = {
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
              profession: this.profession,
              stripe: false,
              verifySetting: {
                isVerifying: false,
                verified: false,
              },
            }
          } else {
            createdUserData = {
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
              verifySetting: {
                isVerifying: false,
                verified: false,
              },
            }
          }
          return this.$store.dispatch('modules/user/createFirebaseUser', {
            uid: this.$fire.auth.currentUser.uid,
            userData: createdUserData,
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
