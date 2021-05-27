<template>
  <div v-if="data">
    <div
      v-if="
        !(
          data.info &&
          data.stripe.payoutsEnabled &&
          data.verifySetting.verified
        )
      "
    >
      <v-divider class="my-2"></v-divider>
      <v-alert color="red lighten-4">
        <p>
          Schließe folgende Punkte vollständig ab, um für die Frauen einsehbar
          zu werden:
        </p>
        <v-btn v-if="!data.info" class="mr-2 mb-2" to="beratung/registrierung">
          <v-icon small class="pr-2">mdi-account</v-icon> Profil
        </v-btn>
        <v-btn
          v-if="!data.stripe.payoutsEnabled"
          class="mr-2 mb-2"
          append
          to="bezahlung"
          ><v-icon small class="pr-2">mdi-credit-card-outline</v-icon>
          Bezahlung
        </v-btn>
        <v-btn
          v-if="!data.verifySetting.verified"
          class="mr-2 mb-2"
          append
          to="personenverifizierung"
        >
          <v-icon small class="pr-2">mdi-shield-check</v-icon>
          Verifizierung</v-btn
        >
      </v-alert>
      <v-divider class="my-2"></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    }
  },
  mounted() {
    const uid = this.$store.getters['modules/user/uid']
    const db = this.$fire.firestore
    db.collection('users')
      .doc(uid)
      .get()
      .then((data) => {
        this.data = data.data()
      })
  },
}
</script>
