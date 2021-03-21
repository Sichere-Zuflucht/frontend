<template>
  <div v-if="user">
    <v-img :lazy-src="user.avatar" :src="user.avatar"></v-img>
    <h1 class="text-center">{{ user.firstName }} {{ user.lastName }}</h1>
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
      user: null,
      message: '',
      slug: '',
    }
  },
  methods: {
    asyncData() {
      // When calling /abc the slug will be "abc"
      this.$nuxt.$fire.firestore
        .collection('users')
        .doc(this.slug)
        .get()
        .then((e) => {
          console.log(e.data())
          this.user = e.data()
          console.log(this.user)
        })
    },
    sendRequest() {
      const uid = this.slug
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
  mounted() {
    this.slug = this.$route.params.beratung
    this.asyncData()
    console.log(this.user)
  },
}
</script>
