<template>
  <v-container v-if="user">
    <client-only>
      <p class="caption mb-0 font-weight-bold">Hallo</p>
      <h1 v-if="user && user.public" class="text-h1 secondary--text">
        {{ user.public.firstName }} {{ user.public.lastName }}
      </h1>
    </client-only>
    <CoachFulfilRegistration />
    <div v-if="!!this.private && this.private.stripe">
      <h2 class="primary--text mb-2">Anfragen</h2>
      <div v-if="requests != null">
        <div v-if="requests.length !== 0">
          <v-expansion-panels>
            <v-expansion-panel v-for="(item, i) in requests" :key="i">
              <v-expansion-panel-header
                color="grey lighten-5"
                class="d-flex align-center justify-start"
              >
                <v-avatar class="pr-2 flex-shrink-1 flex-grow-0">
                  <v-img
                    :lazy-src="item.womanAvatar"
                    :src="item.womanAvatar"
                    max-height="40"
                    max-width="40"
                  ></v-img>
                </v-avatar>
                <div class="d-flex flex-column flex-grow-0 flex-shrink-0">
                  <p class="caption mb-0">Frau</p>
                  <p class="font-weight-bold mb-0">{{ item.womanUserName }}</p>
                </div>

                <v-chip
                  v-if="item.acceptedDate"
                  class="ma-2 flex-shrink-0 flex-grow-1"
                  color="success"
                  text-color="white"
                >
                  bereit
                </v-chip>
                <v-chip
                  v-else-if="item.coachAnswered"
                  class="ma-2 flex-shrink-0 flex-grow-1"
                  color="orange"
                  text-color="white"
                >
                  Antwort abwarten
                </v-chip>

                <v-chip
                  v-else
                  class="ma-2 flex-shrink-0 flex-grow-1"
                  color="red"
                  text-color="white"
                >
                  unbearbeitet
                </v-chip>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card elevation="0">
                  <v-card-text
                    ><v-sheet
                      v-if="item.message"
                      color="grey lighten-5 pa-3 my-4"
                    >
                      <p
                        class="caption ma-0 grey--text"
                        style="transform: translateY(-22px); position: absolute"
                      >
                        Nachricht
                      </p>
                      <p class="mb-0">{{ item.message }}</p></v-sheet
                    >

                    <div v-if="!item.coachAnswered" class="pt-4">
                      <v-select
                        v-model="selectedVideoType"
                        :items="videoTypes"
                        outlined
                        hide-details
                        label="Videoanbieter auswählen"
                        class="mb-4"
                      ></v-select>
                      <v-list>
                        <v-list-item-group>
                          <v-list-item
                            v-for="(d, di) in item.suggestions"
                            :key="di"
                          >
                            <v-list-item-content>
                              <v-list-item-title class="font-weight-bold"
                                >{{ formatDate(d.date) }}
                              </v-list-item-title>
                              <p class="caption">{{ d.time }} Uhr</p>
                            </v-list-item-content>
                            <v-list-item-icon>
                              <v-icon @click="eraseDate(di, item.suggestions)"
                                >mdi-close
                              </v-icon>
                            </v-list-item-icon>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>

                      <UtilsDatePicker :item="item" />
                      <p class="mt-2 mb-0 pa-2 caption">
                        Bitte füge mind. 3 Termine hinzu.
                      </p>
                    </div>

                    <div v-else-if="item.acceptedDate">
                      <p class="caption">Bestätigter Termin</p>
                      <b
                        >{{ formatDate(item.acceptedDate.date) }} |
                        {{ item.acceptedDate.time }}
                      </b>
                      <v-divider></v-divider>
                      <v-btn
                        class="my-2"
                        color="success"
                        target="_blank"
                        :href="
                          item.videoType === 'Jitsi'
                            ? item.video
                            : item.video.codeArzt
                        "
                        >zum {{ item.videoType }} Videocall
                      </v-btn>
                    </div>

                    <v-banner v-else>
                      Es wurde noch kein Termin bestätigt...
                    </v-banner></v-card-text
                  >
                  <v-card-actions class="d-flex justify-end">
                    <v-btn class="caption" plain>Frau absagen</v-btn>
                    <v-btn
                      v-if="!item.coachAnswered"
                      :loading="loading"
                      :disabled="item.suggestions.length < 3"
                      color="success"
                      @click="addSuggestions(item)"
                      >Zusagen
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <p v-else class="caption">
          <b>Noch keine existierenden Anfragen.</b><br />
          Sobald eine Frau eine Anfrage an Sie stellt, wird diese hier
          angezeigt.
        </p>
      </div>
      <v-sheet v-else elevation="2" class="pa-2"
        ><v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="text, text, text, text"
        ></v-skeleton-loader
      ></v-sheet>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      requests: null,
      videoTypes: ['Jitsi', 'RED'],
      selectedVideoType: 'Jitsi',
      loading: false,
    }
  },
  async fetch() {
    this.requests = (
      await this.$fire.functions.httpsCallable('request-getRequests')()
    ).data
  },
  fetchOnServer: false,
  computed: {
    coachName() {
      return this.user.public.firstName + ' ' + this.user.public.lastName
    },
    user() {
      return this.$store.state.modules.user
    },
    private() {
      return this.$store.getters['modules/user/private']
    },
  },
  methods: {
    addSuggestions(request) {
      this.loading = true
      this.$fire.functions
        .httpsCallable('request-addSuggestions')({
          coachName: this.coachName,
          suggestions: request.suggestions,
          requestId: request.id,
          videoType: this.selectedVideoType,
        })
        .then(() => {
          request.coachAnswered = true
          request.updatedAt = new Date()
          this.loading = false
        })
    },
    eraseDate(d, list) {
      const d2 = d + d
      d === 0 ? list.splice(d) : list.splice(d, d2)
    },
    formatDate(date) {
      const d = new Date(date)
      return d.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
</script>
