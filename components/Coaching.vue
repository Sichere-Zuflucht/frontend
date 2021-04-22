<template>
  <v-card
    outlined
    @click="clickable ? $router.push('/beratung/' + coach.id) : null"
  >
    <v-row>
      <v-col cols="8">
        <v-card-title>
          {{ coach.firstName }} {{ coach.lastName }}
        </v-card-title>
        <v-card-subtitle>{{ coach.info.topicArea }}</v-card-subtitle>
      </v-col>
      <v-col cols="4"
        ><v-card-title style="float: right"
          ><v-avatar color="primary" size="56"
            ><v-img :src="coach.avatar" /></v-avatar></v-card-title></v-col
    ></v-row>
    <v-card-text>
      <v-chip-group label column
        ><v-chip
          v-for="tag in coach.info.topicPoints"
          :key="tag"
          label
          color="primary"
        >
          <v-icon left> mdi-message </v-icon>{{ tag }}
        </v-chip>
      </v-chip-group>
      <v-chip-group column
        ><v-chip
          v-for="tag in coach.info.languages"
          :key="tag"
          label
          color="secondary"
        >
          <v-icon left> mdi-translate </v-icon>{{ tag }}
        </v-chip>
      </v-chip-group>
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
    clickable: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
