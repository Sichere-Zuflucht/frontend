<template>
  <v-footer
    inset
    app
    class="d-flex flex-column mt-6"
    style="position: relative"
  >
    <v-row class="pa-2 caption" style="width: 100vw"
      ><v-col class="mt-6" cols="12" md="4">
        <v-card
          ><v-card-text
            ><p class="text-center">
              Diese Webseite und ihre Services sind sicher
            </p>
            <v-row
              ><v-col cols="4" class="d-flex flex-column align-center"
                ><v-img
                  class="mb-2"
                  width="30"
                  contain
                  src="ssl-zertifiziert.svg"
                /><b style="line-height: 1em">SSL</b>zertifiziert</v-col
              ><v-col cols="4" class="d-flex flex-column align-center"
                ><v-img
                  class="mb-2"
                  width="30"
                  contain
                  src="serverstandort-deutschland.svg"
                /><b style="line-height: 1em">Serverstandort</b
                >Deutschland</v-col
              ><v-col cols="4" class="d-flex flex-column align-center"
                ><v-img class="mb-2" width="50" contain src="dsgvo.svg" />
                <b style="line-height: 1em">DSGVO</b>konform</v-col
              ></v-row
            ></v-card-text
          ></v-card
        ></v-col
      >
      <v-col class="mt-6" cols="12" md="4">
        <v-card
          ><v-card-text
            ><p class="text-center">Partner</p>
            <v-row
              ><v-col class="d-flex flex-column align-center"
                ><v-img
                  contain
                  max-width="100"
                  src="partner/project-together-logo.png" /></v-col
              ><v-col class="d-flex flex-column align-center"
                ><v-img
                  contain
                  max-width="100"
                  src="partner/solution-enabler.png" /></v-col></v-row></v-card-text></v-card
      ></v-col>
      <v-col class="mt-6" cols="12" md="4">
        <v-card
          ><v-card-text
            ><p class="text-center">Zahlungsanbieter</p>
            <v-img
              contain
              max-width="100"
              src="partner/stripe.png"
              class="mx-auto" /></v-card-text></v-card
      ></v-col>
    </v-row>
    <v-row
      class="
        d-flex
        flex-wrap flex-column flex-sm-row
        align-center
        justify-center
      "
    >
      <div class="d-flex flex-column align-center mt-8">
        <v-icon color="primary">mdi-heart</v-icon>
        <p class="text-uppercase primary--text">du bist nicht allein!</p>
      </div>
      <v-img
        contain
        max-width="60"
        src="android-chrome-512x512.png"
        class="mt-4 mb-8"
      />
      <div class="d-flex flex-wrap flex-column flex-sm-row justify-center">
        <v-btn v-for="(item, i) in footer" :key="i" :to="item.to" text plain
          ><p v-text="item.title"></p
        ></v-btn>
      </div>
    </v-row>
    <v-row
      class="
        d-flex
        flex-wrap flex-column flex-sm-row
        align-center
        justify-center
        pb-4
      "
    >
      <div class="d-flex flex-wrap justify-center">
        <v-btn
          icon
          href="https://www.facebook.com/sichere.zuflucht"
          target="_blank"
          ><v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon href="https://twitter.com/SichereZuflucht" target="_blank"
          ><v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          icon
          href="https://www.instagram.com/sicherezuflucht/"
          target="_blank"
          ><v-icon>mdi-instagram</v-icon>
        </v-btn>
        <!--<v-btn icon href="https://www.youtube.com/" target="_blank"
          ><v-icon>mdi-youtube</v-icon>
        </v-btn>-->
      </div>
      <span class="mt-0 caption"
        >&copy; {{ new Date().getFullYear() }} Sichere Zuflucht gGmbH</span
      >
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      footer: [
        {
          title: 'Impressum',
          to: '/',
        },
        {
          title: 'Datenschutz',
          to: '/',
        },
        {
          title: 'AGB',
          to: '/',
        },
        {
          title: 'Kontakt',
          to: '/',
        },
        {
          title: 'FAQ',
          to: '/',
        },
        {
          title: 'Hilfe',
          to: '/',
        },
      ],
    }
  },
}
</script>
