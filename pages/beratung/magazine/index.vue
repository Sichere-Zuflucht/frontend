<template>
  <v-container v-if="userPublic">
    <client-only> Ihre Blogeinträge </client-only>
    <v-btn @click="createArticle"><v-icon>mdi-plus</v-icon></v-btn>
  </v-container>
</template>

<script>
export default {
  computed: {
    userPublic() {
      return this.$store.state.modules.user.public
    },
  },
  methods: {
    createArticle() {
      const docPath = this.userPublic.uid + new Date().getTime()
      this.$fire.functions
        .httpsCallable('magazine-createArticle')({
          createdAt: new Date(),
          author: this.userPublic,
          newDoc: docPath,
        })
        .then(() => {
          this.$router.push('/beratung/magazine/' + docPath)
        })
    },
  },
}
</script>
