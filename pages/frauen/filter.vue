<template>
  <v-container>{{ coachings }} </v-container>
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
        ref.docs.forEach((doc) => this.coachings.push(doc.data()))
      })
  },
}
</script>
