<template>
  <v-container class="d-flex flex-column">
    <h1 class="text-center text-h1 my-4 primary--text">Anmelden</h1>
    <SignupComponent></SignupComponent>
    <v-btn text to="reset-password" color="grey">Passwort vergessen</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Signup',
}
</script>
