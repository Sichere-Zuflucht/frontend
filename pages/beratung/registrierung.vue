<template>
  <v-container>
    <h1>Bitte vervollständige dein Profil</h1>
    <v-divider></v-divider>
    <v-row v-if="!select" class="mt-3">
      {{ profile }}
    </v-row>
    <CoachingSelection
      v-if="select"
      :is-coach="true"
      @selection="updateProfile"
    />
  </v-container>
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
      this.profile = data
      this.select = false
      this.$store.dispatch('modules/user/setInfo', {
        info: {
          topicArea: data.topicArea, // topic
          topicPoints: data.topicPoints, // types
        },
        uid: this.user.uid,
      })
      this.$router.push('/beratung')
    },
  },
}
</script>
