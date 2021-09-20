<template>
  <div>
    <UtilsBanner url="header-ueber-uns.jpg" />
    <v-sheet color="grey lighten-5"
      ><v-container class="text-center"
        ><h1 class="text-h1 primary--text py-8">
          Sichere Zuflucht – Was ist das?
        </h1>
        <p>
          Wir sind eine digitale Plattform, die Frauen die Möglichkeit gibt,
          sich online zu häuslicher Gewalt beraten zu lassen.
        </p>
        <p class="font-weight-bold">
          anonym – ortsunabhängig – professionell
        </p></v-container
      ></v-sheet
    ><v-container class="text-center"
      ><h2 class="text-h2 secondary--text py-6">
        So entstand Sichere Zuflucht
      </h2>
      <ul style="list-style-type: none" class="font-weight-bold">
        <li>> Corona</li>
        <li>> Lockdown</li>
        <li>> Sorge um die, die zuhause in Gefahr sind</li>
      </ul>
      <p>...</p>
      <h2 class="text-h2 secondary--text pt-18pb-6">So arbeiten wir</h2>
      <p>...</p>
    </v-container>
    <UtilsDonation />
    <v-container class="text-center">
      <h2 class="text-h2 secondary--text py-6">Mach mit!</h2>
      <p>...</p>
      <h2 class="text-h2 secondary--text pt-18pb-6">
        Bleib' auf dem laufenden
      </h2>
      <p>...</p>
      <div class="d-flex flex-wrap justify-center">
        <v-btn
          icon
          href="https://www.facebook.com/sichere.zuflucht"
          target="_blank"
          color="#3b5998"
          ><v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn
          icon
          href="https://twitter.com/SichereZuflucht"
          target="_blank"
          color="#1DA1F2"
          ><v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          icon
          href="https://www.instagram.com/sicherezuflucht/"
          target="_blank"
          color="#C13584"
          ><v-icon>mdi-instagram</v-icon>
        </v-btn>
        <!--<v-btn icon href="https://www.youtube.com/" target="_blank"
          ><v-icon>mdi-youtube</v-icon>
        </v-btn>-->
      </div>
    </v-container>
    <UtilsNews />
  </div>
</template>
