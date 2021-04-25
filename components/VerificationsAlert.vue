<template>
  <div v-if="data">
    <div v-if="data.info && data.stripe && data.verified ? false : true">
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
          v-if="!data.stripe"
          class="mr-2 mb-2"
          href="https://www.stripe.com"
          ><v-icon small class="pr-2">mdi-credit-card-outline</v-icon>
          Bezahlung
        </v-btn>
        <v-btn
          v-if="!data.verified"
          class="mr-2 mb-2"
          to="beratung/personenverifizierung"
        >
          <v-icon small class="pr-2">mdi-shield-check</v-icon>
          Verifizierung</v-btn
        >
      </v-alert>
    </div>
  </div>
  <!-- <v-expansion-panels v-if="data">
    <v-expansion-panel v-if="!data.info">
      <v-expansion-panel-header color="secondary" class="white--text">
        <b>Profil vervollständigen.</b>
      </v-expansion-panel-header>
      <v-expansion-panel-content color="red" class="white--text">
        Sie sind ansonsten nicht für die Frauen einsichtbar.
        <p>
          <v-btn to="registrierung" append class="ma-2 ml-0">weiter</v-btn>
        </p>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-if="!data.strapi">
      <v-expansion-panel-header
        color="error"
        class="white--text"
        expand-icon="mdi-alert"
        disable-icon-rotate
      >
        <b>STRIPE noch nicht registriert.</b>
      </v-expansion-panel-header>
      <v-expansion-panel-content color="red" class="white--text">
        Wir nutzen den Anbieter STRIPE, damit Sie Zahlungen erhalten können.
        <p>
          <v-btn href="https://www.stripe.com" append class="ma-2 ml-0"
            >zu STRIPE</v-btn
          >
        </p>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-if="!data.verified">
      <v-expansion-panel-header
        color="error"
        class="white--text"
        expand-icon="mdi-alert"
        disable-icon-rotate
      >
        <b>Account noch nicht verifiziert.</b>
      </v-expansion-panel-header>
      <v-expansion-panel-content color="red" class="white--text">
        Melden Sie sich bei uns und führen Sie ein privates Gespräch, damit wir
        sie als Coach verfizieren können.
        <p>
          <v-btn to="personenverifizierung" append class="ma-2 ml-0"
            >verifizieren</v-btn
          >
        </p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels> -->
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
