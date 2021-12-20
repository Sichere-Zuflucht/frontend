<template>
  <v-slide-group v-if="allCoaches" show-arrows class="py-4">
    <v-slide-item v-for="(coaching, n) in allCoaches" :key="n" class="my-4">
      <CoachingProfileWrapper
        :pub-coach-data="coaching"
        :class="
          (n == 0
            ? 'ml-8 mr-2'
            : n == allCoaches.length - 1
            ? 'ml-2 mr-8'
            : 'mx-2') + ' my-2'
        "
      />
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
      await this.$fire.firestore
        .collection('users')
        .get()
        .then((docs) => {
          docs.forEach(async (doc) => {
            await this.$fire.firestore
              .collection(doc.ref.path + '/public')
              .get()
              .then((docPub) => {
                this.allCoaches = docPub.docs[0].data()
              })
          })
        })
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
