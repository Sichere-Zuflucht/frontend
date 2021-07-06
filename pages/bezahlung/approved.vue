<template>
  <div>
    <v-sheet color="success d-flex justify-center">
      <v-icon size="60" class="pa-12" color="white">mdi-check</v-icon>
    </v-sheet>
    <v-container>
      <h1 class="text-h1 primary--text my-8">Geschafft!</h1>
      <p>
        Ihre Stripe-Registrierung war erfolgreich! Bis bezahlte Beträge im
        Profil auftauchen, kann es einen Moment dauern.
      </p>
      <v-btn to="/profile" color="secondary">Zum Profil</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Approved',
}
</script>
