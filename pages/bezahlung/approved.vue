<template>
  <v-container>
    <div class="text-h3">
      <v-icon color="green">mdi-check</v-icon>
      Alles hat funktioniert! Bis bezahlte Beträge im Profil auftauchen, kann es
      einen Moment dauern.
    </div>
    <v-btn to="/profile">Zum Profil</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Approved',
}
</script>
