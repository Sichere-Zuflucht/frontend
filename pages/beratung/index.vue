<template>
  <v-container>
    <p class="caption mb-0 font-weight-bold">Hallo</p>
    <h1 v-if="user.firstName" class="text-h1 secondary--text">
      {{ user.firstName }} {{ user.lastName }}
    </h1>
    <VerificationsAlert />
    <!--    <Coaching v-if="user" :coach="user"></Coaching> -->
    <h2 class="primary--text mb-2">Anfragen</h2>
    <div v-if="requests">
      <div v-if="requests.length != 0">
        <v-expansion-panels>
          <v-expansion-panel v-for="(item, i) in requests" :key="i">
            <v-expansion-panel-header>
              <v-chip
                v-if="item.acceptedDate"
                class="ma-2"
                color="success"
                text-color="white"
              >
                bereit
              </v-chip>
              <v-chip
                v-else-if="item.coachAnswered"
                class="ma-2"
                color="orange"
                text-color="white"
              >
                auf Termin warten
              </v-chip>

              <v-chip v-else class="ma-2" color="red" text-color="white">
                unbearbeitet
              </v-chip>

              Frau {{ item.userName }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card class="pa-6" elevation="0">
                <v-card-title>
                  <v-col class="mr-2 pa-0" cols="8">
                    <p class="ma-0 caption">Frau</p>
                    <p class="ma-0">{{ item.womanUserName }}</p></v-col
                  >
                  <v-col cols="3">
                    <v-avatar color="primary" size="56">
                      <v-img
                        :lazy-src="item.womanAvatar"
                        :src="item.womanAvatar"
                        max-height="56"
                        max-width="56"
                      ></v-img>
                    </v-avatar>
                  </v-col>
                </v-card-title>
                <v-card-text>{{ item.message }}</v-card-text>
                <v-card-actions class="d-inline-flex">
                  <div v-if="!item.coachAnswered">
                    <v-divider></v-divider>
                    <v-select
                      v-model="selectedVideoType"
                      :items="videoTypes"
                      single-line
                      persistent-hint
                      hint="Wähle einen Video Anbieter"
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
                              >{{ d }}
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-icon>
                            <v-icon @click="eraseDate(di, item.suggestions)"
                              >mdi-close
                            </v-icon>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>

                    <DatePicker :item="item" />
                    <p class="mt-2 pa-2 caption">
                      Bitte füge mind. 3 Termine hinzu.
                    </p>

                    <v-btn
                      :loading="loading"
                      :disabled="item.suggestions.length < 3"
                      color="success"
                      @click="addSuggestions(item)"
                      >Zusagen
                    </v-btn>
                  </div>

                  <div v-else-if="item.acceptedDate">
                    <p class="caption">Bestätigter Termin</p>
                    <b>{{ item.acceptedDate }} </b>
                    <v-divider></v-divider>
                    <v-btn
                      class="my-2"
                      color="success"
                      target="_blank"
                      :href="
                        item.videoType === 'Jitsi'
                          ? item.jitsiLink
                          : item.redLink.codeArzt
                      "
                      >zum {{ item.videoType }} Videocall
                    </v-btn>
                  </div>

                  <v-banner v-else>
                    Es wurde noch kein Termin bestätigt...
                  </v-banner>
                </v-card-actions>
                <v-card-actions class="d-inline-flex">
                  <v-btn class="caption" plain>Frau absagen</v-btn>
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <p v-else class="caption">
        <b>Noch keine existierenden Anfragen.</b><br />
        Sobald eine Frau eine Anfrage an Sie stellt, wird diese hier angezeigt.
      </p>
    </div>
    <v-sheet v-else elevation="2" class="pa-2"
      ><v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="text, text, text, text"
      ></v-skeleton-loader
    ></v-sheet>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      requests: null,
      videoTypes: ['Jitsi', 'RED'],
      selectedVideoType: 'Jitsi',
      loading: false,
    }
  },
  computed: {
    coachName() {
      return this.user.firstName + ' ' + this.user.lastName
    },
  },
  mounted() {
    this.user = this.$store.getters['modules/user/user']
    this.$fire.firestore.collection('requests').onSnapshot((snap) => {
      this.requests = []
      snap.docs.forEach((u) => {
        if (u.data().ids.includes(this.user.uid))
          this.requests.push({
            id: u.id,
            ...u.data(),
          })
      })
    })
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
          this.loading = false
        })
    },
    eraseDate(d, list) {
      const d2 = d + d
      d === 0 ? list.splice(d) : list.splice(d, d2)
    },
  },
}
</script>
