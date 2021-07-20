<template>
  <div>
    <v-container v-if="userPublic">
      <h1 class="text-h1 secondary--text">Profil bearbeiten</h1>
      <h2 v-if="userPublic.info" class="text-h2 primary--text mt-6">Ändern</h2>
      <h2 v-else class="text-h2 primary--text">Vervollständigen</h2>
      <CoachingSelection
        :filter="false"
        :is-coach="true"
        :info="userPublic.info || {}"
        :avatar="userPublic.avatar"
        @selection="updateProfile"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'isCoach',
  data() {
    return {
      select: true,
    }
  },
  computed: {
    userPublic() {
      return this.$store.state.modules.user.public
    },
  },
  methods: {
    updateProfile(data) {
      this.$store.dispatch('modules/user/setInfo', {
        topicArea: data.topicArea, // topic
        description: data.description,
        since: data.since,
        history: data.history,
        focus: data.focus,
        coachingTopics: data.coachingTopics,
        assistance: data.assistance,
      })
      this.$store.dispatch('modules/user/setAvatar', data.avatar)

      this.$router.push('/beratung/' + this.userPublic.uid)
    },
  },
}
</script>
