<template>
  <v-container>
    <h1 class="text-h1 primary--text">Bitte vervollständige dein Profil</h1>
    <p class="caption mt-6 text--secondary">Fülle alle Felder aus</p>
    <v-form v-model="valid" class="mb-8">
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
      <!--<v-select
        v-model="membership"
        :items="memberships"
        label="Als was meldest du dich an?"
        item-text="description"
        return-object
      ></v-select>-->
      <h2 class="text-h2 secondary--text mt-6">Wer bist du?</h2>
      <p v-if="membership ? (membership.id === 'Coach' ? true : false) : false">
        Diese Angaben werden später in deinem Profil zu sehen sein. Du kannst
        sie aber jederzeit anpassen.
      </p>
      <v-text-field
        type="text"
        class="secondary--text font-weight-bold"
        v-model="firstName"
        label="Vorname"
        :rules="textRules"
      ></v-text-field>
      <v-text-field
        type="text"
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
        v-if="membership ? (membership.id === 'Coach' ? true : false) : false"
        type="number"
        class="secondary--text font-weight-bold"
        v-model="professionDuration"
        :rules="textRules"
        label="Wie viele Jahre Berufserfahrung?"
      ></v-text-field>
      <v-text-field
        class="secondary--text font-weight-bold"
        v-model="password"
        label="Passwort"
        :rules="passwordRules"
        :type="value ? 'password' : 'text'"
        :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="() => (value = !value)"
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
      value: String,
      valid: false,
      lastName: '',
      firstName: '',
      textRules: [(v) => !!v || 'Bitte ausfüllen'],
      profession: null,
      professionDuration: null,
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
          this.memberships.sort(function (a, b) {
            return a < b ? 1 : -1
          })
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
              professionDuration: this.professionDuration,
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
