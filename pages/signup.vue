<template>
  <v-container class="d-flex flex-column">
    <h1 class="text-center text-h1 my-4 primary--text">Anmelden</h1>
    <SignupComponent />
    <v-btn text to="reset-password" color="grey">Passwort vergessen</v-btn>
    <OfferingText :buttons="false" :price="false" class="mt-4" />
  </v-container>
</template>
