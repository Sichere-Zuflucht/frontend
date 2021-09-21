<template>
  <v-container v-if="magazineList">
    <h1 class="text-h1 primary--text text-center">Sichere Zuflucht</h1>
    <h2 class="subtitle-1 secondary--text text-center">Magazin</h2>
    <p class="pt-8 mb-8">
      Wir wollen euch helfen, eure Situation besser einschätzen zu können.
      Deshalb bieten wir euch hier ganz viel Material zum Thema häusliche
      Gewalt.
    </p>
    <div style="position: relative; z-index: 0">
      <div
        style="
          position: sticky;
          top: 50px;
          width: calc(100% + 10px);
          margin-left: -5px;
          padding: 5px;
          padding-top: 15px;
          z-index: 5;
          background-color: white;
        "
      >
        <p class="caption mb-0">Filtern:</p>
        <v-chip-group v-model="tagsSelected" multiple column class="pt-0">
          <v-chip
            v-for="tag in tagList"
            :key="tag.id"
            :value="tag.name"
            outlined
            small
            active-class="primary primary--text"
          >
            {{ tag.name }}</v-chip
          >
        </v-chip-group>
      </div>
      <v-alert v-if="error">{{ error }}</v-alert>
      <div v-else class="pt-8" style="z-index: 1">
        <div
          v-for="magazine in magazineList.filter((m) =>
            tagsSelected != 0
              ? tagsSelected.includes(m.tag.name)
                ? true
                : false
              : true
          )"
          :key="magazine.id"
          class="pb-4"
        >
          <MagazineTeaserBox :magazine-data="magazine" />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      magazineList: null,
      tagList: [],
      tagsSelected: [],
      error: null,
    }
  },
  async mounted() {
    try {
      this.magazineList = await this.$strapi.find('magazines')
      this.tagList = await this.$strapi.find('tags')
    } catch (error) {
      this.error = error
    }
  },
}
</script>
