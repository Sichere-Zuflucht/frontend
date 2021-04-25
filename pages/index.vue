<template>
  <div>
    <v-parallax
      src="https://assets-global.website-files.com/5e95aa93bef5360e2788a86e/5e9e9727e2658e68125e8b48_header-berlin.jpg"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 mb-4">Sichere Zuflucht</h1>
          <h4 class="subheading">
            für Frauen und deren Kindern, die zuhause Gewalt erleiden!
          </h4>
          <v-btn to="/login" color="primary">Hilfe erhalten</v-btn>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container class="my-4">
      <v-col>
        <v-row align="center" justify="center">
          <v-sheet class="ma-auto text-center" color="white" elevation="0">
            <h2 class="text-h4 ma-auto">Wir schaffen Zufluchtsorte</h2>
            <p>
              für Gewalt erleidende Frauen und Kinder in der Corona-Krise und
              darüber hinaus. Sichere Zuflucht ist eine Plattform, auf der
              leerstehende Ferienwohnungen, Apartments, Mietwohnungen oder
              Soziale Einrichtungen den Frauenhäusern als Zuflucht angeboten
              werden können.
            </p>
          </v-sheet>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn to="/login" color="secondary"> Frauen unterstützen</v-btn>
        </v-row>
      </v-col>
    </v-container>
  </div>
</template>
