<template>
  <div>
    <UtilsBanner url="AdobeStock_342417877.jpeg" />
    <v-container class="py-md-16">
      <div class="text-center">
        <h1 class="text-h1 primary--text">
          Werden Sie Teil von Sichere Zuflucht!
        </h1>
        <p class="caption">
          Unsere Plattform ermöglicht Frauen in Gewaltbeziehungen sich anonym
          Beratung zu holen – sicher, schnell, anonym und deutschlandweit.
        </p>
        <UtilsBtn text="Ja, ich möchte beraten" link="registration/signup" />
        <h2 class="text-h2 secondary--text">
          Warum brauchen gewaltbetroffene Frauen Ihre Unterstützung?
        </h2>
        <h3 class="text-h3 primary--text text-uppercase py-4">Die Fakten:</h3>
      </div>
      <v-row
        ><v-col cols="12" md="7" class="text-center">
          <v-row
            ><v-col cols="12" sm="6"
              ><v-img src="jede-dritte-frau.jpg" />
              <p class="caption pt-2 mb-8">
                Jede 3. Frau ist betroffen! <br />D.h. jeder von uns kennt
                mindestens EINE.
              </p>
            </v-col>
            <v-col cols="12" sm="6">
              <v-img src="diagramm.jpg" />
              <p class="caption pt-2 mb-8">
                Quelle:
                <a
                  href="https://www.bmfsfj.de/bmfsfj/service/publikationen/gewalt-gegen-frauen-in-paarbeziehungen-80614"
                  target="_blank"
                  >"Gewalt gegen Frauen in Paarbeziehungen”</a
                >
                vom BMFSFJ. Frauenhäuser und Beratungsangebote melden seit
                Jahren, dass sie der Nachfrage nicht gerecht werden können.
              </p>
            </v-col></v-row
          >
        </v-col>
        <v-col cols="12" md="5">
          <ul class="secondary--text">
            <li>
              <p class="black--text">
                Häusliche Gewalt ist immer noch ein weit verbreitetes
                gesellschaftliches Problem mit
                <b>großem Stigma und hoher Dunkelziffer.</b>
              </p>
            </li>
            <li>
              <p class="black--text">
                <span v-html="readmoreText.slice(0, length)"></span>
                {{ length != readmoreText.length ? '...' : '' }}
              </p>
              <v-btn
                v-if="length != readmoreText.length"
                plain
                color="primary"
                class="pl-0"
                @click="length = readmoreText.length"
                ><u>weiterlesen</u></v-btn
              >
            </li>
          </ul></v-col
        ></v-row
      >
    </v-container>
    <v-divider />
    <v-container>
      <h2 class="text-h2 secondary--text text-center py-8">
        An wen richtet sich Sichere Zuflucht?
      </h2>
      <p class="text-center pb-8 mx-auto" style="max-width: 600px">
        Jede von Gewalt betroffene Frau – <b>egal</b> in welchem <b>Alter</b>,
        welcher <b>Herkunft</b> oder <b>Religion</b>, unabhängig von
        <b>Bildungsstand</b> und <b>Einkommen</b> – verdient ein für sie leicht
        erreichbares <b>Unterstützungsangebot.</b>
      </p>
      <v-row
        ><v-col cols="12" md="6">
          <v-row
            ><v-col
              v-for="(user, i) in users"
              :key="i"
              cols="6"
              sm="4"
              class="pa-1"
            >
              <v-card>
                <v-img :src="user.src" />
                <v-card-text class="text-center">
                  <p class="subtitle-2 primary--text mb-1">{{ user.name }}</p>
                  <p class="caption mb-0">{{ user.job }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <p class="caption pt-3 text-center">
            Diese Frauen und Kinder stehen beispielhaft für die Vielfalt aller
            betroffenen.
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <ul class="secondary--text mt-8">
            <li>
              <p class="black--text">
                Frauen mit einem höheren Bildungshintergrund, Erfolg im Beruf
                und eigenem Einkommen – die also
                <b>fest im Leben stehen und sozial integriert</b> sind –
                <b
                  >schrecken häufig vor ihnen bekannten Hilfsangeboten
                  zurück.</b
                >
              </p>
            </li>
            <li>
              <p class="black--text">
                Aufgrund ihres <b>Schamgefühls</b> fällt es ihnen besonders
                schwer Unterstützung in Frauenhäusern zu suchen oder sich an
                lokale Hilfsangebote zu wenden.
              </p>
            </li>
            <li>
              <p class="black--text">
                <b>Sichere Zuflucht</b> hat es sich zur Aufgabe gemacht diesen
                Frauen eine für sie <b>passende Unterstützung</b> anzubieten.
              </p>
            </li>
          </ul>
        </v-col></v-row
      >
    </v-container>
    <v-divider />
    <v-container>
      <h2 class="text-h2 text-center secondary--text pt-8">Themenbereiche</h2>
      <h3 class="text-h3 text-center primary--text text-uppercase pt-2 pb-8">
        wo können Sie mit Ihren Kompetenzen beraten?
      </h3>
      <p class="font-weight-bold mb-2">Coaching</p>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem i
      </p>
      <p class="font-weight-bold mb-2 mt-8">Psychologische Beratung</p>
      <p>
        Haben Sie Erfahrungen in der Beratung von gewaltbetroffen Frauen oder
        Frauenspezifischen Themen? Kennen Sie die Grundmuster von
        Partnerschaftsgewalt und Gewaltdynamiken? Sind sie aufgrund ihres
        beruflichen Hintergrundes in der Lage misshandelte Frauen zu
        unterstützen sich aus ihrer Situation zu befreien?
      </p>
      <p class="font-weight-bold mb-2 mt-8">Rechtsberatung</p>
      <p>Sind sie Anwalt/Anwältin im Bereich Familienrecht?</p>
    </v-container>
    <v-divider />
    <v-container>
      <h3 class="text-h2 primary--text py-8 text-center">
        so laufen Terminfindung und Beratung ab
      </h3>
      <v-row
        ><v-col v-for="(step, k) in steps" :key="k" cols="12" md="3">
          <v-card>
            <v-sheet color="primary" class="pa-4"
              ><v-icon color="white">{{ step.icon }}</v-icon></v-sheet
            >
            <v-card-title class="font-weight-bold primary--text pt-4 mb-0">
              {{ step.title }}
            </v-card-title>
            <v-card-text class="caption pb-8">
              {{ step.text }}
            </v-card-text>
          </v-card>
        </v-col></v-row
      >
      <UtilsBtn text="Ja, ich möchte beraten" link="registration/signup" />
    </v-container>
    <v-divider />
    <v-container>
      <h2 class="text-h2 secondary--text text-center py-8">
        Fragen und Antworten
      </h2>
      <v-expansion-panels class="mb-8"
        ><v-expansion-panel v-for="(faq, i) in faqs" :key="i">
          <v-expansion-panel-header
            class="font-weight-bold"
            style="line-height: 1.2em"
          >
            {{ faq.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ faq.content }}
          </v-expansion-panel-content>
        </v-expansion-panel></v-expansion-panels
      >
    </v-container>
    <v-sheet color="grey lighten-5 pt-8">
      <v-container>
        <h3 class="text-h2 text-uppercase text-center primary--text mb-0">
          Wir würden uns sehr freuen, wenn sie teil <br />unseres Berater*innen
          Pools werden! <br /><br />Vielen Dank für ihr Engagement!
        </h3>
        <UtilsBtn text="Ja, ich möchte beraten" link="registration/signup" />
      </v-container>
    </v-sheet>
    <UtilsDonation />
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        {
          icon: 'mdi-login',
          title: '1. Registrieren',
          text: 'Um mit der beratenden Person Kontakt aufzunehmen, registriert sich die Frau auf unserer Plattform.',
        },
        {
          icon: 'mdi-account-search',
          title: '2. Beratung suchen',
          text: 'Die Frau sucht sich eine passende Beratung aus und schreibt innerhalb unseres Portals eine Nachricht an die beratende Person.',
        },
        {
          icon: 'mdi-message-text',
          title: '3. Bezahlen',
          text: 'Der/die Berater*in schickt der Frau 3 Terminvorschläge. Mit der Annahme eines Termins bezahlt die Frau die Beratung.',
        },
        {
          icon: 'mdi-calendar-check',
          title: '4. Loslegen',
          text: 'Nach der Bezahlung steht der Zugang zur online Beratung für den gewünschten Termin im eingeloggten Bereich zur Verfügung.',
        },
      ],
      length: 175,
      readmoreText:
        'Eine EU-weite Dunkelfeld-Erhebung hat ergeben, dass<b> 22% der Frauen</b>, die in einer Beziehung mit einem Mann sind oder waren, <b>körperliche Gewalt</b> erfahren haben und das dass zwei von fünf Frauen <b>(43 %)</b> einer Form<b> psychischer Gewalt</b> entweder durch den derzeitigen oder einen früheren Partner ausgesetzt waren. Die Studie “Gewalt gegen Frauen in Paarbeziehungen” vom BMFSFJ zeigt identische Zahlen und Faktenauf. Frauenhäuser und fachspezifische Beratung sind ein essenzieller Teil der Lösung, um diesem Missstand entgegen zu wirken. Aber sie reichen nicht aus. Die Angebote sind regional sehr unterschiedlich. Frauenhäuser und Beratungsstellen bieten ausschließlich lokale Lösungen an – aber das Thema Gewalt bedarf mitunter der Anonymität, die im lokalen Umfeld nicht zuverlässig gegeben ist. Die vorhandenen Online-Angebote zu diesem Thema zielen meist auf Bekanntmachung bestehender Beratungs-Angebote wie z.B. Hotlines ab. Sie bieten nur selten direkt Unterstützung in digitaler Form an.',
      faqs: [
        {
          title:
            'Warum kosten alle Beratungen, unabhängig vom Thema, einheitlich 50€?',
          content: 'Lorem Ipsum',
        },
        {
          title: 'Sichere Zuflucht behält einen prozentualen Anteil. Warum?',
          content: 'Lorem Ipsum',
        },
        {
          title: 'Wie läuft das mit der Bezahlung ab',
          content: 'Lorem Ipsum',
        },
        {
          title: 'Wie ist das mit dem Datenschutz während der Online-Beratung?',
          content: 'Lorem Ipsum',
        },
        {
          title: 'Wer oder was ist RED?',
          content: 'Lorem Ipsum',
        },
        {
          title: 'Wie läuft die Terminfindung ab?',
          content: 'Lorem Ipsum',
        },
        {
          title: 'Mit welcher Auslastung ist erstmal zu rechnen?',
          content: 'Lorem Ipsum',
        },
        {
          title:
            'Wie kann ich meine Leistungen für Sichere Zuflucht steuerlich abrechnen?',
          content: 'Lorem Ipsum',
        },
        {
          title:
            'Ich bin begeistert von diesem Projekt. Kann ich meine Beratung auch erstmal kostenlos anbieten?',
          content: '',
        },
      ],
      users: [
        {
          src: 'beispiel-frau-1.jpg',
          name: 'Katrin (30) + Leni (3) ',
          job: 'Krankenschwester ',
        },
        {
          src: 'beispiel-frau-2.jpg',
          name: 'Heidi (73) ',
          job: 'Rentnerin ',
        },
        {
          src: 'beispiel-frau-3.jpg',
          name: 'Angelika (43) ',
          job: 'Anwältin ',
        },
        {
          src: 'beispiel-frau-4.jpg',
          name: 'Nasrin (17) ',
          job: 'Abiturientin',
        },
        {
          src: 'beispiel-frau-5.jpg',
          name: 'Sanya (34) + Sam (8) ',
          job: 'Köchin ',
        },
        {
          src: 'beispiel-frau-6.jpg',
          name: 'Llian (29) + Xi (4)',
          job: 'Sekretärin',
        },
      ],
    }
  },
}
</script>
