<template>
  <client-only>
    <v-container v-if="user">
      <h1 class="text-h1 secondary--text">Profil bearbeiten</h1>
      <div v-if="user.info">
        <h2 class="text-h2 primary--text mb-2">Aktuell</h2>
        <p class="mt-3 d-inline">Sie bieten aktuell</p>
        <v-chip small outlined color="primary"
          >{{ user.info.topicArea }}
        </v-chip>
        <p class="d-inline">an, <br />mit Fokus auf:<br /></p>
        <v-chip
          v-for="(topic, i) in user.info.topicPoints"
          :key="i"
          small
          class="mr-1"
          outlined
          color="primary"
          >{{ topic }}
        </v-chip>
        <h2 class="text-h2 primary--text mt-6">Ändern</h2>
      </div>
      <h2 v-else class="text-h2 primary--text">Vervollständigen</h2>
      <CoachingList />
      <CoachingSelection
        :is-open="user.info ? false : true"
        :filter="false"
        :closable="user.info ? true : false"
        :is-coach="true"
        :description="user.description ? user.description : ''"
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
      this.profile = data
      this.select = false
      this.$store.dispatch('modules/user/setInfo', {
        topicArea: data.topicArea, // topic
        topicPoints: data.topicPoints, // types
        description: data.description,
      })
      // this.$router.push('/beratung')
    },
  },
}
</script>
