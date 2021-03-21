<template>
  <v-container
    ><CoachingSelection @selection="filter" />
    <div
      v-for="(coaching, i) in coachings"
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
      coachings: [],
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
          if (data.info) this.coachings.push(doc.data())
        })
      })
  },
  methods: {
    filter(data) {},
  },
}
</script>
