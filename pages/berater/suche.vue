<template>
  <v-sheet>
    <UtilsBanner url="le-buzz-tVnm9I9jb8I-unsplash.jpg" />
    <v-container>
      <h1 class="text-h1 primary--text">Beratung und Hilfe</h1>
      <p class="mb-6">
        in Form von <b>Online-Besprechungen</b> mit Fachleuten zu euren Themen.
        Diese könnt ihr von überall ganz <b>einfach und anonym</b> mit dem
        <b>Handy</b> machen.
      </p>
    </v-container>

    <v-sheet color="blue-grey lighten-5">
      <v-container>
        <div class="d-flex align-start">
          <v-icon large color="secondary" class="pr-2">mdi-filter</v-icon>
          <div>
            <h2 class="text-h2 secondary--text">Beratungsfilter</h2>
            <p class="caption">
              Filtere hier die Berater*innen und Coaches nach den Fachgebieten
              und Themen, die für dich relevant sind.
            </p>
          </div>
        </div>

        <CoachingSelection
          :is-coach="false"
          :info="user.info || {}"
          @filter="filter"
        />
      </v-container>
    </v-sheet>
    <v-container>
      <div
        v-if="filteredCoaches.length > 0"
        class="d-flex flex-wrap justify-space-around"
      >
        <div
          v-for="(coaching, i) in filteredCoaches"
          :key="i"
          class="mt-5 px-1"
        >
          <CoachingProfileWrapper :pub-coach-data="coaching" />
        </div>
      </div>
      <div
        v-else-if="
          filteredCoaches.length !== allCoaches.length ||
          filteredCoaches.length === 0
        "
        class="d-flex flex-column justify-center align-center mt-4"
      >
        <v-alert
          v-if="filteredCoaches.length === 0"
          color="primary"
          dark
          class="mt-8"
        >
          Keiner unserer Berater*innen erfüllt den angegebenen Kriterien.
        </v-alert>
        <v-btn outlined small color="primary" @click="resetFilter"
          >Alle anzeigen
        </v-btn>
      </div>
      <p class="caption mt-4">
        <b>Dein Fachgebiet oder Thema ist nicht dabei?</b><br />
        <a href="mailto:kontakt@sichere-zuflucht.de"
          >Schreib uns eine Nachricht</a
        >, vielleicht können wir trotzdem jemanden finden, der dir weiter hilft.
      </p>
    </v-container>

    <WomanPriceInfo />
  </v-sheet>
</template>

<script>
export default {
  name: 'FindCoach',
  data() {
    return {
      allCoaches: [],
      filteredCoaches: [],
      user: this.$store.getters['modules/user/user'],
    }
  },
  async fetch() {
    this.allCoaches = (
      await this.$fire.functions.httpsCallable('user-getCoaches')()
    ).data
    this.filteredCoaches = this.allCoaches
  },
  fetchOnServer: false,
  methods: {
    filter(data) {
      this.filteredCoaches = this.allCoaches.filter((coach) => {
        return (
          coach.info.topicArea.filter((value) => data.topicArea.includes(value))
            .length > 0
        )
      })
    },
    resetFilter() {
      this.filteredCoaches = this.allCoaches
    },
  },
}
</script>
