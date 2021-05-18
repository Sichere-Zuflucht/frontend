<template>
  <v-container>
    <h1 class="text-h1 primary--text mb-4">Wohnungssuche</h1>
    <Verification />
    <v-form ref="housing" class="mb-8">
      <h2 class="text-h2 secondary--text">Deine Daten sind sicher</h2>
      <p>
        Deine Angaben werden nur von uns eingesehen. Wir werden für dich
        passende Wohnungen suchen und dir maximal 3 Vorschläge geben.
      </p>
      <v-row>
        <v-col cols="9" md="7">
          <v-text-field
            v-model="location"
            type="name"
            label="*Ort der Unterkunft"
            prepend-icon="mdi-map-marker"
          ></v-text-field>
        </v-col>
        <v-col cols="3" md="5">
          <v-text-field v-model="plz" type="name" label="*Plz."></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="personAmount"
            type="number"
            label="*Anzahl Personen"
            prepend-icon="mdi-account-group"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="price"
            type="number"
            label="*Preis"
            prepend-icon="mdi-currency-eur"
          >
            <v-sheet slot="append" class="d-flex grey--text pt-1"
              >/Monat</v-sheet
            ></v-text-field
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="dates"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Einzugsdatum"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              range
              scrollable
              :min="new Date().toISOString().substr(0, 10)"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Abbrechen
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(dates)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-divider class="py-4" />
      <p>
        <v-icon class="pr-2">mdi-checkbox-multiple-marked-outline</v-icon
        >Zusätzliche Einrichtungen
      </p>
      <v-row class="pl-8">
        <v-col v-for="(check, i) in checkboxes" :key="i" cols="6">
          <v-checkbox
            v-model="selected"
            :label="check.label"
            :value="check.value"
          />
        </v-col>
      </v-row>
      <v-divider class="py-4" />
      <v-row>
        <v-col cols="12">
          <v-textarea
            outlined
            label="Weitere Informationen"
            placeholder="Ergänze hier mit wichtigen Infos, Hinweisen, Wünschen oder Anliegen deinerseits."
            prepend-icon="mdi-comment"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn right absolute color="primary">Anfragen</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      location: '',
      personAmount: '',
      plz: '',
      rules: {
        email: (v) => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: (len) => (v) =>
          (v || '').length >= len ||
          `Invalid character length, required ${len}`,
        password: (v) =>
          !!(v || '').match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: (v) => !!v || 'This field is required',
      },
      dates: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],
      modal: false,
      selected: [],
      checkboxes: [
        {
          label: 'Türspion',
          value: 'door spion',
        },
        {
          label: 'Barrierefrei',
          value: 'barrier free',
        },
        {
          label: 'Sprechanlage',
          value: 'door speaker',
        },
        {
          label: 'Nichtraucher',
          value: 'non-smoker',
        },
        {
          label: 'Kein Erdgeschoss',
          value: 'no ground',
        },
        {
          label: 'Internet/W-Lan',
          value: 'internet',
        },
        {
          label: 'separater Eingang',
          value: 'second door',
        },
        {
          label: 'Öffentliche Verkehrsmittel',
          value: 'public transport',
        },
      ],
    }
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },
}
</script>
