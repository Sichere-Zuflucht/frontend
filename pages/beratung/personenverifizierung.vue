<template>
  <v-container>
    <div class="text-h4">Verifizieren</div>
    <p class="caption mt-2 mb-0">Status</p>
    <v-btn @click="test">t</v-btn>
    <v-card v-if="!isVerifying && !verified" elevation="2" class="pa-3">
      <v-chip color="error" class="mt-2" text-color="white"
        >keine Verifizierung</v-chip
      >
      <div class="text py-3">
        Klicken Sie auf den Button, um mit uns Kontakt aufzunehmen. Wir werden
        uns per eMail bei ihnen melden, um ein Gespräch zu vereinbaren.
      </div>
      <div>
        <v-btn
          v-if="user"
          @click="updateVerify"
          :href="
            'mailto:b.ulrich@sichere-zuflucht.de?subject=Neue%20Anfrage%20von%20' +
            user.uid
          "
          color="primary"
          >Kontakt aufnehmen</v-btn
        >
      </div>
    </v-card>
    <v-card v-else-if="isVerifying && !verified" elevation="2" class="pa-3">
      <v-chip color="orange" class="mt-2" text-color="white"
        >wird verifiziert...</v-chip
      >
      <div class="text py-3">
        Sie haben nach 48 Stunden noch keine eMail von uns erhalten? Bitte
        prüfen Sie Ihren Spam Ordner und nehmen Sie dann erst noch einmal
        Kontakt mit uns auf.
      </div>
      <div>
        <v-btn
          v-if="user"
          :href="
            'mailto:b.ulrich@sichere-zuflucht.de?subject=Hilfe%20bei%20der%20Verifizierung%20von%20' +
            user.uid
          "
          color="primary"
          >Erneut Kontaktieren</v-btn
        >
      </div>
    </v-card>
    <v-card v-else elevation="2" class="pa-3">
      <v-chip color="success" class="mt-2" text-color="white"
        >verifiziert</v-chip
      >
      <div class="text py-3">Sie sind erfolgreich verifiziert</div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    isVerifying() {
      return this.$store.getters['modules/user/isVerifying']
    },
    verified() {
      return this.$store.getters['modules/user/verified']
    },
    user() {
      return this.$store.getters['modules/user/user']
    },
  },
  methods: {
    updateVerify() {
      console.log(this.user.uid)
      const uid = this.user.uid
      const verifySetting = {
        isVerifying: true,
        verified: false,
      }
      this.$store.dispatch('modules/user/setVerify', {
        uid,
        verifySetting,
      })
    },
    test() {
      console.log(this.isVerifying, this.verified)
    },
  },
}
</script>
