<template>
  <v-card
    v-if="magazineData"
    width="300"
    height="93%"
    class="d-flex flex-column"
  >
    <v-img
      height="200"
      :src="magazineData.cover.url"
      class="flex-grow-0 flex-shrink-1"
    />
    <v-card-actions>
      <v-avatar style="margin-top: -30px" color="white"
        ><v-icon>{{ magazineData.tag.icon }}</v-icon></v-avatar
      ></v-card-actions
    >
    <v-card-text class="flex-column align-start pt-0 flex-grow-1 flex-shrink-0">
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
        :to="(changeUrl ? 'magazine/' : '') + magazineData.slug"
        :append="appendUrl"
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
      default: false,
    },
    changeUrl: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
