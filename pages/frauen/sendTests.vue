<template>
  <div>
    <h1>Hallo</h1>
    <v-container fluid>
      <v-textarea
        v-model="message"
        label="persönliche Anfrage schreiben"
      ></v-textarea>
      <v-btn @click="sendRequest">Anfragen</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    }
  },
  methods: {
    sendRequest() {
      const uid = 'N4zxgeoDPEWYHiBPQ6EECSDrOSk1'
      console.log('msg: ', this.message)
      const db = window.$nuxt.$fire.firestore
      db.collection('users')
        .doc(uid)
        .collection('requests')
        .doc(window.$nuxt.$fire.auth.currentUser.uid)
        .set({
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
