<template>
  <div>
    <v-expansion-panels v-model="panel" multiple flat>
      <v-expansion-panel>
        <v-expand-transition>
          <v-expansion-panel-header v-if="!open" class="mx-auto" hide-actions>
            <v-row no-gutters>
              <v-col class="text--secondary">
                <v-fade-transition leave-absolute>
                  <v-btn key="0" plain @click="open = true">
                    Filter anzeigen
                  </v-btn>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
        </v-expand-transition>
        <v-expand-transition>
          <v-expansion-panel-content v-if="open">
            <v-stepper v-model="e6" vertical>
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
              <v-stepper-step :complete="e6 > 1" :editable="e6 > 1" step="1"
                >{{ isCoach ? coach.helpTitle : women.helpTitle }}
                <small>{{
                  isCoach ? coach.helpSubtitle : women.helpSubtitle
                }}</small>
              </v-stepper-step>
              <v-stepper-content step="1">
                <v-chip-group v-model="topic" column mandatory>
                  <v-chip
                    v-for="(t, i) in topics"
                    :key="i"
                    :value="t"
                    active-class="primary"
                    >{{ t.title }}</v-chip
                  >
                </v-chip-group>
                <v-btn color="primary" @click="update(2)"> Weiter</v-btn>
              </v-stepper-content>
              <v-stepper-step :complete="e6 > 2" step="2"
                >{{ isCoach ? coach.areaTitle : women.areaTitle }}
                <small>{{
                  isCoach ? coach.areaSubtitle : women.areaSubtitle
                }}</small>
              </v-stepper-step>
              <v-stepper-content step="2">
                <v-chip-group v-model="type" column mandatory multiple>
                  <v-chip
                    v-for="(t, i) in topic.area"
                    :key="i"
                    :value="t"
                    active-class="primary"
                    >{{ t }}</v-chip
                  >
                </v-chip-group>
                <v-btn color="primary" @click="finish"> Weiter</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-expansion-panel-content>
        </v-expand-transition>
      </v-expansion-panel>
    </v-expansion-panels>
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
    isCoach: Boolean,
  },
  data() {
    return {
      radioGroup: 1,
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
        helpTitle: 'In welchem Themengebiet suchst du Hilfe',
        helpSubtitle: 'Bitte wähle ein Themengebiet aus',
        areaTitle: 'Worin genau suchst du Hilfe',
        areaSubtitle: 'Bitte wähle ein Spezialgebiete aus',
      },
      possibleLangs: [{ title: 'deutsch', value: 'german' }],
      languages: ['german'],
      topic: '',
      type: [],
      collection: [],
      topics: [],
      types: [],
      e6: 1,
      panel: [0],
      open: true,
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
        this.topic = this.topics[0].title
      })
  },
  methods: {
    finish() {
      this.open = false
      const data = {
        topic: this.topic,
        types: this.type,
      }
      this.$emit('selection', data)
    },
    update(val) {
      this.type = []
      this.e6 = val
      this.$emit('filter', {
        // languages: this.languages,
        topic: this.topic,
        types: this.type,
      })
    },
  },
}
</script>
