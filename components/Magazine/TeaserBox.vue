<template>
  <v-slide-group v-if="magazineData" show-arrows class="py-4">
    <v-slide-item v-for="(magazine, n) in magazineData" :key="n">
      <v-card
        :class="
          n == 0
            ? 'ml-8 mr-2'
            : n == magazineData.length - 1
            ? 'ml-2 mr-8'
            : 'mx-2'
        "
        width="300"
      >
        <v-img height="200" :src="magazine.cover.url" />
        <v-card-actions>
          <v-avatar style="margin-top: -30px" color="white"
            ><v-icon>{{ magazine.tag.icon }}</v-icon></v-avatar
          ></v-card-actions
        >
        <v-card-text class="flex-column align-start pt-0">
          <h2 class="text-h2 secondary--text pt-0">{{ magazine.title }}</h2>
          <p class="font-weight-bold">
            {{ magazine.subtitle }}
          </p>
          <p class="caption mb-2" style="line-height: 1em">
            von {{ magazine.author }}
          </p></v-card-text
        >
        <v-card-actions class="pt-4"
          ><v-btn
            :to="(appendUrl ? '' : 'magazine/') + magazine.slug"
            :append="appendUrl"
            outlined
            color="primary"
            >zum Eintrag</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-slide-item>
  </v-slide-group>
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
