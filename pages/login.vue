<template>
  <div>
    <v-container class="d-flex flex-column">
      <h1 class="text-h1 my-4 primary--text">Einloggen</h1>
      <SignupComponent :makeLogin="true" />
    </v-container>
    <OfferingText :buttons="false" :price="false" class="mt-4" />
  </div>
</template>
