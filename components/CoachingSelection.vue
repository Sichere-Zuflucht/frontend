<template>
  <div>
    <v-expansion-panels v-model="panel" multiple flat>
      <v-expansion-panel>
        <v-expand-transition>
          <v-expansion-panel-header v-if="!open" class="mx-auto" hide-actions>
            <v-row no-gutters>
              <v-col class="text--secondary">
                <v-fade-transition leave-absolute>
                  <v-btn @click="open = true" key="0" plain>
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
              <v-stepper-step :complete="e6 > 1" editable step="1"
                >Sprachen
                <small>In welchen Sprachen kannst du helfen?</small>
              </v-stepper-step>
              <v-stepper-content step="1">
                <v-chip-group
                  v-model="languages"
                  active-class="primary"
                  column
                  multiple
                >
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
                <v-btn color="primary" @click="update(3)"> Weiter</v-btn>
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
  data() {
    return {
      languages: [],
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
      this.open = false
      this.update(4)
      this.$emit('selection', {
        languages: this.languages,
        topic: this.topic,
        types: this.type,
      })
    },
    update(val) {
      this.e6 = val
      this.$emit('filter', {
        languages: this.languages,
        topic: this.topic,
        types: this.type,
      })
    },
  },
}
</script>
