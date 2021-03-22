<template>
  <div>
    <h1>
      Hallo <span v-if="data">{{ data.firstName }} {{ data.lastName }}</span>
    </h1>
    <VerificationsAlert />
    <v-divider class="my-2"></v-divider>
    <p class="text-uppercase font-weight-bold">Anfragen:</p>
    <div v-if="women">
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in women" :key="i">
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
              v-else-if="item.isAccepted"
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
            <v-card elevation="0" class="pa-6">
              <v-card-title>
                <v-col class="mr-2 pa-0" cols="8">
                  <p class="ma-0 caption">Frau</p>
                  <p class="ma-0">{{ item.userName }}</p></v-col
                >
                <v-col cols="3">
                  <v-avatar color="primary" size="56"
                    ><v-img
                      :lazy-src="item.avatar"
                      max-height="56"
                      max-width="56"
                      :src="item.avatar"
                    ></v-img
                  ></v-avatar>
                </v-col>
              </v-card-title>
              <v-card-text>{{ item.message }}</v-card-text>
              <v-card-actions class="d-inline-flex">
                <div v-if="!item.isAccepted">
                  <v-divider></v-divider>

                  <v-list>
                    <v-list-item-group>
                      <v-list-item v-for="(d, di) in item.dates" :key="di">
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">{{
                            d
                          }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <v-icon @click="eraseDate(di, item.dates)"
                            >mdi-close</v-icon
                          >
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                  <DatePicker :item="item" />
                  <p class="mt-2 pa-2 caption">
                    Bitte füge mind. 3 Termine hinzu.
                  </p>
                  <v-btn
                    v-if="item.dates.length >= 3"
                    color="success"
                    @click="saveDates(item)"
                    >Zusagen
                  </v-btn>
                </div>

                <div v-else-if="item.acceptedDate">
                  <p class="caption">Bestätigter Termin</p>
                  <b>{{ item.acceptedDate }} </b>
                  <v-divider></v-divider>
                  <v-btn
                    color="success"
                    class="my-2"
                    :href="'https://meet.jit.si/' + item.jitsiRoom"
                    >zum Jitsi Videocall</v-btn
                  ><v-btn
                    color="primary"
                    class="my-2"
                    outlined
                    href="https://arzt.redmedical.de/#/auth/login"
                    >zum RED Videocall</v-btn
                  >
                </div>

                <v-banner v-else
                  ><v-btn @click="show(item)">{{ item.acceptedDate }} </v-btn>Es
                  wurde noch kein Termin bestätigt...</v-banner
                ></v-card-actions
              >
              <v-card-actions class="d-inline-flex"
                ><v-btn plain class="caption"
                  >Frau absagen</v-btn
                ></v-card-actions
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
    const uid = this.$store.state.user.uid
    const db = window.$nuxt.$fire.firestore
    db.collection('users')
      .doc(uid)
      .get()
      .then((data) => {
        console.log(data.data())
        this.data = data.data()
      })
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
                acceptedDate: subDoc.data().acceptedDate,
                dates: [],
              }
              this.women.push(user)
            })
        })
      })
  },
  methods: {
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
    eraseDate(d, list) {
      const d2 = d + d
      d === 0 ? list.splice(d) : list.splice(d, d2)
    },
    show(e) {
      console.log(this.women)
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
