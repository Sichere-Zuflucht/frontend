<template>
  <div>
    <v-container class="d-flex flex-column">
      <h1 class="text-h1 my-4 primary--text">Registrierung</h1>
      <SignupComponent />
    </v-container>
    <OfferingText :buttons="false" :price="false" class="mt-4" />
  </div>
</template>
