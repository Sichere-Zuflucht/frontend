<template>
  <v-sheet>
    <UtilsBanner url="le-buzz-tVnm9I9jb8I-unsplash.jpg" />
    <v-container>
      <h1 class="text-h1 primary--text">Beratung und Hilfe</h1>
      <p class="mb-6">
        in Form von <b>Online-Besprechungen</b> mit Fachleuten zu euren Themen.
        Diese könnt ihr von überall ganz <b>einfach und anonym</b> mit dem
        <b>Handy</b> machen.
      </p>
      <div style="position: relative; z-index: 0">
        <div
          style="
            position: sticky;
            top: 50px;
            width: calc(100% + 10px);
            margin-left: -5px;
            padding: 5px;
            padding-top: 15px;
            z-index: 5;
            background-color: white;
          "
        >
          <p class="caption mb-0">Filtern:</p>
          <v-chip-group v-model="tagsSelected" column class="pt-0">
            <v-chip
              v-for="(tag, n) in coachingTypes"
              :key="n"
              :value="tag"
              outlined
              small
              filter
              active-class="primary primary--text"
            >
              {{ tag }}</v-chip
            >
          </v-chip-group>
        </div>
        <v-alert v-if="error" color="error" dark>{{ error }}</v-alert>
        <v-row v-else-if="!loading">
          <v-col
            v-for="(coaching, i) in allCoaches.filter((m) =>
              tagsSelected != null
                ? tagsSelected == m.info.topicArea[0]
                  ? true
                  : false
                : true
            )"
            :key="i"
            cols="12"
            md="4"
            class="mt-5 px-1"
          >
            <CoachingProfileWrapper :pub-coach-data="coaching" />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col v-for="n in 3" :key="n" cols="12" md="4">
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card-avatar, article"
            ></v-skeleton-loader
          ></v-col>
        </v-row>
        <p class="caption mt-4">
          <b>Dein Fachgebiet oder Thema ist nicht dabei?</b><br />
          <a href="mailto:kontakt@sichere-zuflucht.de"
            >Schreib uns eine Nachricht</a
          >, vielleicht können wir trotzdem jemanden finden, der dir weiter
          hilft.
        </p>
      </div>
    </v-container>
    <WomanPriceInfo />
  </v-sheet>
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
      await this.$fire.firestore
        .collection('coachingTypes')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.coachingTypes.push(doc.data().topicArea)
          })
        })

      /* this.allCoaches = (
        await this.$fire.functions.httpsCallable('user-getCoaches')()
      ).data */
      await this.$fire.firestore
        .collection('users')
        .doc()
        .collection('private')
        .where('verifySetting.verified', '==', true)
        .get()
        .then((querySnapshot) => {
          console.log('q:', querySnapshot)
          querySnapshot.forEach((doc) => {
            console.log('doc:', doc.data())
            this.allCoaches.push(doc.data())
          })
        })
      console.log(
        'coaches',
        await this.$fire.firestore
          .collection('users')
          .doc()
          .collection('private')
          .where('verifySetting.verified', '==', true)
          .get()
      )
      console.log(
        'coaches 2',
        await this.$fire.firestore
          .collectionGroup('private')
          .where('verifySetting.verified', '==', true)
          .get()
      )

      this.loading = false
    } catch (error) {
      this.error = error
      this.loading = false
    }
  },
  fetchOnServer: false,
}
</script>
