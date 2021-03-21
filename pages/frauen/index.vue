<template>
  <v-container>
    <h1>Frauen Dashboard</h1>
    <v-expansion-panels v-if="responses">
      <v-expansion-panel v-for="(item, i) in 5" :key="i">
        <v-expansion-panel-header> Item </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <h2>Suchst du Hilfe?</h2>
    <v-btn class="my-2" to="filter" append color="primary">
      Beratung finden
    </v-btn>
    <v-divider class="my-6"></v-divider>
    <h2>Oder sucht du eine Wohnung?</h2>
    <v-btn class="my-2" to="sendTests" append> Wohnungssuche anfragen </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      respones: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    const db = window.$nuxt.$fire.firestore
    console.log(this.user.uid)
    db.collection('users/' + this.user.uid + '/response')
      .get()
      .then((snapshot) => {
        snapshot.forEach((subDoc) => {
          this.responses = subDoc.data()
          console.log('res: ', subDoc.data())
        })
      })
  },
}
</script>
