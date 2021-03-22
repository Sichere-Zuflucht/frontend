<template>
  <v-container>
    <h1>Frauen Dashboard</h1>
    <div v-if="responses">
      <h2>Deine Termine</h2>
      <p v-if="responses.length === 0">Noch keine bestätigten Termine</p>
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
            <div v-if="!response.acceptedDate">
              <v-row>
                <v-col cols="7">
                  <v-select
                    v-model="date"
                    :items="response.suggestions"
                    label="Termin"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="5"
                  ><v-btn
                    color="green"
                    :disabled="!date"
                    @click="accept(response, date)"
                    >Zusagen</v-btn
                  ></v-col
                >
              </v-row>
              <v-row class="mb-2"
                ><v-btn color="red" @click="cancle(response)">Absagen</v-btn
                ><v-spacer /><v-btn>Nachfrage</v-btn>
              </v-row>
            </div>
            <div v-else>Zugesagt für {{ response.acceptedDate }}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-divider class="my-3"></v-divider>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://images.unsplash.com/photo-1604881991664-593b31b88488?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
              height="200px"
            ></v-img>

            <v-card-title>Suchst du Hilfe? </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="primary" to="filter" text> Beratung finden </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12"
          ><v-card class="mx-auto" max-width="344">
            <v-img
              src="https://images.unsplash.com/photo-1448582649076-3981753123b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              height="200px"
            ></v-img>

            <v-card-title>Sucht du eine Wohnung? </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions>
              <v-btn color="primary" to="filter" text>
                Wohnungssuche anfragen
              </v-btn>
            </v-card-actions>
          </v-card></v-col
        >
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      responses: [],
      date: null,
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
          subDoc
            .data()
            .from.get()
            .then((a) => {
              data.coach = a.data()
              data.id = a.id
              this.responses.push(data)
              console.log(data)
            })
        })
      })
  },
  methods: {
    cancle(coaching) {
      const db = window.$nuxt.$fire.firestore
      db.collection('users/' + coaching.id + '/requests')
        .doc(this.$store.state.user.uid)
        .delete()
      db.collection('users/' + this.$store.state.user.uid + '/response')
        .doc(coaching.id)
        .delete()
    },
    accept(coaching, date) {
      const db = window.$nuxt.$fire.firestore
      db.collection('users/' + coaching.id + '/requests')
        .doc(this.$store.state.user.uid)
        .update('acceptedDate', date)
      db.collection('users/' + this.$store.state.user.uid + '/response')
        .doc(coaching.id)
        .update('acceptedDate', date)

      coaching.acceptedDate = date
    },
  },
}
</script>
