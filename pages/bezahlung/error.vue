<template>
  <v-container>
    <div class="text-h3">
      <v-icon color="red">mdi-alert</v-icon> Es ist ein Fehler aufgetreten,
      bitte versuche es erneut.<br />
      Falls dies öfters passieren sollte, kannst du uns gerne kontaktieren.
    </div>
    <v-btn to="/profile">Zum Profil</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Error',
}
</script>
