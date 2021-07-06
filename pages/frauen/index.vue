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
    </v-container>
    <div v-if="responses" class="pb-4">
      <div v-if="responses.length === 0">
        <p>Du hast noch keine Berater*innen kontaktiert.</p>
        <v-btn to="findCoach" color="secondary" append
          >Beratungsangebote ansehen
        </v-btn>
      </div>
      <v-container v-else-if="responses.length === 1">
        <CoachingContactStatus
          :coach="responses[0].coach"
          :response="responses[0]"
          :clickable="false"
        />
      </v-container>
      <v-slide-group v-else show-arrows class="px-1 pb-4">
        <v-slide-item v-for="(response, i) in responses" :key="i">
          <div style="width: 95vw; max-width: 300px; padding: 5px">
            <CoachingContactStatus
              :coach="response.coach"
              :response="response"
              :clickable="false"
            />
          </div>
        </v-slide-item>
      </v-slide-group>
      <v-container>
        <v-btn text color="primary" small
          >Wie läuft das Beratungsgespräch ab?</v-btn
        ><br />
        <v-btn text color="primary" small>Infos zur Termineinhaltung</v-btn
        ><br />
        <v-btn text color="primary" small>Infos zu Preisen</v-btn>
      </v-container>
    </div>
    <v-container v-else>
      <v-sheet elevation="2" class="pa-2"
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
        <Offerings />
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
