<template>
  <v-sheet class="pb-0">
    <v-sheet color="secondary pa-8"
      ><h1 class="text-h1 white--text">
        Willkommen bei Sichere Zuflucht
      </h1></v-sheet
    >
    <v-container>
      <h2 class="text-h4 font-weight-bold primary--text mt-3 mb-3">
        Du hast Antwort auf deine Anfrage(n) von:
      </h2>
      <PriceInfo />
      <div v-if="responses">
        <div v-if="responses.length === 0">
          <p>Du hast noch gar keine Berater*innen kontaktiert.</p>
          <v-btn to="findCoach" color="secondary" append
            >Beratungsangebote ansehen
          </v-btn>
        </div>

        <CoachingRequests
          v-else-if="responses.length === 1"
          :coach="responses[0].coach"
          :response="responses[0]"
          :clickable="false"
          :small="true"
        />
        <v-slide-group v-else show-arrows>
          <v-slide-item v-for="(response, i) in responses" :key="i">
            <div style="width: 310px; padding: 5px">
              <CoachingRequests
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
    </v-container>
    <v-sheet color="blue-grey lighten-5">
      <v-container>
        <h2 class="text-h2 secondary--text mt-6 mb-3">Unsere Angebote</h2>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="mx-auto" max-width="320">
              <v-img
                src="https://images.unsplash.com/photo-1604881991664-593b31b88488?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                height="200px"
              ></v-img>

              <v-card-title
                class="text-h3 secondary--text font-weight-bold mb-2"
                >Beratung und Hilfe
              </v-card-title>

              <v-card-subtitle>
                in Form von <b>Online-Besprechungen</b> mit Fachleuten zu euren
                Themen. Diese könnt ihr von überall ganz
                <b>einfach und anonym</b> mit dem <b>Handy</b> machen.
                <v-btn color="secondary my-4" to="findCoach" append>
                  Beratungs-Themen ansehen
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

              <v-card-title
                class="text-h3 secondary--text font-weight-bold mb-2"
                >Schnelle Unterkunft
              </v-card-title>

              <v-card-subtitle>
                Du musst schnell zuhause raus? Pack deine Kinder ein und zieh in
                eine unserer verbündeten Ferienunterkünfte.
                <v-btn color="secondary my-4" to="wohnungssuche" append>
                  Kurze Anfrage für eine Unterkunft
                </v-btn>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-sheet>
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
    this.getRealtimeData()
  },
  methods: {
    getRealtimeData() {
      this.responses = []
      this.$fire.functions
        .httpsCallable('request-getRequestsRealtime')()
        .then(async (req) => {
          const data = await req.data
          data.forEach((r) => {
            if (r.ids.includes(this.user.uid))
              this.$fire.firestore
                .collection('users')
                .doc(r.coachId)
                .get()
                .then((coachSnap) => {
                  this.responses.push({
                    coach: coachSnap.data(),
                    ...r,
                  })
                })
          })
        })
    },
  },
}
</script>
