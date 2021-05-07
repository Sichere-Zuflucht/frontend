<template>
  <v-sheet>
    <p class="caption font-weight-bold mb-0 pb-0">Frauen finden hier:</p>
    <v-list dense>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="secondary" class="pt-2">mdi-check-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Beratung und Hilfe in From von Online-Coachings bei häuslicher Gewalt
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="secondary" class="pt-2">mdi-check-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Eine sichere Zuflucht für sich und ggf. ihre Kinder in Form einer
          Unterkunft
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-sheet v-if="buttons" class="d-flex align-center">
      <v-btn to="/signup" color="secondary mx-auto">Anmeldung für Frauen</v-btn>
    </v-sheet>
    <p v-if="price" class="my-12">[Preisinfo]</p>
    <p class="caption font-weight-bold mb-0 pb-0">Berater*innen können hier:</p>
    <v-list dense>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="secondary" class="pt-2">mdi-check-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Beratung und Hilfe für Frauen in häuslicher Gewaltsituation anbieten.
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-sheet v-if="buttons" class="d-flex align-center">
      <v-btn to="/signup" color="secondary mx-auto"
        >Anmeldung für Berater*innen</v-btn
      >
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
