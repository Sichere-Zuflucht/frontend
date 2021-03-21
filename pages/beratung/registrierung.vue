<template>
  <div>
    <h1>Herzlich Willkommen bei Sichere Zuflucht</h1>
    <p>Fülle direkt dein Profil aus</p>
    <p>{{ user ? user.email : null }}</p>
    <v-divider></v-divider>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1" editable
        >Sprachen
        <small>In welchen Sprachen kannst du helfen?</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-chip-group active-class="primary" v-model="lang" column multiple>
          <v-chip value="german">deutsch</v-chip>
          <v-chip value="english"> englisch </v-chip>
          <v-chip value="french"> französisch </v-chip>
          <v-chip value="trukey"> türkisch </v-chip>
          <v-chip value="russian"> russisch </v-chip>
          <v-chip value="arabic"> arabisch </v-chip>
        </v-chip-group>
        <v-btn color="primary" @click="e6 = 2"> Weiter </v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="e6 > 2" step="2" editable
        >Wobei bietest du Hilfe?
        <small>Bitte wähle ein Thema aus</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-chip-group
          v-model="topic"
          v-for="(t, i) in topics"
          :key="i"
          active-class="primary"
          column
          @change="loadPropperTypes"
        >
          <v-chip :value="t.title">{{ t.title }}</v-chip>
        </v-chip-group>
        <v-btn color="primary" @click="e6 = 3"> Weiter </v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="e6 > 3" step="3" editable
        >Was sind deine Themengebiete?
        <small>Mehrfach Auswahl möglich.</small>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-chip-group
          v-model="type"
          v-for="(t, i) in types"
          :key="i"
          active-class="primary"
          column
          multiple
        >
          <v-chip :value="t">{{ t }}</v-chip>
        </v-chip-group>
        <v-btn
          color="primary"
          @click="
            () => {
              e6 = 4
              sendData
            }
          "
        >
          Weiter
        </v-btn>
        <v-btn text @click="showData"> show data </v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: [],
      topic: '',
      type: [],
      collection: [],
      topics: [],
      types: [],
      e6: 1,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    window.$nuxt.$fire.firestore
      .collection('coachingTypes')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.topics.push(doc.data())
        })
        this.topic = this.topics[0].title
      })
  },
  methods: {
    showData() {
      console.log(this.lang, this.topic, this.type)
    },
    sendData() {
      window.$nuxt.$fire.firestore
        .collection('users')
        .doc(window.$nuxt.$fire.auth.currentUser.uid)
        .update({
          languages: this.lang,
          topic: this.topic,
          types: this.type,
        })
    },
    loadPropperTypes(t) {
      const res = this.topics.filter((top) => {
        return top.title === t
      })
      this.types = res[0].area
      console.log(this.types)
    },
  },
}
</script>
