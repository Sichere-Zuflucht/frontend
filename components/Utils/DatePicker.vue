<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        :color="item.suggestions.length < 3 ? 'success' : null"
        prepend-icon="mdi-calendar"
        v-on="on"
        >Termin hinzufügen</v-btn
      >
    </template>
    <v-date-picker v-model="date" :min="today" scrollable>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="time"
        label="Uhrzeit"
        type="time"
        :disabled="!date"
        outlined
        hide-details
        full-width
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Abbrechen </v-btn>
      <v-btn
        :disabled="!time"
        color="primary"
        @click="addDates(item.suggestions)"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
  <!-- <v-menu
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
  </v-menu> -->
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
      time: '',
      modal: false,
      today: new Date().toISOString().substr(0, 10),
    }
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' – ')
    },
  },
  methods: {
    addDates(d) {
      // $refs.dialog.save(date)
      d.push({
        date: this.date,
        time: this.time,
      })
      this.date = ''
      this.time = ''
      // this.menu = false
      this.$refs.dialog.save()
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
