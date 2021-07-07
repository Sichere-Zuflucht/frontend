<template>
  <v-container>
    <h1 class="text-h1 primary--text mb-4">Schön, dass du da bist!</h1>
    <h2 class="text-h2 secondary--text mb-4">Du kannst direkt loslegen.</h2>
    <p class="caption">Bitte vervollständige als erstes dein Profil.</p>
    <v-form ref="form" v-model="valid" class="mb-8 mt-16">
      <h2 class="text-h2 secondary--text">Was möchtest du?</h2>
      <v-radio-group v-model="membership" mandatory>
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
        v-model="firstName"
        class="secondary--text font-weight-bold"
        :rules="textRules"
        label="Vorname"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        class="secondary--text font-weight-bold"
        :rules="textRules"
        label="Nachname"
      ></v-text-field>
      <v-text-field
        v-if="membership ? (membership.id === 'Coach' ? true : false) : false"
        v-model="profession"
        type="text"
        class="secondary--text font-weight-bold"
        :rules="textRules"
        label="Beruf"
      ></v-text-field>
      <v-text-field
        v-model="password"
        class="secondary--text font-weight-bold"
        label="Passwort"
        :rules="passwordRules"
        :type="hidePassword ? 'password' : 'text'"
        :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="() => (hidePassword = !hidePassword)"
      ></v-text-field>
      <v-text-field
        v-model="password2"
        class="secondary--text font-weight-bold"
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
      // this.loading = true
      this.$fire.auth.currentUser
        .updatePassword(this.password)
        .catch((e) => {
          console.error(e)
          this.showError = true
        })
        .then(() => {
          const createdUserData = {}
          if (this.membership.id === 'Coach') {
            createdUserData.public = {
              firstName: this.firstName,
              lastName: this.lastName,
              profession: this.profession,
              professionDuration: this.professionDuration,
              membership: this.membership.id,
            }
            createdUserData.private = {
              email: this.$fire.auth.currentUser.email,
            }
          } else {
            createdUserData.public = {
              membership: this.membership.id,
            }
            createdUserData.private = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.$fire.auth.currentUser.email,
            }
          }
          console.log('dispatch sotre create firebase user')
          return this.$store.dispatch(
            'modules/user/createFirebaseUser',
            createdUserData
          )
        })
    },
  },
}
</script>
