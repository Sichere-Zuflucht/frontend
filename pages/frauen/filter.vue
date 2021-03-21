<template>
  <v-container> </v-container>
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
    this.$fire.firestore.collection('')
  },
}
</script>
