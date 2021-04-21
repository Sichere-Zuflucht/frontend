<template>
  <div v-if="coach">
    <v-img :lazy-src="coach.avatar" :src="coach.avatar"></v-img>
    <v-container>
      <h1 class="text-center">{{ coach.firstName }} {{ coach.lastName }}</h1>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in coach.info.types"
          :key="tag"
          label
          color="primary"
          class="ma-1"
        >
          <v-icon left> mdi-message </v-icon>{{ tag }}
        </v-chip>
      </div>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in coach.info.languages"
          :key="tag"
          label
          color="secondary"
          class="ma-1"
        >
          <v-icon left> mdi-translate </v-icon>{{ tag }}
        </v-chip>
      </div>
      <v-divider class="my-4"></v-divider>
      <div>
        <h2 class="text-center">Anfrage senden</h2>
        <v-form
          ref="form"
          class="pt-4"
          style="width: 100%"
          @submit="
            (e) => {
              e.preventDefault()
            }
          "
        >
          <v-textarea
            v-if="showAddInfo"
            v-model="message"
            value="Jemand möchte mit Ihnen Kontakt aufnehmen."
            label="persönliche Anfrage schreiben"
          ></v-textarea>
          <div class="d-flex justify-center">
            <v-btn
              v-if="!showAddInfo"
              text
              color="grey"
              class="mx-auto"
              @click="
                () => {
                  showAddInfo = true
                }
              "
              >Text hinzufügen</v-btn
            >

            <v-btn
              color="primary"
              class="mx-auto"
              :loading="loading"
              :disabled="isDisabled"
              @click="sendRequest"
              >{{ buttonText }}</v-btn
            >
          </div>
          <v-alert v-if="showConfirmation" color="success" dark class="mt-4"
            >Deine Nachricht wurde versendet, {{ coachName }} wird sich bei dir
            melden.</v-alert
          >
          <v-alert v-if="error.status" color="error" class="white--text mt-4">{{
            error.message
          }}</v-alert>
        </v-form>
      </div>
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
      showAddInfo: false,
      loading: false,
      isDisabled: false,
      buttonText: 'anfragen',
      showConfirmation: false,
      error: {
        status: false,
        message: '',
      },
    }
  },
  computed: {
    coachName() {
      return this.coach.firstName + ' ' + this.coach.lastName
    },
  },
  mounted() {
    this.coachUID = this.$route.params.beratung
    /* this.$fire.firestore
      .collection('users')
      .doc(this.coachUID)
      .get()
      .then((e) => {
        console.log('result data: ', e)
        this.coach = e.data()
      }) */
    this.$fire.firestore
      .collection('users')
      .doc(this.coachUID)
      .get()
      .then((e) => {
        e.data().verified && e.data().strapi && e.data().info !== false
          ? (this.coach = e.data())
          : this.$router.push('/')
      })
  },
  methods: {
    sendRequest() {
      this.loading = true
      console.log('send request')
      this.$fire.functions
        .httpsCallable('request-sendRequest')({
          coachName: this.coachName,
          message: this.message,
          coachUID: this.coachUID,
        })
        .then(() => {
          this.buttonText = 'versendet'
          this.loading = false
          this.showConfirmation = true
          this.isDisabled = true
        })
        .catch((err) => {
          this.error.status = true
          this.error.message = err.message
        })
    },
  },
}
</script>
