<template>
  <div>
    <v-sheet color="secondary d-flex justify-center">
      <v-icon size="60" class="pa-12" color="white"
        >mdi-account-edit-outline</v-icon
      >
    </v-sheet>
    <v-container v-if="userPublic">
      <h1 class="text-h1 primary--text mb-4">Profil<br />bearbeiten</h1>
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
        profession: data.profession,
      })
      this.$store.dispatch('modules/user/setAvatar', data.avatar)

      this.$router.push('/berater/' + this.userPublic.uid)
    },
  },
}
</script>
