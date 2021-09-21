<template>
  <v-slide-group v-if="list" show-arrows class="py-4">
    <v-slide-item v-for="(magazine, n) in list" :key="n">
      <MagazineTeaserBox
        :magazine-data="magazine"
        :append-url="append"
        :class="
          (n == 0 ? 'ml-8 mr-2' : n == list.length - 1 ? 'ml-2 mr-8' : 'mx-2') +
          ' my-2'
        "
      />
    </v-slide-item>
  </v-slide-group>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: null,
    },
    append: { type: Boolean, default: false },
  },
}
</script>
