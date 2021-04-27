<template>
  <v-card
    elevation="2"
    nuxt
    :ripple="clickable"
    :to="clickable ? '/beratung/' + coach.id : null"
    style="padding: 12px"
  >
    <div class="d-flex" style="padding: 12px">
      <v-avatar color="primary" size="35%"
        ><v-img :src="coach.avatar"
      /></v-avatar>
      <div class="pt-2 px-3">
        <h2 class="secondary--text text-h2">
          {{ coach.firstName }} {{ coach.lastName }}
        </h2>
        <h3 class="accent--text text-h5">
          {{ coach.profession }}
        </h3>
      </div>
    </div>
    <!--
    <v-row>
      <v-col :cols="small ? 12 : 4"
        ><v-card-title :class="small ? 'pa-0' : null"
          ><v-avatar
            color="primary"
            :size="small ? '100%' : 100"
            :height="small ? '120' : null"
            :rounded="small ? 'sm' : false"
            ><v-img :src="coach.avatar" /></v-avatar></v-card-title
      ></v-col>
      <v-col :cols="small ? 12 : 8" class="d-flex flex-column align-center">
        <v-card-title
          ><h2 class="secondary--text">
            {{ coach.firstName }} {{ coach.lastName }}
          </h2></v-card-title
        >
        <v-card-subtitle
          ><h3 class="accent--text">
            {{ coach.info.topicArea }}
          </h3></v-card-subtitle
        >
      </v-col>
    </v-row> -->
    <v-card-text class="pt-0">
      <p class="text-uppercase font-weight-bold mb-1">Fachgebiet</p>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in coach.info.topicArea"
          :key="tag"
          label
          outlined
          color="primary"
          class="mr-1 mb-1"
        >
          {{ tag }}
        </v-chip>
      </div>
      <p class="text-uppercase font-weight-bold mb-1">Themen</p>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in coach.info.topicPoints"
          :key="tag"
          label
          outlined
          color="primary"
          class="mr-1 mb-1"
        >
          {{ tag }}
        </v-chip>
      </div>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in coach.info.languages"
          :key="tag"
          label
          color="secondary"
          class="mr-1 mb-1"
        >
          <v-icon left> mdi-translate </v-icon>{{ tag }}
        </v-chip>
      </div>
    </v-card-text>
    <v-card-text v-if="response">
      <div v-if="!response.acceptedDate">
        <v-row>
          <v-col cols="7">
            <v-select
              v-model="date"
              :items="response.suggestions"
              label="Termin"
              dense
            ></v-select>
          </v-col>
          <v-col cols="5"
            ><v-btn
              color="success"
              :disabled="!date"
              @click="accept(response, date)"
              :loading="acceptLoading"
              :disable="acceptDisable"
              >{{ acceptText }}</v-btn
            ></v-col
          >
        </v-row>
        <v-row class="mb-2"
          ><v-btn plain @click="cancel(response)">Absagen</v-btn
          ><v-spacer /><v-btn plain color="orange">Nachfragen</v-btn>
        </v-row>
      </div>
      <v-alert v-else dark dense color="success"
        >Zugesagt für {{ response.acceptedDate }}</v-alert
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Coaching',
  props: {
    coach: {
      type: Object,
      default: () => {},
    },
    response: null,
    clickable: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
