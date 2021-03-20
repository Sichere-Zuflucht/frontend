<template>
  <div>
    <h1>Hallo {{ name }}</h1>
    <div v-for="(item, i) in women" :key="i">
      <v-card elevation="2" class="pa-6">
        <v-card-title>
          <v-column>
            <v-avatar color="primary" size="56">img</v-avatar>
          </v-column>
          <v-column class="ml-2"> {{ item.womennumber }} </v-column>
        </v-card-title>
        <v-card-text>{{ item.cardtext }}</v-card-text>
        <v-card-actions class="d-inline-flex"
          ><v-btn color="success">Zusagen</v-btn></v-card-actions
        >
        <v-card-actions class="d-inline-flex"
          ><v-btn>Absagen</v-btn></v-card-actions
        >
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '{name}',
      women: [
        {
          womennumber: '{f-nummer}',
          cardtext: '{some text}',
        },
        {
          womennumber: '{f-nummer}',
          cardtext: '{some text}',
        },
        {
          womennumber: '{f-nummer}',
          cardtext: '{some text}',
        },
        {
          womennumber: '{f-nummer}',
          cardtext: '{some text}',
        },
      ],
    }
  },
}
</script>
