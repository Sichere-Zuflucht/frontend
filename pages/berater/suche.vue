<template>
  <div>
    <UtilsBanner url="le-buzz-tVnm9I9jb8I-unsplash.jpg" pos="center 23%" />
    <v-container>
      <h1 class="text-h1 primary--text">Beratung und Hilfe</h1>
      <p class="mb-6">
        Hier, bei Sichere Zuflucht kannst du <b>Online-Besprechungen</b> mit
        Fachleuten zu deinen Themen machen. Diese kannst du von überall ganz
        <b>einfach, sicher und anonym</b> mit dem <b>Handy</b> machen.
      </p>
      <h2 class="text-h2 secondary--text mt-16">Unsere Berater*innen</h2>
      <v-btn @click="TestLoadCoaches">test</v-btn>
    </v-container>
    <CoachingSlider />
    {{ allCoaches }}
    <v-sheet color="grey lighten-5">
      <v-container> <WomanPriceInfo /></v-container
    ></v-sheet>
    <v-container class="py-16">
      <h3 class="text-h3 text-uppercase secondary--text pb-8 font-weight-bold">
        so laufen Terminfindung und Beratung ab
      </h3>
      <SharedSteps class="pb-16" />
      <SharedFaq price onlinecoaching />
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'FindCoach',
  data() {
    return {
      allCoaches: [],
      user: this.$store.getters['modules/user/user'],
      coachingTypes: [],
      tagsSelected: null,
      loading: true,
      error: null,
    }
  },
  async mounted() {
    try {
      /* this.allCoaches = (
        await this.$fire.functions.httpsCallable('user-getCoaches')()
      ).data */
      await this.$fire.firestore
        .collection('users')
        .get()
        .then((docs) => {
          docs.forEach(async (doc) => {
            await this.$fire.firestore
              .collection(doc.ref.path + '/public')
              .get()
              .then((docPub) => {
                this.allCoaches = docPub.docs[0].data()
              })
          })
        })
      this.loading = false
    } catch (error) {
      this.error = error
      this.loading = false
    }
  },
  fetchOnServer: false,
  methods: {
    async TestLoadCoaches() {
      await this.$fire.firestore
        .collection('users') // .collection('users') // memberships works
        .get()
        .then((docs) => {
          console.log(docs)
          docs.forEach(async (doc) => {
            await this.$fire.firestore
              .collection(doc.ref.path + '/public')
              .get()
              .then((docPub) => {
                return docPub.docs[0].data()
              })

            // doc.ref.delete()
          })
        })
      // console.log('TestLoadCoaches: ', test)
    },
  },
}
</script>
