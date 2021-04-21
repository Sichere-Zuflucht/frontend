<template>
  <v-container class="d-flex flex-column">
    <h1 class="text-center text-h4 my-4">Anmelden</h1>
    <Signup></Signup>
    <v-btn text to="reset-password" color="grey">Passwort vergessen</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'signup',
}
</script>
