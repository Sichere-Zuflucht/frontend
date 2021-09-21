<template>
  <div>
    <UtilsBanner url="teaser-spenden.jpg" />
    <v-sheet color="grey lighten-5"
      ><v-container class="text-center">
        <h1 class="text-h1 primary--text py-8">
          Ihr könnt die Frauen ganz direkt unterstützen
        </h1>
        <p>
          Häufig <b>möchte man gerne helfen</b>, weiß aber nicht genau wie. So
          geht es uns auch oft. Deshalb haben wir die Möglichkeit geschaffen,
          dass ihr unseren <b>Frauen direkt helfen</b> könnt, indem ihr z.B.
          <b>für ein Beratungsgespräch spendet.</b>
        </p>
      </v-container></v-sheet
    >
    <v-container>
      <h2 class="text-h2 text-center secondary--text py-6">
        Hier könnt ihr wählen, wie ihr unterstüzen wollt.
      </h2>
      <v-slider
        v-model="donationAmount"
        step="0.05"
        max="1"
        min="0.1"
        ticks
        thumb-label
      ></v-slider>

      <div class="ma-auto" style="width: 130px">
        <v-text-field
          v-model="toPay"
          append-icon="€"
          hide-details
          class="text-h1 secondary--text text-center"
        >
        </v-text-field>
      </div>
      <h3 class="text-h3 secondary--text text-center pt-2">
        entspricht {{ equals }} Stunde Beratung
      </h3>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      donationAmount: 0.75,
      donationPrice: 50,
      toPay: 37.5,
      equals: 0.75,
    }
  },
  watch: {
    donationAmount() {
      const calc = this.donationAmount * this.donationPrice
      return (this.toPay = calc.toFixed(2))
    },
    toPay() {
      const calc = this.toPay / this.donationPrice
      return (this.equals = calc.toFixed(2))
    },
  },
}
</script>
