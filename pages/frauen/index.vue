<template>
  <v-container>
    <h1>Frauen Dashboard</h1>
    <div v-if="responses">
      <h2>Deine Anfragen</h2>
      <v-expansion-panels>
        <v-expansion-panel v-for="(response, i) in responses" :key="i">
          <v-expansion-panel-header>
            {{ response.coach.firstName }}
            {{ response.coach.lastName }}</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-row class="mb-4">
              <Coaching :coach="response.coach" />
            </v-row>
            <v-row>
              <v-col cols="7">
                <v-select
                  :items="response.suggestions"
                  label="Termin"
                  dense
                ></v-select>
              </v-col>

              <v-col cols="5"><v-btn color="green">Zusagen</v-btn></v-col>
            </v-row>
            <v-row class="mb-2"
              ><v-btn color="red">Absagen</v-btn><v-spacer /><v-btn
                >Nachfrage</v-btn
              >
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <h2>Suchst du Hilfe?</h2>
    <v-btn class="my-2" to="filter" append color="primary">
      Beratung finden
    </v-btn>
    <v-divider class="my-6"></v-divider>
    <h2>Oder sucht du eine Wohnung?</h2>
    <v-btn class="my-2" to="filter" append> Wohnungssuche anfragen </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      responses: [],
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    const db = window.$nuxt.$fire.firestore
    db.collection('users/' + this.user.uid + '/response')
      .get()
      .then((snapshot) => {
        snapshot.forEach((subDoc) => {
          const data = subDoc.data()

          console.log('res: ', data)

          subDoc
            .data()
            .from.get()
            .then((a) => {
              data.coach = a.data()
              this.responses.push(data)
            })
        })
      })
  },
}
</script>
