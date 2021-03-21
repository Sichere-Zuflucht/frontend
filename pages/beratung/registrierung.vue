<template>
  <v-container>
    <h1>Herzlich Willkommen bei Sichere Zuflucht</h1>
    <p>Fülle direkt dein Profil aus</p>
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
    }
  },
  methods: {
    updateProfile(data) {
      console.log(data)
      this.profile = data
      this.select = false
    },
  },
}
</script>
