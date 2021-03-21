<template>
  <v-container>
    <h1>Herzlich Willkommen bei Sichere Zuflucht</h1>
    <p>Fülle direkt dein Profil aus</p>
    <p>{{ user ? user.email : null }}</p>
    <v-divider></v-divider>
    <v-row v-if="!select" class="mt-3">
      {{ profile }}
    </v-row>
    <CoachingSelection v-if="select" @selection="updateProfile" />
  </v-container>
</template>

<script>
import CoachingSelection from '@/components/CoachingSelection'

export default {
  components: { CoachingSelection },
  data() {
    return {
      select: true,
      profile: {},
      user: this.$store.state.user,
    }
  },
  methods: {
    updateProfile(data) {
      this.profile = data
      this.select = false
      window.$nuxt.$fire.firestore
        .collection('users')
        .doc(window.$nuxt.$fire.auth.currentUser.uid)
        .update({
          languages: data.lang,
          topic: data.topic,
          types: data.type,
        })
    },
  },
}
</script>
