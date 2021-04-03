<template>
  <v-expansion-panels v-if="data">
    <v-expansion-panel v-if="!data.info">
      <v-expansion-panel-header
        color="error"
        class="white--text"
        expand-icon="mdi-alert"
        disable-icon-rotate
      >
        <b>Profil noch nicht vollständig.</b>
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
  </v-expansion-panels>
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
    const db = window.$nuxt.$fire.firestore
    db.collection('users')
      .doc(uid)
      .get()
      .then((data) => {
        this.data = data.data()
      })
  },
}
</script>
