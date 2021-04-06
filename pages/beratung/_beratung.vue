<template>
  <div v-if="coach">
    <v-img :lazy-src="coach.avatar" :src="coach.avatar"></v-img>
    <h1 class="text-center">{{ coach.firstName }} {{ coach.lastName }}</h1>
    <Coaching :coach="coach" />
    <v-container fluid>
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-header class="pl-0">
            Text hinzufügen
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-textarea
              v-model="message"
              value="Jemand möchte mit Ihnen Kontakt aufnehmen."
              label="persönliche Anfrage schreiben"
            ></v-textarea>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-btn color="primary" @click="sendRequest">Anfragen</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coach: null,
      message: '',
      coachUID: '',
    }
  },
  computed: {
    coachName() {
      return this.coach.firstName + ' ' + this.coach.lastName
    },
  },
  mounted() {
    this.coachUID = this.$route.params.beratung
    this.$nuxt.$fire.firestore
      .collection('users')
      .doc(this.coachUID)
      .get()
      .then((e) => {
        this.coach = e.data()
      })
  },
  methods: {
    sendRequest() {
      console.log('send request')
      this.$nuxt.$fire.functions.httpsCallable('request-sendRequest')({
        coachName: this.coachName,
        message: this.message,
        coachUID: this.coachUID,
      })
    },
  },
}
</script>
