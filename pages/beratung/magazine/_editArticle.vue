<template>
  <div v-if="pubData">
    <client-only>
      <v-sheet color="secondary d-flex justify-center">
        <v-icon size="60" class="pa-12" color="white"
          >mdi-note-plus-outline</v-icon
        >
      </v-sheet>
      <v-container>
        <h1 class="h1-text primary--text">Blogeintrag</h1>

        <tiptap
          :placeholder="
            pubData.text
              ? JSON.parse(pubData.text)
              : '<h1>Neuer Artikel</h1><p>Hier entsteht ein neuer Artikel</p>'
          "
          :data="pubData"
          :routeid="$route.params.editArticle"
        />
      </v-container>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pubData: null,
      defaultText:
        '<h1>Neuer Artikel</h1><p>Hier entsteht ein neuer Artikel</p>',
    }
  },
  async fetch() {
    this.pubData = (
      await this.$fire.firestore
        .collection('articles')
        .doc(this.$route.params.editArticle)
        .get()
    ).data()
  },
  fetchOnServer: false,
}
</script>
