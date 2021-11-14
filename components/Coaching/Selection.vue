<template>
  <div>
    <v-expand-transition>
      <v-stepper v-model="e6" vertical class="mx-auto">
        <v-stepper-step
          :complete="e6 > 1"
          :editable="e6 > 1"
          :color="e6 > 1 ? 'success' : 'secondary'"
          step="1"
          ><h2
            class="text-h5 text-uppercase secondary--text"
            style="text-shadow: none"
          >
            {{ coach.helpTitle }}
          </h2>
          <small>{{ coach.helpSubtitle }}</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-chip-group v-model="selectedTopic" column mandatory multiple>
            <v-chip
              v-for="(t, i) in topics"
              :key="i"
              :value="t.topicArea"
              active-class="primary primary--text"
              outlined
              filter
              >{{ t.topicArea }}
            </v-chip>
          </v-chip-group>
          <v-btn color="primary" block @click="e6++">
            <v-icon class="pr-1">mdi-arrow-down</v-icon>
            Weiter
          </v-btn>
        </v-stepper-content>
        <v-stepper-step
          :complete="e6 > 2"
          :editable="e6 > 2"
          :color="e6 > 2 ? 'success' : 'secondary'"
          step="2"
        >
          <h2
            class="text-h5 text-uppercase secondary--text"
            style="text-shadow: none"
          >
            {{ coach.bioTitle }}
          </h2>
          <small>{{ coach.bioSubtitle }}</small>
        </v-stepper-step>
        <v-stepper-content step="2">
          <v-text-field
            v-model="changeProfession"
            outlined
            class="pt-2"
            label="Aktueller Beruf"
            counter="25"
            :rules="[
              (v) => (!!v && v.length <= 25) || 'weniger als 25 Buchstaben',
            ]"
            placeholder="Jobbezeichnung."
          ></v-text-field>
          <v-text-field
            v-model="changeSince"
            outlined
            label="Coach/Berater*in seit dem Jahr:"
            type="number"
            :rules="[
              () =>
                (!!changeSince &&
                  changeSince >= yearsAgo &&
                  changeSince <= new Date().getFullYear()) ||
                'Die Jahresangabe muss zwischen ' +
                  yearsAgo +
                  ' und heute liegen',
            ]"
            placeholder="Jahreszahl"
            min="1900"
            :max="new Date().getFullYear()"
            step="1"
          ></v-text-field>
          <v-textarea
            v-model="changeHistory"
            outlined
            label="Beruflicher Hintergrund"
            placeholder="z.B. was Sie vorher gemacht haben oder was Sie bewegt"
          ></v-textarea>
          <v-textarea
            v-model="changeFocus"
            outlined
            label="Schwerpunkte"
            placeholder="Am besten welche, die zu den Problemen unserer Frauen passen."
          ></v-textarea>
          <v-textarea
            v-model="changeCoachingTopics"
            outlined
            label="Beratungs-/ Coaching-Themen"
            placeholder="1. 2. 3. …"
          ></v-textarea>
          <v-textarea
            v-model="changeDescription"
            outlined
            label="Persönliches über mich"
            placeholder="Seien Sie Nahbar. So können Sie den Frauen helfen, ihre Scheu zu überwinden und sich Hilfe zu holen."
          ></v-textarea>
          <v-textarea
            v-model="changeAssistance"
            outlined
            label="konkrete Hilfestellung"
            placeholder="…"
          ></v-textarea>
          <v-btn color="primary" block @click="e6++">
            <v-icon class="pr-1">mdi-arrow-down</v-icon>
            weiter
          </v-btn>
        </v-stepper-content>
        <v-stepper-step
          :complete="e6 > 3"
          :editable="e6 > 3"
          step="3"
          :color="e6 > 3 ? 'success' : 'secondary'"
          ><h2
            class="text-h5 text-uppercase secondary--text"
            style="text-shadow: none"
          >
            {{ coach.picTitle }}
          </h2>
          <small>{{ coach.picSubtitle }}</small>
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-row class="mb-4">
            <v-col class="d-flex align-center justify-center">
              <v-avatar size="80">
                <v-img
                  v-if="avatar"
                  :src="$store.getters['modules/user/avatar']"
                />
                <SharedCoachIcon
                  v-else
                  color="#b3b3b3"
                  style="border: 1px solid #b3b3b3"
                  class="pa-2"
                />
              </v-avatar>
            </v-col>
            <v-col class="d-flex align-center justify-center">
              <v-btn color="secondary" @click="overlay = !overlay"
                >Foto auswählen
              </v-btn>
              <v-overlay :absolute="true" :opacity="1" :value="overlay">
                <v-form ref="uploadForm" v-model="uploadRef">
                  <v-file-input
                    v-model="imageFile"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/png"
                    placeholder="Foto hochladen"
                    prepend-icon="mdi-camera"
                    label="Foto auswählen"
                    :show-size="1000"
                    style="width: 220px"
                    required
                  ></v-file-input>
                  <v-btn text @click="overlay = !overlay"> Abbrechen</v-btn>
                  <v-btn
                    :loading="isLoading"
                    color="success"
                    :disabled="!uploadRef"
                    @click="upload(imageFile)"
                  >
                    Foto hochladen
                  </v-btn>
                </v-form>
              </v-overlay>
            </v-col>
          </v-row>

          <v-btn color="primary" block @click="finish">
            <v-icon class="pr-1">mdi-content-save</v-icon> Profil speichern
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: 'CoachingSelection',
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      coach: {
        helpTitle: 'Ihre Fachgebiete',
        helpSubtitle:
          'Bitte wählen Sie die Fachgebiete aus, zu denen Sie Beratung anbieten möchten.',
        picTitle: 'Foto',
        picSubtitle: 'Sammeln Sie Sympathiepunkte',
        bioTitle: 'Kurzbeschreibung',
        bioSubtitle: 'Damit die Frauen Ihr Angebot besser einschätzen können.',
      },
      topics: [],
      selectedTopic: [],
      changeProfession: this.info.profession,
      changeSince: this.info.since,
      changeDescription: this.info.description,
      changeHistory: this.info.history,
      changeFocus: this.info.focus,
      changeCoachingTopics: this.info.coachingTopics,
      changeAssistance: this.info.assistance,
      e6: 1,
      panel: [0],
      uploadRef: true,
      changeAvatar: null,
      imageFile: [],
      isLoading: false,
      overlay: false,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Fotogröße sollte kleiner als 2 MB sein.',
        (value) => !!value || 'Lade ein Foto hoch.',
      ],
      yearsAgo: new Date().getFullYear() - 100,
    }
  },
  async fetch() {
    this.topics = (
      await this.$fire.firestore.collection('coachingTypes').get()
    ).docs.map((doc) => doc.data())
  },
  mounted() {
    for (const v in this.info.topicArea) {
      this.selectedTopic.push(this.info.topicArea[v])
    }
  },
  fetchOnServer: false,
  methods: {
    finish() {
      const data = {
        topicArea: this.selectedTopic,
        description: this.changeDescription,
        since: this.changeSince,
        history: this.changeHistory,
        focus: this.changeFocus,
        coachingTopics: this.changeCoachingTopics,
        assistance: this.changeAssistance,
        avatar: this.changeAvatar ? this.changeAvatar : this.avatar,
        profession: this.changeProfession,
      }
      this.$emit('selection', data)
    },
    upload(file) {
      this.isLoading = true
      const uploadTask = this.$fire.storage
        .ref()
        .child('profiles/' + this.$store.getters['modules/user/uid'])
        .put(file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // eslint-disable-next-line no-console
          console.log('Upload is ' + progress + '% done')

          switch (snapshot.state) {
            case 'paused':
              // eslint-disable-next-line no-console
              console.log('Upload is paused')
              break
            case 'running':
              // eslint-disable-next-line no-console
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
            this.$store.dispatch('modules/user/setAvatar', downloadURL)
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
<style scoped>
.v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
