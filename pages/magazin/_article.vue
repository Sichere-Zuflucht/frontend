<template>
  <v-container v-if="pubData">
    <v-card
      >{{ pubData.author.firstName }} {{ pubData.author.lastName }}</v-card
    >
    <div v-html="output"></div>
  </v-container>
</template>

<script>
import { generateHTML } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  data() {
    return {
      pubData: null,
    }
  },
  async fetch() {
    this.pubData = (
      await this.$fire.firestore
        .collection('articles')
        .doc(this.$route.params.article)
        .get()
    ).data()
  },
  fetchOnServer: false,
  computed: {
    output() {
      return generateHTML(JSON.parse(this.pubData.text), [
        StarterKit,
        // other extensions …
      ])
    },
  },
}
</script>
