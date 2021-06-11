<template>
  <v-sheet color="secondary" dark>
    <v-container>
      <h3 class="h2--text white--text text-center text-uppercase">
        Melde dich an, um:
      </h3>
      <v-list dense color="transparent">
        <v-list-item>
          <v-list-item-icon>
            <v-icon class="pt-2">mdi-face-woman</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <p class="font-weight-bold">Als Frau</p>
            <ul>
              <li>Online-Beratungen buchen zu können</li>
              <li>Unterkunftsgesuche zu erstellen</li>
            </ul>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="white" class="pt-2">mdi-forum</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <p class="font-weight-bold">Als Berater*in</p>
            <ul>
              <li>dein Angebot zu erstellen</li>
            </ul>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="white" class="pt-2">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <p class="font-weight-bold">Als Unterkunfsbesitzer*in</p>
            <ul>
              <li>deine Unterkunft in unsere Datenbank aufzunehmen</li>
            </ul>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
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
