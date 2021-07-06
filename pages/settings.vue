<template>
  <div>
    <v-sheet color="secondary d-flex justify-center">
      <v-icon size="60" class="pa-12" color="white"
        >mdi-account-cog-outline</v-icon
      >
    </v-sheet>
    <v-container>
      <small>Name:</small>
      <p>{{ user.firstName }} {{ user.lastName }}</p>
      <small>NutzerID:</small>
      <p>{{ user.uid }}</p>
      <small>E-Mail:</small>
      <p>{{ user.email }}</p>
      <small>Mitglied als:</small>
      <p>{{ membership ? membership.name : '' }}</p>
      <v-btn
        :disabled="btn.disabled"
        :loading="btn.loading"
        @click="resetPassword"
        color="secondary"
        >Passwort ändern</v-btn
      >
      <v-alert v-if="btn.success" type="success" color="success"
        >Es wurde eine E-Mail an {{ user.email }} geschickt. Bitte folgen Sie
        den dort beschriebenen Anweisungen.</v-alert
      >
      <v-dialog v-model="overlay" width="300">
        <template v-slot:activator="{ on }">
          <v-btn color="error" text v-on="on">Account löschen</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <h2 class="text-h2 error--text">Achtung</h2>
          </v-card-title>
          <v-card-text>
            <p>
              Bist du dir sicher, dass du dein Profil löschen möchtest? Dieser
              Vorgang ist nicht wieder Rückgängig zu machen. Alle deine Daten
              werden unwiederuflich von unserer Datenbank gelöscht.
            </p>
            <p>
              Bitte fügen dein Passwort ein, wenn du dein Profil wirklich
              löschen möchtest.
            </p>
          </v-card-text>
          <v-card-actions
            ><v-form v-model="deleteVal" ref="deleteForm">
              <v-text-field
                v-model="userProvidedPassword"
                outlined
                label="Passwort einfügen"
                type="password"
                :rules="rules.delete"
                color="error"
              ></v-text-field>
              <v-btn
                color="error"
                :disabled="!deleteVal"
                @click="deleteUser"
                :loading="deleteLoading"
                >wirklich löschen</v-btn
              >
              <v-btn @click="overlay = !overlay">abbrechen</v-btn></v-form
            ></v-card-actions
          ></v-card
        >
      </v-dialog>
      <v-alert v-if="err.status" type="error" color="error">{{
        err.msg
      }}</v-alert>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.getters['modules/user/user'],
      membership: this.$store.getters['modules/user/membership'],
      btn: {
        disabled: false,
        loading: false,
        success: false,
      },
      err: {
        status: false,
        msg: '',
      },
      overlay: false,
      userProvidedPassword: null,
      deleteVal: false,
      deleteLoading: false,
      rules: {
        delete: [(v) => !!v || 'Passwort einfügen.'],
      },
    }
  },
  methods: {
    resetPassword() {
      this.btn.loading = true
      this.$fire.auth
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
          this.btn.loading = false
          this.btn.disabled = true
          this.btn.success = true
        })
        .catch((error) => {
          this.err.status = true
          this.err.msg = error.code + ': ' + error.message
          // ..
        })
    },
    deleteUser() {
      this.deleteLoading = true
      this.$fire.firestore
        .collection('requests')
        .where('ids', 'array-contains', this.user.uid)
        .get()
        .then((ref) => {
          ref.docs.forEach((doc) => {
            this.$fire.firestore.collection('requests').doc(doc.id).delete()
          })
          this.$fire.firestore
            .collection('users')
            .doc(this.user.uid)
            .delete()
            .then(() => {
              this.$fire.auth
                .signInWithEmailAndPassword(
                  this.user.email,
                  this.userProvidedPassword
                )
                .then((userCredential) => {
                  this.$fire.auth.currentUser
                    .delete()
                    .then(() => {
                      this.$router.push('/')
                      // User deleted.
                    })
                    .catch((error) => {
                      this.err.status = true
                      this.err.msg = error.code + ': ' + error.message
                    })
                })
                .catch((error) => {
                  this.err.status = true
                  this.err.msg = error.code + ': ' + error.message
                })
            })
            .catch((error) => {
              this.err.status = true
              this.err.msg = error.code + ': ' + error.message
            })
        })
    },
  },
}
</script>
