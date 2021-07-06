<template>
  <div>
    <!--    <div v-if="data && info">{{ info }}</div>-->
    <client-only v-if="data && data.private && data.public">
      <div
        v-if="
          !(
            data.public.info &&
            data.private.stripe.payoutsEnabled &&
            data.private.verifySetting.verified
          )
        "
      >
        <v-divider class="my-2"></v-divider>
        <v-alert color="red lighten-4">
          <p>
            Schließe folgende Punkte vollständig ab, um für die Frauen einsehbar
            zu werden:
          </p>
          <v-btn
            v-if="!data.public.info"
            class="mr-2 mb-2"
            to="beratung/registrierung"
          >
            <v-icon small class="pr-2">mdi-account</v-icon> Profil
          </v-btn>
          <v-btn
            v-if="!data.private.stripe.payoutsEnabled"
            class="mr-2 mb-2"
            append
            to="bezahlung"
            ><v-icon small class="pr-2">mdi-credit-card-outline</v-icon>
            Bezahlung
          </v-btn>
          <v-btn
            v-if="!data.private.verifySetting.verified"
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
    </client-only>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.state.modules.user
    },
  },
}
</script>
