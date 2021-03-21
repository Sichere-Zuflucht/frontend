<template>
  <v-card outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{ coach.firstName }} {{ coach.lastName }}
        </div>
        <v-list-item-title class="mb-1">
          {{ coach.info.topic }}
        </v-list-item-title>
        <v-list-item-subtitle class="mb-1">
          <v-chip-group column active-class="primary--text"
            ><v-chip v-for="tag in coach.info.types" :key="tag">
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="mb-1">
          <v-chip-group column active-class="primary--text"
            ><v-chip v-for="tag in coach.info.languages" :key="tag">
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar size="80" color="grey"
        ><v-img :src="coach.avatar"></v-img
      ></v-list-item-avatar>
    </v-list-item>
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
  },
}
</script>
