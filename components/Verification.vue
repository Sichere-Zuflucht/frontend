<template>
  <div>
    <h2 class="text-h2 secondary--text">Verifizierungsprozess</h2>

    <div v-if="!isVerifying && !verified">
      <v-chip small color="error" class="my-2" dark>Nicht Verifiziert</v-chip>
      <p class="caption my-4">
        Sie sind noch nicht von uns verifiziert worden, bitte nehmen Sie daher
        mit uns Kontakt auf. Wir werden uns per eMail bei ihnen melden, um ein
        Gespräch zu vereinbaren.
      </p>
      <v-btn v-if="user" @click="updateVerify" color="primary"
        >Kontakt aufnehmen</v-btn
      >
    </div>
    <div v-else-if="isVerifying && !verified">
      <v-chip color="secondary" small class="my-2" dark
        >wird verifiziert...</v-chip
      >
      <p class="caption my-4">
        Sie haben nach 48 Stunden noch keine eMail von uns erhalten? Bitte
        prüfen Sie zuerst Ihren Spam Ordner, bevor Sie uns erneut kontaktieren.
      </p>
      <div>
        <v-btn v-if="user" @click="updateVerify" color="primary"
          >Kontakt aufnehmen</v-btn
        >
        <v-btn v-if="user" @click="updateVerify" color="primary"
          >Erneut Kontaktieren</v-btn
        >
      </div>
    </div>
    <div v-else>
      <v-chip small color="success" class="my-2" dark>verifiziert</v-chip>
      <p class="caption my-4">Sie sind erfolgreich verifiziert</p>
    </div>
  </div>
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
      this.$fire.functions.httpsCallable('email-sendVerifyAccMail')()
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
  },
}
</script>
