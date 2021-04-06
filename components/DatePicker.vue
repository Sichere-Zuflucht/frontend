<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    min-width="auto"
    top
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">Termin hinzufügen</v-btn>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      scrollable
      :min="today"
      elevation="15"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Schließen </v-btn>
      <v-btn text color="primary" @click="addDates(item.suggestions)">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    item: {},
  },
  data() {
    return {
      menu: false,
      date: '',
      today: this.formatDate(new Date()),
    }
  },
  methods: {
    addDates(d) {
      d.push(this.date)
      this.menu = false
    },
    formatDate(date) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    },
  },
}
</script>
