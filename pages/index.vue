<template>
  <div class="my-4">
    <v-container class="py-md-16">
      <h1 class="text-h1 mb-4 text-center primary--text">
        Niemand muss <br />häusliche Gewalt aushalten.
      </h1>
      <h2 class="text-center secondary--text subtitle-1 mb-8">Auch du nicht</h2>
      <p class="text-center mx-auto" style="max-width: 530px">
        Wir bieten <b>Frauen und ihren Kindern aus Gewaltbeziehungen</b> Hilfe
        in Form einer persönlichen Online-Beratung und eine sichere Zuflucht an.
      </p>
    </v-container>
    <v-img src="paige-cody-bOVZ_f3fbQM-unsplash.jpg" max-height="300px"></v-img>
    <v-sheet color="grey lighten-5"
      ><v-container>
        <h3 class="text-uppercase mb-4 text-center primary--text">
          Wir helfen dir!<br /><span
            class="secondary--text"
            style="font-size: 3em; line-height: 1em"
            >JETZT!</span
          >
        </h3>
        <p class="text-center error--text font-weight-bold">
          "Wir lassen dich mit deinen Erlebnissen nicht allein."
        </p>
        <SharedServiceOverview />
      </v-container>
    </v-sheet>
    <v-container>
      <h3
        class="text-h3 text-uppercase text-center secondary--text pt-8"
        style="font-weight: bold"
      >
        Sichere Zuflucht <br />Magazin
      </h3>
    </v-container>
    <MagazineSlider :list="magazineList" :change="true" />
    <v-divider />
    <v-container class="pt-16">
      <v-row style="max-width: 700px" class="mx-auto">
        <v-col cols="12" md="12">
          <v-card class="mx-auto" max-width="320">
            <v-img src="AdobeStock_342417877.jpeg" height="200px"></v-img>

            <v-card-text
              ><h3 class="text-h3 primary--text font-weight-bold mb-2">
                Werden Sie ein Teil von Sichere Zuflucht
              </h3>
            </v-card-text>

            <v-card-subtitle>
              Wir erweitern permanent unseren Pool an Berater*innen und freuen
              uns über alle, die
              <b>Frauen und ihre Kinder aktiv unterstützten</b> wollen. Im
              Besonderen suchen wir nach engagierten
              <b
                >Psycholog*innen, Psychotherapeut*innen, Coach*innen,
                Ärzt*innen, Anwält*innen</b
              >
              zu Ehe-Themen, <b>Sozialarbeiter*innen</b> aber auch
              <b>Frauen</b>, die es geschafft haben, sich aus ihrer
              <b>gewaltvollen Beziehung zu befreien</b>
              und nun anderen helfen möchten.
              <v-btn color="primary mt-8 mb-1" to="registration/signup">
                Als Berater*in registrieren
              </v-btn>
              <v-btn
                to="info-berater"
                text
                class="pl-1 text-decoration-underline caption"
                >mehr erfahren</v-btn
              >
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" style="display: none">
          <v-card class="mx-auto" max-width="320">
            <v-img
              src="gleren-meneghin-VSLPOL9PwB8-unsplash.jpg"
              height="200px"
            ></v-img>

            <v-card-title class="text-h3 primary--text font-weight-bold mb-2"
              >Liebe Unterkunfsbesitzer*innen, helfen Sie mit!
            </v-card-title>

            <v-card-subtitle>
              Vermieten Sie Ihr Ferienhaus, -wohnung, -bungalow was auch immer –
              neben der touristischen Vermietung und helfen Sie so aktiv mit,
              Frauen und Kinder aus Gewaltsituationen heraus zu holen. Wir
              freuen uns auch besonders über dauerhafte Angebote wie
              Mietwohnungen.
              <v-btn
                color="primary my-4"
                href="mailto:kontakt@sichere-zuflucht.de"
              >
                Ich biete meine Unterkunft an
              </v-btn>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      magazineList: null,
    }
  },
  async mounted() {
    this.magazineList = await this.$strapi.find('magazines')
  },
}
</script>
