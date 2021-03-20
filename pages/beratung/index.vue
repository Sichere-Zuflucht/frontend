<template>
  <div>
    <h1>Hallo {{ user ? user.email : null }}</h1>
    <div v-if="women">
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in women" :key="i">
          <v-expansion-panel-header>
            {{ item.userName }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card elevation="0" class="pa-6">
              <v-card-title>
                <v-col>
                  <v-avatar color="primary" size="56"
                    ><v-img
                      :lazy-src="item.avatar"
                      max-height="56"
                      max-width="56"
                      :src="item.avatar"
                    ></v-img
                  ></v-avatar>
                </v-col>
                <v-col class="ml-2"> {{ item.userName }} </v-col>
              </v-card-title>
              <v-card-text>{{ item.message }}</v-card-text>
              <v-card-actions class="d-inline-flex">
                <div v-if="!item.isAccepted">
                  <v-divider></v-divider>
                  <p>
                    Bitte füge mind. 3 Terminvorschläge für Frau
                    <b class="">{{ item.userName }}</b> hinzu.
                  </p>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-combobox
                        v-model="dates"
                        multiple
                        chips
                        small-chips
                        label="Termine auswählen"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-combobox>
                    </template>
                    <v-date-picker
                      v-model="dates"
                      multiple
                      no-title
                      scrollable
                      :min="today"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Schließen
                      </v-btn>
                      <v-btn text color="primary" @click="saveDates(item.uid)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-text-field label="Terminvorschlag 1"></v-text-field>

                  <v-btn color="success">Zusagen </v-btn>
                </div>
                <v-btn
                  v-else
                  color="primary"
                  :href="'https://meet.jit.si/' + item.jitsiRoom"
                  >Videocall</v-btn
                ></v-card-actions
              >
              <v-card-actions class="d-inline-flex"
                ><v-btn>Absagen</v-btn></v-card-actions
              >
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <signup />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '{name}',
      women: [],
      dates: [],
      menu: false,
      today: this.formatDate(new Date()),
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.loadRequests()
  },
  methods: {
    loadRequests() {
      const uid = 'Jb7kyiXffQaRsTWIcFAm'
      const db = window.$nuxt.$fire.firestore
      db.collection('users/' + uid + '/requests')
        .get()
        .then((snapshot) => {
          snapshot.forEach((subDoc) => {
            db.collection('users')
              .doc(subDoc.data().from.id)
              .get()
              .then((subsubDoc) => {
                const user = {
                  uid: subDoc.id,
                  jitsiRoom: subDoc.data().jitsiRoom,
                  isAccepted: subDoc.data().isAccepted,
                  avatar: subsubDoc.data().avatar,
                  userName: subsubDoc.data().userName,
                  message: subDoc.data().message,
                  showInputs: false,
                }
                this.women.push(user)
              })
          })
        })
    },
    formatDate(date) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    },
    saveDates(docID) {
      const uid = 'Jb7kyiXffQaRsTWIcFAm'
      const db = window.$nuxt.$fire.firestore
      const dateList = {}
      this.dates.forEach((date, i) => {
        dateList[i] = date
      })
      this.menu = false
      db.collection('users/' + uid + '/requests')
        .doc(docID)
        .update({
          dates: dateList,
          jitsiRoom: uid.substring(0, 8) + '_' + docID.substring(0, 8),
          isAccepted: true,
        })
    },
    acceptRequest(user) {},
  },
}
</script>
