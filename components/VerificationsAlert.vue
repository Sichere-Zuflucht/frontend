<template>
  <div v-if="data">
    <p
      v-if="
        !(
          data.info &&
          data.stripe.payoutsEnabled &&
          data.verifySetting.verified
        )
      "
    >
      Bitte vervollständigen Sie Ihr Konto, damit wir Ihr Profil freischalten
      können.
    </p>
    <v-stepper
      v-if="
        !(
          data.info &&
          data.stripe.payoutsEnabled &&
          data.verifySetting.verified
        )
      "
      v-model="steps"
      vertical
    >
      <v-stepper-step
        :complete="!!data.info"
        step="1"
        :editable="!data.info"
        color="success"
      >
        <h2
          class="text-h5 text-uppercase secondary--text"
          style="text-shadow: none"
        >
          Profil
        </h2>
        <small>Erstelle oder vervollständige dein Profil</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-btn class="mr-2 mb-2" color="secondary" to="beratung/edit-profil">
          bearbeiten
        </v-btn>
      </v-stepper-content>
      <v-stepper-step
        :complete="!!data.stripe.payoutsEnabled"
        :editable="!data.stripe.payoutsEnabled"
        step="2"
        :color="!!data.stripe.payoutsEnabled ? 'success' : 'secondary'"
      >
        <h2
          class="text-h5 text-uppercase secondary--text"
          style="text-shadow: none"
        >
          Zahlungsart
        </h2>
        <small>Mit dem Zahlungssystem verbinden</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-btn class="mr-2 mb-2" color="secondary" to="beratung/bezahlung">
          verbinden
        </v-btn>
      </v-stepper-content>
      <v-stepper-step
        :complete="!!data.verifySetting.verified"
        :editable="!data.verifySetting.verified"
        step="3"
        :color="!!data.verifySetting.verified ? 'success' : 'secondary'"
      >
        <h2
          class="text-h5 text-uppercase secondary--text"
          style="text-shadow: none"
        >
          Verifizierung
        </h2>
        <small>Von uns verifizieren lassen</small>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-btn
          class="mr-2 mb-2"
          color="secondary"
          to="beratung/personenverifizierung"
        >
          starten
        </v-btn>
      </v-stepper-content>
      <!-- <v-alert color="red lighten-4">
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
      <v-divider class="my-2"></v-divider> -->
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      steps: 1,
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
        this.steps = this.data.info
          ? this.data.stripe.chargesEnabled && this.data.stripe.payoutsEnabled
            ? 3
            : 2
          : 1
      })
  },
}
</script>
