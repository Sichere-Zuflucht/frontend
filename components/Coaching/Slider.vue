<template>
  <v-slide-group v-if="allCoaches" show-arrows class="py-4">
    <v-slide-item v-for="(coaching, n) in allCoaches" :key="n" class="my-4">
      <CoachingProfileWrapper :pub-coach-data="coaching" />
    </v-slide-item>
  </v-slide-group>
</template>

<script>
export default {
  data() {
    return {
      allCoaches: null,
    }
  },
  async mounted() {
    try {
      this.allCoaches = (
        await this.$fire.functions.httpsCallable('user-getCoaches')()
      ).data
      /* await this.$fire.firestore
        .collection('users')
        .doc()
        .collection('private')
        .where('verifySetting.verified', '==', true)
        .get()
        .then((querySnapshot) => {
          console.log('q:', querySnapshot)
          querySnapshot.forEach((doc) => {
            console.log('doc:', doc.data())
            this.allCoaches.push(doc.data())
          })
        }) */
    } catch (error) {
      console.log(error)
    }
  },
  fetchOnServer: false,
}
</script>

<style>
.v-slide-group__next,
.v-slide-group__prev {
  position: absolute;
  z-index: 2;
  height: 100%;
}
.v-slide-group__next {
  right: 0;
}
.v-slide-group__prev {
  left: 0;
}
</style>
