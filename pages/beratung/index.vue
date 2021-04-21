<template>
  <v-container>
    <h1 class="text-h4">Übersicht</h1>
    <span v-if="coachName">von {{ coachName }}</span>
    <VerificationsAlert />
    <v-divider class="my-2"></v-divider>
    <!--    <Coaching v-if="user" :coach="user"></Coaching>-->
    <p class="text-uppercase font-weight-bold">Anfragen:</p>

    <div v-if="women.length != 0">
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
                    v-if="item.suggestions.length >= 3"
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
                    :href="'https://meet.jit.si/' + item.jitsiRoom"
                    class="my-2"
                    color="success"
                    >zum Jitsi Videocall
                  </v-btn>
                  <v-btn
                    class="my-2"
                    color="primary"
                    href="https://arzt.redmedical.de/#/auth/login"
                    outlined
                    >zum RED Videocall
                  </v-btn>
                </div>

                <v-banner v-else>
                  <v-btn @click="show(item)">{{ item.acceptedDate }}</v-btn>
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
    <p v-else>Noch keine Anfragen vorhanden</p>
    <v-btn @click="addStripe"> add stripe </v-btn>
    <div v-if="stripeRegisterURL">{{ stripeRegisterURL }}</div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      women: [],
      requests: [],
      stripeRegisterURL: null,
    }
  },
  computed: {
    coachName() {
      return this.user.firstName + ' ' + this.user.lastName
    },
  },
  mounted() {
    this.user = this.$store.getters['modules/user/user']
    this.$nuxt.$fire.functions
      .httpsCallable('request-getRequests')()
      .then((requests) => this.requests.push(...requests.data))
  },
  methods: {
    addSuggestions(request) {
      this.$nuxt.$fire.functions.httpsCallable('request-addSuggestions')({
        coachName: this.coachName,
        suggestions: request.suggestions,
        requestId: request.id,
      })
    },
    eraseDate(d, list) {
      const d2 = d + d
      d === 0 ? list.splice(d) : list.splice(d, d2)
    },
    show() {
      console.log(this.requests)
    },
    addStripe() {
      this.$fire.functions
        .httpsCallable('stripe-getStripeLink')({ email: this.user.email })
        .then((stripeData) => {
          this.stripeRegisterURL = stripeData.data.url
        })
    },
  },
}
</script>
