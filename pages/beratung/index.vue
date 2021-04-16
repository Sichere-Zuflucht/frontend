<template>
  <v-container>
    <h1 class="text-h4">Übersicht</h1>
    <span v-if="userName">von {{ userName }}</span>
    <VerificationsAlert />
    <v-divider class="my-2"></v-divider>
    <p class="text-uppercase font-weight-bold">Anfragen:</p>

    <div v-if="women.length != 0">
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
            <v-card class="pa-6" elevation="0">
              <v-card-title>
                <v-col class="mr-2 pa-0" cols="8">
                  <p class="ma-0 caption">Frau</p>
                  <p class="ma-0">{{ item.userName }}</p></v-col
                >
                <v-col cols="3">
                  <v-avatar color="primary" size="56">
                    <v-img
                      :lazy-src="item.avatar"
                      :src="item.avatar"
                      max-height="56"
                      max-width="56"
                    ></v-img>
                  </v-avatar>
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
                          <v-list-item-title class="font-weight-bold"
                            >{{ d }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <v-icon @click="eraseDate(di, item.dates)"
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      women: [],
    }
  },
  computed: {
    userName() {
      return this.user.firstName + ' ' + this.user.lastName
    },
  },
  mounted() {
    const db = window.$nuxt.$fire.firestore
    this.user = this.$store.getters['modules/user/user']
    db.collection('users/' + this.user.uid + '/requests')
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
      const uid = this.user.uid
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
    listToHTML(list) {
      return (
        '<ul>' +
        list
          .map(function (item) {
            return '<li>' + item + '</li>'
          })
          .join('') +
        '</ul>'
      )
    },
    submitForm(womenUser) {
      const db = window.$nuxt.$fire.firestore

      db.collection('users')
        .doc(womenUser.uid)
        .collection('response')
        .doc(window.$nuxt.$fire.auth.currentUser.uid)
        .set({
          subject: `Sichere Zuflucht - Antwort von Coach ${this.userName}`,
          html: `<div style="font-size: 16px;">Hallo,<br><br>
             der Coach ${
               this.userName
             } hat auf Ihre Anfrage reagiert und schickt Ihnen folgende Terminvorschläge:
        <br>
        <span style="font-family: monospace;">${this.listToHTML(
          womenUser.dates
        )}</span>
        <br>
        Bitte loggen Sie sich auf unserer <a href="sichere-zuflucht.de">Plattform</a> ein, um einen Termin auszuwählen.
        <br>
        <br>
        Grüße von unserem engagierten Team.
        </div>`,
          from: db.collection('users').doc(this.user.uid),
          suggestions: womenUser.dates,
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
