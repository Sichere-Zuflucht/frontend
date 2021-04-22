<template>
  <v-container
    ><CoachingSelection :isCoach="false" @filter="filter" />
    <div v-if="filteredCoaches.length > 0">
      <div
        v-for="(coaching, i) in filteredCoaches"
        :key="i"
        class="mt-5"
        :coaching="coaching"
      >
        <Coaching :coach="coaching" />
      </div>
    </div>
    <v-alert v-else color="primary" dark class="mt-8">
      Keiner unserer Berater erfüllt diese Kriterien. Bitte passe die Kriterien
      an unter "Filter anzeigen" oder kontaktiere uns unter:
      <a
        class="white--text"
        href="mailto:kontakt@sichere-zuflucht.de"
        target="_blank"
        >kontakt@sichere-zuflucht.de</a
      >
    </v-alert></v-container
  >
</template>

<script>
export default {
  name: 'FindCoach',
  data() {
    return {
      allCoaches: [],
      filteredCoaches: [],
    }
  },
  mounted() {
    const coach = this.$fire.firestore.collection('memberships').doc('Coach')
    this.$fire.firestore
      .collection('users')
      .where('membership', '==', coach)
      .get()
      .then((ref) => {
        ref.docs.forEach((doc) => {
          const data = doc.data()
          // if (data.info !== false && data.verified && data.strapi)
          if (data.info) this.allCoaches.push({ id: doc.id, ...data })
        })
      })
      .then((this.filteredCoaches = this.allCoaches))
  },
  methods: {
    filter(data) {
      this.filteredCoaches = []
      this.allCoaches.forEach((coach) => {
        let add = true
        // language
        /* add =
          add &&
          coach.info.languages.filter((value) => data.languages.includes(value))
            .length >= 1 */
        // topicArea
        add = add && coach.info.topicArea === data.topicArea.title
        // topicPoints
        add =
          add &&
          coach.info.topicPoints.filter((value) =>
            data.topicPoints.includes(value)
          )
        if (add) this.filteredCoaches.push(coach)
        console.log(' --------- ')
      })
    },
  },
}
</script>
