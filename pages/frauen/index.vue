<template>
  <v-container>
    <h1 class="text-h1 primary--text">Deine Übersicht</h1>
    <h2 class="text-h2 secondary--text mt-6 mb-3">Deine Beratungstermine</h2>
    <div v-if="responses">
      <div v-if="responses.length === 0">
        <p>Du hast noch keine Beratung gebucht</p>
        <v-btn to="findCoach" color="secondary" append
          >Beratungsangebote ansehen
        </v-btn>
      </div>

      <Coaching
        v-else-if="responses.length === 1"
        :coach="responses[0].coach"
        :response="responses[0]"
        :clickable="false"
        :small="true"
      />
      <v-slide-group v-else show-arrows>
        <v-slide-item v-for="(response, i) in responses" :key="i">
          <div style="width: 310px; padding: 5px">
            <Coaching
              :coach="response.coach"
              :response="response"
              :clickable="false"
              :small="true"
            />
          </div>
        </v-slide-item>
      </v-slide-group>
    </div>
    <v-sheet v-else elevation="2" class="pa-2"
      ><v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="list-item-avatar, list-item-three-line, list-item-three-line, actions"
      ></v-skeleton-loader
    ></v-sheet>
    <v-divider class="my-3"></v-divider>
    <h2 class="text-h2 secondary--text mt-6 mb-3">Angebote</h2>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" max-width="320">
          <v-img
            src="https://images.unsplash.com/photo-1604881991664-593b31b88488?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
            height="200px"
          ></v-img>

          <v-card-title class="text-h3 secondary--text font-weight-bold mb-2"
            >Suchst du Hilfe?
          </v-card-title>

          <v-card-subtitle>
            Wir arbeiten mit vielen Berater*innen und Coaches aus vielen
            Fachbereichen zusammen. Wähle dein Thema und finde das passende
            Hilfsangebot für dich.
            <v-btn color="secondary my-4" to="findCoach" append>
              Wobei brauchst du Hilfe?
            </v-btn>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" max-width="320">
          <v-img
            src="https://images.unsplash.com/photo-1448582649076-3981753123b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            height="200px"
          ></v-img>

          <v-card-title class="text-h3 secondary--text font-weight-bold mb-2"
            >Brauchst du eine Wohnung als sichere Zuflucht?
          </v-card-title>

          <v-card-subtitle>
            In Deutschland gibt es viele Wohnungsbesitzer*innen, die Frauen wie
            dir helfen wollen. Wir haben Kontakt zu ihnen aufgenommen und wollen
            euch zusammen bringen.
            <v-btn color="secondary my-4" to="wohnungssuche" append>
              Gib hier dein Wohnungsgesucht auf
            </v-btn>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      responses: null,
    }
  },
  computed: {
    user() {
      return this.$store.getters['modules/user/user']
    },
  },
  mounted() {
    this.$fire.firestore.collection('requests').onSnapshot((snap) => {
      this.responses = []
      snap.docs.forEach((req) => {
        if (req.data().ids.includes(this.user.uid))
          this.$fire.firestore
            .collection('users')
            .doc(req.data().coachId)
            .get()
            .then((coachSnap) => {
              this.responses.push({
                coach: coachSnap.data(),
                id: req.id,
                ...req.data(),
              })
            })
      })
    })
  },
}
</script>
