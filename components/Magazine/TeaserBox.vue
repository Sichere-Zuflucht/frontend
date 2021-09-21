<template>
  <v-card v-if="magazineData" width="300">
    <v-img height="200" :src="magazineData.cover.url" />
    <v-card-actions>
      <v-avatar style="margin-top: -30px" color="white"
        ><v-icon>{{ magazineData.tag.icon }}</v-icon></v-avatar
      ></v-card-actions
    >
    <v-card-text class="flex-column align-start pt-0">
      <h2 class="text-h2 secondary--text pt-0">{{ magazineData.title }}</h2>
      <p class="font-weight-bold">
        {{ magazineData.subtitle }}
      </p>
      <p class="caption mb-2" style="line-height: 1em">
        von {{ magazineData.author }}
      </p></v-card-text
    >
    <v-card-actions class="pt-4"
      ><v-btn
        :to="(appendUrl ? '' : 'magazine/') + magazineData.slug"
        :append="appendUrl"
        :exact="findSolution"
        outlined
        color="primary"
        >zum Eintrag</v-btn
      ></v-card-actions
    >
  </v-card>
</template>

<script>
export default {
  props: {
    magazineData: {
      type: Object,
      default: null,
    },
    appendUrl: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
