<template>
  <v-container
    ><CoachingSelection @filter="filter" />
    <div
      v-for="(coaching, i) in filteredCoaches"
      class="mt-5"
      :key="i"
      :coaching="coaching"
    >
      <Coaching :coach="coaching" /></div
  ></v-container>
</template>

<script>
export default {
  name: 'filter',
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
          if (data.info) this.allCoaches.push(doc.data())
        })
      })
      .then((this.filteredCoaches = this.allCoaches))
  },
  methods: {
    filter(data) {
      console.log(data)
      this.filteredCoaches = []
      this.allCoaches.forEach((coach) => {
        let add = true
        // language
        add =
          add &&
          coach.info.languages.filter((value) => data.lang.includes(value))
            .length >= 1
        // topic
        add = add && coach.info.topic === data.topic
        // types
        add =
          add &&
          coach.info.types.filter((value) => data.type.includes(value))
            .length >= 1
        if (add) this.filteredCoaches.push(coach)
      })
    },
  },
}
</script>
