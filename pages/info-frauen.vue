<template>
  <div>
    <UtilsBanner url="header-frauen.jpg" />
    <v-sheet color="grey lighten-5"
      ><v-container class="text-center">
        <h1 class="text-h1 primary--text pt-8">
          Für dein Leben ohne häusliche Gewalt
        </h1>
        <h2 class="text-h2 secondary--text pb-8">
          HIER BIST DU RICHTIG. WIR HELFEN DIR IN DEINER SCHWIERIGEN SITUATION.
        </h2>
        <p>
          Wir sammeln für dich Informationen und Berichte, die dich auf deinem
          Weg in ein Leben ohne Gewalt unterstützen können.
        </p>
      </v-container></v-sheet
    >

    <h2 class="text-h2 secondary--text text-center pt-16">
      Das Sichere Zuflucht-Magazin
    </h2>
    <MagazineSlider :list="magazineList" :change="true" />
    <v-container class="pb-16 pt-0">
      <UtilsBtn text="Zum Magazin" link="/magazine" classname="pb-0" />
    </v-container>
    <v-divider />
    <v-container class="pb-16">
      <h2 class="text-h2 secondary--text text-center pt-16">
        Nutze unser Hilfsangebot
      </h2>
      <p class="pb-4 text-center">
        Wir wollen, dass du nicht alleine bist. Unsere Berater*innen stehen dir
        mit Ihrer Erfahrung zur Seite. Deine <b>Beratung</b> findet
        <b>sicher, online</b> und <b>anonym</b> statt.
      </p>
    </v-container>
    <CoachingSlider />
    <v-container>
      <UtilsBtn
        text="Unsere Berater*innen"
        link="/berater/suche"
        classname="pb-0"
      />
      <h2 class="text-h2 secondary--text text-center pt-16">
        DU STEHST VOR DER TRENNUNG, HAST ABER VIELE FRAGEN?!
      </h2>
      <p>
        <b
          >Wir bieten dir die Möglichkeit deine Fragen von Fachleuten
          beantworten zu lassen.</b
        ><br />
        In unseren Beratungsgesprächen und individuellen Coachings werden dir
        wichtige Fragen zuverlässig beantwortet, z.B.:
      </p>
      <ul>
        <li>Sorgerecht</li>
        <li>Finanzielle Möglichkeiten</li>
        <li>Scheidungsfragen</li>
        <li>Umgang mit dem sozialen Umfeld</li>
      </ul>
    </v-container>
    <v-container class="py-16">
      <h2 class="text-h2 text-center secondary--text pb-2">
        ... Das ist doch noch keine Gewalt, oder?
      </h2>
      <h3 class="text-h5 text-center primary--text pb-8">
        WAS ERLEBST DU IN DEINEM ALLTAG. WIR WOLLEN DIR HELFEN, DEINE SITUATION
        EINZUORDNEN.
      </h3>
      <p>
        <b
          >Betroffenen fällt es oft nicht leicht die Gewalt zu erkennen.<br />
          Sie fängt häufig schleichend an.</b
        >
        <br />
        Erklärtext, damit sich die Frauen einsortieren können. Lorem ipsum dolor
        sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
        ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p>
      <p>
        Weitere Erfahrungen findest du in unserem
        <nuxt-link to="/magazine">Magazin</nuxt-link>.
      </p>
    </v-container>
    <v-divider />
    <v-sheet color="grey lighten-5">
      <v-container class="pt-12">
        <h2 class="text-h2 text-center secondary--text pt-4">
          Stimmen von Frauen zu diesem Projekt
        </h2>
      </v-container>
      <v-carousel hide-delimiters height="auto" class="pb-12">
        <v-carousel-item v-for="(quote, n) in quotes" :key="n" class="px-4"
          ><v-row
            class="fill-height py-5 px-16 text-center"
            align="center"
            justify="center"
            height="100%"
          >
            <p style="max-width: 500px">
              <i class="font-italic">"{{ quote.text }}"</i><br />
              <span class="caption">{{ quote.by }}</span>
            </p>
          </v-row></v-carousel-item
        ></v-carousel
      >
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      magazineList: null,
      quotes: [
        {
          text: 'Wenn ich damals die Möglichkeiten gehabt hätte, die diese Plattform bietet, hätte ich den Schritt aus meiner Beziehung nicht erst dann gewagt, als es um mein Leben ging!',
          by: 'Jessica V.',
        },
        {
          text: 'Wenn ich damals die Möglichkeiten gehabt hätte, asdf fasdfasdgaksölkfäaö asdfklams asdfläk die diese Plattform bietet, hätte ich den Schritt aus meiner Beziehung nicht erst dann gewagt, als es um mein Leben ging!',
          by: 'Maria M.',
        },
        {
          text: 'Wenn ich damals die Möglichkeiten gehabt hätte, die diese Plattform bietet, hätte ich den Schritt aus meiner Beziehung nicht erst dann gewagt, als es um mein Leben ging!',
          by: 'Sarah R.',
        },
      ],
    }
  },
  async mounted() {
    this.magazineList = await this.$strapi.find('magazines')
  },
}
</script>
