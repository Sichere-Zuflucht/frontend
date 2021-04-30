<template>
  <div>
    <div v-if="filter">
      <v-btn plain :v-ripple="false" @click="open = !open">
        {{ open ? 'Filter verbergen' : 'Filter anzeigen' }}
      </v-btn>
    </div>
    <v-stepper v-if="open" v-model="e6" vertical>
      <!--<v-stepper-step :complete="e6 > 1" editable step="1"
                >{{ isCoach ? coach.langTitle : women.langTitle }}
                <small>{{
                  isCoach ? coach.langSubtitle : women.langSubtitle
                }}</small>
              </v-stepper-step>
              <v-stepper-content step="1">
                <v-chip-group
                  v-model="languages"
                  active-class="primary"
                  column
                  multiple
                >
                  <v-chip
                    v-for="(lang, i) in possibleLangs"
                    :key="i"
                    :value="lang.value"
                    >{{ lang.title }}</v-chip
                  >
                </v-chip-group>
                <v-btn color="primary" @click="update(2)"> Weiter</v-btn>
              </v-stepper-content>-->
      <v-stepper-step
        :complete="e6 > 1"
        :editable="e6 > 1"
        step="1"
        color="secondary"
        ><h2
          class="text-h5 text-uppercase secondary--text"
          style="text-shadow: none"
        >
          {{ isCoach ? coach.helpTitle : women.helpTitle }}
        </h2>
        <small>{{ isCoach ? coach.helpSubtitle : women.helpSubtitle }}</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-chip-group v-model="selectedTopic" column mandatory>
          <v-chip
            v-for="(t, i) in topics"
            :key="i"
            :value="t"
            active-class="primary primary--text"
            outlined
            >{{ t.topicArea }}</v-chip
          >
        </v-chip-group>
        <v-btn color="primary" block @click="update(2)"
          ><v-icon>mdi-check</v-icon></v-btn
        >
      </v-stepper-content>
      <v-stepper-step :complete="e6 > 2" step="2" color="secondary"
        ><h2
          class="text-h5 text-uppercase secondary--text"
          style="text-shadow: none"
        >
          {{ isCoach ? coach.areaTitle : women.areaTitle }}
        </h2>
        <small>{{ isCoach ? coach.areaSubtitle : women.areaSubtitle }}</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-chip-group v-model="selectedTopicPoints" column mandatory multiple>
          <v-chip
            v-for="(t, i) in selectedTopic.topicPoints"
            :key="i"
            :value="t"
            active-class="primary primary--text"
            outlined
            >{{ t }}</v-chip
          >
        </v-chip-group>
        <v-btn color="primary" block @click="finish">
          <v-icon>mdi-check</v-icon></v-btn
        >
      </v-stepper-content>
    </v-stepper>
    <div v-if="!filter && closable" class="mt-2">
      <v-btn :v-ripple="false" @click="open = !open">
        {{ open ? 'schließen' : 'Profil ändern' }}
      </v-btn>
    </div>
  </div>
</template>
<style>
.v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
<script>
export default {
  name: 'CoachingSelection',
  props: {
    isCoach: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    filter: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      coach: {
        langTitle: 'Sprachen',
        langSubtitle: 'In welchen Sprachen bietest du Kurse an',
        helpTitle: 'In welchen Themen bietest du Hilfe an',
        helpSubtitle: 'Bitte wähle ein Thema aus',
        areaTitle: 'Worin genau bietest du Hilfe an',
        areaSubtitle: 'Wähle deine Spezialgebiete aus',
      },
      women: {
        langTitle: 'Sprache',
        langSubtitle: 'In welcher Sprache möchtest du beraten werden',
        helpTitle: 'Fachgebiet',
        helpSubtitle: 'Bitte wähle ein Thema aus',
        areaTitle: 'Themen',
        areaSubtitle: 'Bitte wähle ein oder mehrere Themen aus',
      },
      possibleLangs: [{ title: 'deutsch', value: 'german' }],
      languages: ['german'],
      topics: [],
      selectedTopic: '',
      selectedTopicPoints: [],
      e6: 1,
      panel: [0],
      open: this.isOpen,
    }
  },
  mounted() {
    this.$fire.firestore
      .collection('coachingTypes')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.topics.push(doc.data())
        })
        // this.selectedTopic = this.topics[0]
      })
  },
  methods: {
    finish() {
      this.open = false
      const data = {
        topicArea: this.selectedTopic.topicArea,
        topicPoints: this.selectedTopicPoints,
      }
      console.log('transfer data: ', data)
      this.$emit('filter', data)
      this.$emit('selection', data)
    },
    update(val) {
      this.selectedTopicPoints = []
      this.e6 = val
      this.$emit('filter', {
        // languages: this.languages,
        topicArea: this.selectedTopic.topicArea,
        topicPoints: this.selectedTopicPoints,
      })
    },
  },
}
</script>
