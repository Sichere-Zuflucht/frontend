<template>
  <div>
    <h1>
      Hallo <span v-if="data">{{ data.firstName }} {{ data.lastName }}</span>
    </h1>
    <v-alert v-if="!data.info" color="red" type="warning"
      >Bitte füllen Sie ihr Profil fertig aus.
      <v-btn to="registrierung" append class="ma-2 ml-0">weiter</v-btn></v-alert
    >
    <div v-if="women">
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in women" :key="i">
          <v-expansion-panel-header>
            <v-chip
              v-if="item.isAccepted"
              class="ma-2"
              color="green"
              text-color="white"
            >
              zugesagt
            </v-chip>
            <v-chip v-else class="ma-2" color="orange" text-color="white">
              noch offen
            </v-chip>
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
                  <p v-for="d in item.dates" :key="d">{{ d }}</p>
                  <DatePicker :item="item" />

                  <v-btn
                    v-if="item.dates.length >= 3"
                    color="success"
                    @click="saveDates(item)"
                    >Zusagen
                  </v-btn>
                  <v-btn
                    v-if="item.dates.length >= 3"
                    color="success"
                    @click="showDates(item)"
                    >show
                  </v-btn>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '{name}',
      data: {},
      women: [],
      endpoint: 'https://formspree.io/f/xknkwgnn',
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
      console.log('$Store user: ', this.$store.state.user)
      const uid = this.$store.state.user.uid
      const db = window.$nuxt.$fire.firestore
      db.collection('users')
        .doc(uid)
        .get()
        .then((data) => {
          console.log(data.data())
          this.data = data.data()
        })
      console.log(this.data)
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
                  dates: [],
                }
                this.women.push(user)
              })
          })
        })
    },

    showDates(womenUser) {
      const db = window.$nuxt.$fire.firestore
      db.collection('users')
        .doc(this.$fire.auth.currentUser.uid)
        .get()
        .then((e) => {
          console.log(e.data())
        })
    },
    saveDates(w) {
      const uid = this.$fire.auth.currentUser.uid
      const db = window.$nuxt.$fire.firestore
      w.isAccepted = true
      db.collection('users/' + uid + '/requests')
        .doc(w.uid)
        .update({
          dates: w.dates,
          jitsiRoom: uid.substring(0, 8) + '_' + w.uid.substring(0, 8),
          isAccepted: true,
          message: null,
        })
        .then(() => {
          this.submitForm(w)
        })
    },
    submitForm(womenUser) {
      console.log(womenUser)
      const list = JSON.stringify(womenUser.dates)
      console.log(list)
      const db = window.$nuxt.$fire.firestore
      db.collection('users')
        .doc(this.$fire.auth.currentUser.uid)
        .get()
        .then((e) => {
          db.collection('users')
            .doc(womenUser.uid)
            .collection('response')
            .doc(window.$nuxt.$fire.auth.currentUser.uid)
            .set({
              emailNotification:
                'Der Coach ' +
                e.data().firstName +
                ' ' +
                e.data().lastName +
                'hat auf Ihre Anfrage reagiert und schickt ihnen folgende Terminvorschläge: ' +
                list +
                '. Bitte loggen Sie sich auf unserer Plattform ein, um einen Termin auszuwählen.',
              from: db
                .collection('users')
                .doc(window.$nuxt.$fire.auth.currentUser.uid),
              suggestions: womenUser.dates,
            })
        })
      /*
      const data = {
        email: user.email,
        message:
          'Ihnen stehen folgende Terminvorschläge zur Verfügung: ' + list + '.',
      }
      const response = await fetch(this.endpoint, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      console.log('email res: ', response)
      */
    },
  },
}
</script>
