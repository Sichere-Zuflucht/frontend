<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" editable step="1"
      >Sprachen
      <small>In welchen Sprachen kannst du helfen?</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-chip-group v-model="lang" active-class="primary" column multiple>
        <v-chip value="german">deutsch</v-chip>
        <v-chip value="english"> englisch</v-chip>
        <v-chip value="french"> französisch</v-chip>
        <v-chip value="trukey"> türkisch</v-chip>
        <v-chip value="russian"> russisch</v-chip>
        <v-chip value="arabic"> arabisch</v-chip>
      </v-chip-group>
      <v-btn color="primary" @click="update(2)"> Weiter</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 2" editable step="2"
      >Wobei bietest du Hilfe?
      <small>Bitte wähle ein Thema aus</small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-chip-group
        v-for="(t, i) in topics"
        :key="i"
        v-model="topic"
        active-class="primary"
        column
        @change="loadPropperTypes"
      >
        <v-chip :value="t.title">{{ t.title }}</v-chip>
      </v-chip-group>
      <v-btn color="primary" @click="update(2)"> Weiter</v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 3" editable step="3"
      >Was sind deine Themengebiete?
      <small>Mehrfach Auswahl möglich.</small>
    </v-stepper-step>
    <v-stepper-content step="3">
      <v-chip-group
        v-for="(t, i) in types"
        :key="i"
        v-model="type"
        active-class="primary"
        column
        multiple
      >
        <v-chip :value="t">{{ t }}</v-chip>
      </v-chip-group>
      <v-btn color="primary" @click="finish"> Weiter</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
export default {
  name: 'CoachingSelection',
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
    loadPropperTypes(t) {
      const res = this.topics.filter((top) => {
        return top.title === t
      })
      this.types = res[0].area
    },
    finish() {
      this.update(4)
      this.$emit('selection', {
        lang: this.lang,
        topic: this.topic,
        type: this.type,
      })
    },
    update(val) {
      this.e6 = val
      this.$emit('filter', {
        lang: this.lang,
        topic: this.topic,
        type: this.type,
      })
    },
  },
}
</script>
