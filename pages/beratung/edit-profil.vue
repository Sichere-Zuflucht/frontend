<template>
  <client-only>
    <v-container v-if="user">
      <h1 class="text-h1 secondary--text">Profil bearbeiten</h1>
      <h2 v-if="user.info" class="text-h2 primary--text mt-6">Ändern</h2>
      <h2 v-else class="text-h2 primary--text">Vervollständigen</h2>
      <CoachingSelection
        :filter="false"
        :is-coach="true"
        :info="user.info ? user.info : ''"
        :avatar="user.avatar"
        @selection="updateProfile"
      />
    </v-container>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      select: true,
      profile: {},
      user: this.$store.getters['modules/user/user'],
    }
  },
  methods: {
    updateProfile(data) {
      console.log('data2:', data)
      this.profile = data
      // this.select = false
      this.$store.dispatch('modules/user/setInfo', {
        info: {
          topicArea: data.topicArea, // topic
          description: data.description,
          since: data.since,
          history: data.history,
          focus: data.focus,
          coachingTopics: data.coachingTopics,
          assistance: data.assistance,
        },
        avatar: data.avatar,
        uid: this.user.uid,
      })
      this.$router.push('/beratung/' + this.user.uid)
    },
  },
}
</script>
