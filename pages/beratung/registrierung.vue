<template>
  <div>
    <p>Fülle dein Profil aus</p>
    <v-divider></v-divider>
    <v-row v-if="!select" class="mt-3">
      {{ profile }}
    </v-row>
    <CoachingSelection
      v-if="select"
      :isCoach="true"
      @selection="updateProfile"
    />
  </div>
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
      this.$fire.firestore
        .collection('users')
        .doc(this.user.uid)
        .update({
          info: {
            languages: data.languages,
            topic: data.topic,
            types: data.types,
          },
        })
    },
  },
}
</script>
