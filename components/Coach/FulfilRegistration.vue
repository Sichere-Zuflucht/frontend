<template>
  <div>
    <client-only v-if="userData && userData.private && userData.public">
      <p
        v-if="
          !(
            userData.public.info &&
            userData.private.stripe.payoutsEnabled &&
            userData.private.verifySetting.verified
          )
        "
      >
        Bitte vervollständigen Sie Ihr Konto, damit wir Ihr Profil freischalten
        können.
      </p>
      <v-stepper
        v-if="
          !(
            userData.public.info &&
            userData.private.stripe.payoutsEnabled &&
            userData.private.verifySetting.verified
          )
        "
        v-model="steps"
        vertical
      >
        <v-stepper-step
          :complete="!!userData.public.info"
          step="1"
          :editable="!userData.public.info"
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
          <v-btn
            class="mr-2 mb-2"
            color="secondary"
            nuxt
            append
            to="/beratung/edit-profil"
          >
            bearbeiten
          </v-btn>
        </v-stepper-content>
        <v-stepper-step
          :complete="!!userData.private.stripe.payoutsEnabled"
          :editable="!userData.private.stripe.payoutsEnabled"
          step="2"
          :color="
            !!userData.private.stripe.payoutsEnabled ? 'success' : 'secondary'
          "
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
          <v-btn class="mr-2 mb-2" color="secondary" nuxt append to="bezahlung">
            verbinden
          </v-btn>
        </v-stepper-content>
        <v-stepper-step
          :complete="!!userData.private.verifySetting.verified"
          :editable="!userData.private.verifySetting.verified"
          step="3"
          :color="
            userData.private.verifySetting.isVerifying
              ? 'blue'
              : !!userData.private.verifySetting.verified
              ? 'success'
              : 'secondary'
          "
        >
          <h2
            class="text-h5 text-uppercase secondary--text"
            style="text-shadow: none"
          >
            Verifizierung
            {{ userData.private.verifySetting.isVerifying ? 'im Gange' : '' }}
          </h2>
          <small>Von uns verifizieren lassen</small>
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-btn
            class="mr-2 mb-2"
            color="secondary"
            nuxt
            append
            to="personenverifizierung"
          >
            {{
              userData.private.verifySetting.isVerifying
                ? 'erneut anfragen'
                : 'starten'
            }}
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </client-only>
  </div>
</template>

<script>
export default {
  computed: {
    userData() {
      return this.$store.getters['modules/user/user']
    },
    steps() {
      if (!this.$store.getters['modules/user/public'].info) return 1
      if (!this.$store.getters['modules/user/stripeDone']) return 2
      return 3
    },
  },
}
</script>
