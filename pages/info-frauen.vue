<template>
  <div>
    <UtilsBanner url="header-frauen.jpg" />
    <v-sheet color="grey lighten-5"
      ><v-container class="text-center">
        <h1 class="text-h1 primary--text py-8">
          Für dein Leben ohne häusliche Gewalt
        </h1>
        <p>
          <b>Hier bist du richtig.</b> Wir helfen dir in deiner schwierigen
          Situation.
        </p>
        <p>
          Wir sammeln für dich Informationen und Berichte, die dich auf deinem
          Weg in ein Leben ohne Gewalt unterstützen können.
        </p>
        <p>
          Wir wollen, dass du nicht alleine bist!
          <nuxt-link to="berater/suche">Lass dich online beraten.</nuxt-link>
          Dafür stehen dir unsere Coaches*innen und Berater*innen zur Verfügung.
        </p></v-container
      ></v-sheet
    >

    <h1 class="text-h2 secondary--text text-center py-8">
      Sichere Zuflucht Magazin
    </h1>
    <MagazineSlider :list="magazineList" :change="true" />
    <v-container>
      <UtilsBtn text="Zum Magazin" classname="pb-0" />

      <p class="font-weight-bold pt-8 pb-4 text-center">
        Was erlebst du in deinem Alltag. Wir wollen dir helfen, deine Situation
        einzuordnen.
      </p>
      <h2 class="text-h2 text-center secondary--text">
        ... Das ist doch noch keine Gewalt, oder?
      </h2>
      <p>
        <b
          >Betroffenen fällt es oft nicht leicht die Gewalt zu erkennen. Sie
          fängt häufig schleichend an.</b
        >
        Erklärtext, damit sich die Frauen einsortieren können. Lorem ipsum dolor
        sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
        ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p>
      <p class="font-weight-bold">
        Weitere Erfahrungen findest du in unserem Magazin.
      </p>
      <UtilsBtn text="Zum Magazin"
    /></v-container>
    <v-divider />
    <v-container>
      <h2 class="text-h2 text-center secondary--text">
        Du stehst vor der Trennung, hast aber viele Fragen?
      </h2>
      <p class="mb-0">
        <b
          >Wir bieten dir die Möglichkeit deine Fragen von Fachleuten
          beantworten zu lassen.</b
        >
        In unseren Beratungsgesprächen und individuellen Coachings werden dir
        wichtige Fragen wie:
      </p>
      <ul class="py-3">
        <li>Sorgerecht</li>
        <li>Finanzielle Möglichkeiten</li>
        <li>Scheidungsfragen</li>
        <li>Umgang mit dem sozialen Umfeld</li>
      </ul>
      <p>u.v.m zuverlässig beantwortet.</p>
      <UtilsBtn
        text="Sieh dir unsere Beratungsthemen an"
        link="berater/suche"
      />
    </v-container>
    <v-sheet color="grey lighten-5">
      <v-container>
        <h2 class="text-h2 text-center secondary--text pt-4">
          Stimmen von Frauen zu diesem Projekt
        </h2>
      </v-container>
      <v-carousel hide-delimiters height="auto">
        <v-carousel-item v-for="(quote, n) in quotes" :key="n" class="px-4"
          ><v-row
            class="fill-height py-5 px-16 text-center"
            align="center"
            justify="center"
            height="100%"
          >
            <p class="font-italic">"{{ quote.text }}"</p>
            <p class="caption">{{ quote.by }}</p>
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
          text: 'Wenn ich damals die Möglichkeiten gehabt hätte, die diese Plattform bietet, hätte ich den Schritt aus meiner Beziehung nicht er dann gewagt, als es um mein Leben ging!',
          by: 'Jessica V.',
        },
        {
          text: 'Wenn ich damals die Möglichkeiten gehabt hätte, asdf fasdfasdgaksölkfäaö asdfklams asdfläk die diese Plattform bietet, hätte ich den Schritt aus meiner Beziehung nicht er dann gewagt, als es um mein Leben ging!',
          by: 'Maria M.',
        },
        {
          text: 'Wenn ich damals die Möglichkeiten gehabt hätte, die diese Plattform bietet, hätte ich den Schritt aus meiner Beziehung nicht er dann gewagt, als es um mein Leben ging!',
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
