<template>
  <v-slide-group v-if="!loading" show-arrows class="py-4">
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
  <v-alert v-else-if="error.status" type="error">{{ error.text }}</v-alert>
  <div v-else class="d-flex">
    <v-card v-for="n in 3" :key="n" width="250" class="ma-2">
      <v-card-text
        ><v-skeleton-loader
          type="list-item-avatar, list-item-three-line" /></v-card-text
    ></v-card>
  </div>
</template>

<script>
export default {
  props: {
    withoutid: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      allCoaches: [],
      loading: true,
      error: {
        status: false,
        text: '',
      },
    }
  },
  async mounted() {
    try {
      await this.$fire.functions
        .httpsCallable('user-getCoaches')()
        .then((d) => {
          d.data.forEach((a) => {
            const b = JSON.parse(a)
            if (this.withoutid) {
              if (this.withoutid !== b.uid) this.allCoaches.push(b)
            } else {
              this.allCoaches.push(b)
            }
          })
          this.loading = false
        })
    } catch (error) {
      error.status = true
      error.text = error
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
