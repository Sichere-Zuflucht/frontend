<template>
  <div v-if="user">
    <v-img :lazy-src="user.avatar" :src="user.avatar"></v-img>
    <h1 class="text-center">{{ user.firstName }} {{ user.lastName }}</h1>
    <Coaching :coach="user" />
    <v-container fluid>
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-header class="pl-0">
            Text hinzufügen
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-textarea
              v-model="message"
              value="Jemand möchte mit Ihnen Kontakt aufnehmen."
              label="persönliche Anfrage schreiben"
            ></v-textarea>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-btn color="primary" @click="sendRequest">Anfragen</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      message: '',
      slug: '',
    }
  },
  computed: {
    userName() {
      return this.user.firstName + ' ' + this.user.lastName
    },
  },
  mounted() {
    this.slug = this.$route.params.beratung
    this.getCoachUserData()
  },
  methods: {
    getCoachUserData() {
      this.$nuxt.$fire.firestore
        .collection('users')
        .doc(this.slug)
        .get()
        .then((e) => {
          this.user = e.data()
        })
    },

    sendRequest() {
      const db = window.$nuxt.$fire.firestore
      db.collection('users')
        .doc(this.slug)
        .collection('requests')
        .doc(this.$store.getters['modules/user/uid'])
        .set({
          subject: `Sichere Zuflucht - Anfrage von Frau`,
          html: `<div style="font-size: 16px;">Hallo ${this.userName},<br><br>
             eine Frau hat Ihnen eine Anfrage gestellt und schickt Ihnen folgende Nachricht:
        <br>
        <br>
        <span style="font-family: monospace; margin-left: 2em">"${this.message}"</span>
        <br>
        <br>
        Bitte loggen Sie sich auf unserer <a href="sichere-zuflucht.de">Plattform</a> ein, um Termine zur Auswahl zu stellen.
        <br>
        <br>
        Grüße von unserem engagierten Team.
        </div>`,
          isAccepted: false,
          message: this.message,
          from: db
            .collection('users')
            .doc(window.$nuxt.$fire.auth.currentUser.uid),
        })
    },
  },
}
</script>
