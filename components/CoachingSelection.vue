<template>
  <div>
    <v-expand-transition>
      <v-stepper v-show="open" v-model="e6" vertical class="mx-auto">
        <v-stepper-step
          v-if="isCoach"
          :complete="e6 > 0"
          :editable="e6 > 0"
          step="0"
          color="secondary"
          ><h2
            class="text-h5 text-uppercase secondary--text"
            style="text-shadow: none"
          >
            Profilfoto
          </h2>
          <small>Lade ein Profilfoto hoch</small>
        </v-stepper-step>
        <v-stepper-content v-if="isCoach" step="0">
          <v-row class="mb-4">
            <v-col class="d-flex align-center justify-center"
              ><v-avatar size="80"
                ><v-img
                  :src="
                    changeAvatar ? changeAvatar : avatar
                  " /></v-avatar></v-col
            ><v-col class="d-flex align-center justify-center"
              ><v-btn color="secondary" @click="overlay = !overlay"
                >Foto bearbeiten</v-btn
              >
              <v-overlay :absolute="true" :opacity="1" :value="overlay">
                <v-form ref="uploadForm" v-model="uploadRef"
                  ><v-file-input
                    :rules="rules.picture"
                    accept="image/png, image/jpeg, image/png"
                    placeholder="Foto hochladen"
                    prepend-icon="mdi-camera"
                    label="Profilfoto"
                    :show-size="1000"
                    v-model="imageFile"
                    style="width: 220px"
                    required
                  ></v-file-input>
                  <v-btn
                    :loading="isLoading"
                    color="success"
                    :disabled="!uploadRef"
                    @click="upload(imageFile)"
                  >
                    Foto hochladen
                  </v-btn>
                  <v-btn text @click="overlay = !overlay"> Abbrechen </v-btn>
                </v-form>
              </v-overlay>
            </v-col>
          </v-row>

          <v-btn color="primary" block @click="update(1)"
            ><v-icon>mdi-arrow-down</v-icon></v-btn
          >
        </v-stepper-content>
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
          <v-chip-group v-model="selectedTopic" column mandatory multiple>
            <v-chip
              v-for="(t, i) in topics"
              :key="i"
              :value="t.topicArea"
              active-class="primary primary--text"
              outlined
              >{{ t.topicArea }}</v-chip
            >
          </v-chip-group>
          <v-btn color="primary" block @click="isCoach ? update(2) : finish()"
            ><v-icon>{{
              isCoach ? 'mdi-arrow-down' : 'mdi-check'
            }}</v-icon></v-btn
          >
        </v-stepper-content>
        <v-stepper-step
          v-if="isCoach"
          :complete="e6 > 2"
          step="2"
          color="secondary"
        >
          <h2
            class="text-h5 text-uppercase secondary--text"
            style="text-shadow: none"
          >
            {{ coach.bioTitle }}
          </h2>
          <small>{{ coach.bioSubtitle }}</small>
        </v-stepper-step>
        <v-stepper-content v-if="isCoach" step="2">
          <p class="caption">
            Bitte stellen Sie sich kurz vor, damit die Frauen sich ein besseres
            Bild von Ihrer Person machen können. Z.B. mit Berufserfahrung,
            Schwerpunkt etc.
          </p>
          <v-text-field
            outlined
            label="Coach/Berater*in seit dem Jahr:"
            type="number"
            :rules="[
              () =>
                (!!changeSince &&
                  changeSince >= 1950 &&
                  changeSince <= new Date().getFullYear()) ||
                'Die Jahresabgabe muss zwischen 1950 und heute liegen',
            ]"
            placeholder="Jahreszahl"
            min="1900"
            max="2099"
            step="1"
            v-model="changeSince"
          ></v-text-field>
          <v-textarea
            outlined
            label="Beruflicher Hintergrund"
            placeholder="z.B. was Sie „vorher“ gemacht haben oder was Sie bewegt"
            v-model="changeHistory"
          ></v-textarea>
          <v-textarea
            outlined
            label="Schwerpunkte"
            placeholder="Am besten welche, die zu den Problemen unserer Frauen passen."
            v-model="changeFocus"
          ></v-textarea>
          <v-textarea
            outlined
            label="Beratungs-/ Coaching-Themen"
            placeholder="1. 2. 3. …"
            v-model="changeCoachingTopics"
          ></v-textarea>
          <v-textarea
            outlined
            label="Persönliches über mich"
            placeholder="Mit Nahbarkeit können Sie den Frauen helfen, ihre Scheu zu überwinden und sich Ihre Hilfe zu holen."
            v-model="changeDescription"
          ></v-textarea>
          <v-textarea
            outlined
            label="konkrete Hilfestellung"
            placeholder="… was soll hier rein?"
            v-model="changeAssistance"
          ></v-textarea>
          <v-btn color="primary" block @click="finish">
            <v-icon>mdi-check</v-icon> Speichern</v-btn
          >
        </v-stepper-content>
      </v-stepper>
    </v-expand-transition>
    <div v-if="filter" class="d-flex justify-center">
      <v-btn plain :v-ripple="false" @click="open = !open">
        {{ open ? 'Filter verbergen' : 'Filter anzeigen' }}
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
    info: {
      type: Object,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      coach: {
        langTitle: 'Sprachen',
        langSubtitle: 'In welchen Sprachen bietest du Kurse an',
        helpTitle: 'Fachgebiete',
        helpSubtitle: 'Bitte wähle ein oder mehrere Fachgebiete aus',
        areaTitle: 'Themenfelder',
        areaSubtitle: 'Bitte wähle ein oder mehrere Themen aus',
        bioTitle: 'Kurzbeschreibung',
        bioSubtitle: 'Füge eine Kurzbeschreibung hinzu',
      },
      women: {
        langTitle: 'Sprache',
        langSubtitle: 'In welcher Sprache möchtest du beraten werden',
        helpTitle: 'Fachgebiet',
        helpSubtitle: 'Bitte wähle ein Fachgebiet aus',
        areaTitle: 'Themen',
        areaSubtitle: 'Bitte wähle ein oder mehrere Themen aus',
      },
      topics: [],
      selectedTopic: this.info.topicArea,
      changeSince: this.info.since,
      changeDescription: this.info.description,
      changeHistory: this.info.history,
      changeFocus: this.info.focus,
      changeCoachingTopics: this.info.coachingTopics,
      changeAssistance: this.info.assistance,
      e6: this.isCoach ? 0 : 1,
      panel: [0],
      open: this.isOpen,
      uploadRef: true,
      changeAvatar: null,
      imageFile: '',
      isLoading: false,
      overlay: false,
      rules: {
        picture: [
          (value) =>
            !value ||
            value.size < 2000000 ||
            'Fotogröße sollte kleiner als 2 MB sein.',
          (value) => !!value || 'Lade ein Foto hoch.',
        ],
      },
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
        topicArea: this.selectedTopic,
        description: this.changeDescription,
        since: this.changeSince,
        history: this.changeHistory,
        focus: this.changeFocus,
        coachingTopics: this.changeCoachingTopics,
        assistance: this.changeAssistance,
        avatar: this.changeAvatar,
      }
      this.$emit('filter', data)
      this.$emit('selection', data)
    },
    update(val) {
      this.selectedTopicPoints = []
      this.e6 = val
      this.$emit('filter', {
        // languages: this.languages,
        topicArea: this.selectedTopic.topicArea,
        /* description: this.changeDescription,
        since: this.changeSince,
        history: this.changeHistory,
        focus: this.changeFocus,
        coachingTopics: this.changeCoachingTopics,
        assistance: this.changeAssistance, */
      })
    },
    upload(file) {
      this.isLoading = true
      const uploadTask = this.$fire.storage
        .ref()
        .child(this.$store.state.modules.user.uid)
        .put(file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
          // return (this.progress[i] = { loaded: progress })
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break

            case 'storage/canceled':
              // User canceled the upload
              break

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.changeAvatar = downloadURL
          })
          this.imageFile = ''
          this.isLoading = false
          this.overlay = false
        }
      )
    },
  },
}
</script>
