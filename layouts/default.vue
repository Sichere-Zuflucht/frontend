<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" app class="primary" dark fixed>
      <v-list v-if="loggedIn">
        <v-list-item
          v-for="(item, i) in loggedInUser"
          :key="i"
          :to="item.to"
          nuxt
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <p class="caption ml-4 mb-0">
          {{ user.membership ? user.membership.name : null }}
        </p>
        <div v-if="user.membership ? user.membership.id === 'Woman' : false">
          <v-list-item
            v-for="(item, i) in loggedInWoman"
            :key="i"
            :to="item.to"
            nuxt
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item
            v-for="(item, i) in loggedInCoach"
            :key="i"
            :to="item.to"
            nuxt
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-list-item>
          <v-btn block to="/" @click="logout">Abmelden</v-btn>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item
          v-for="(item, i) in noUser"
          :key="i"
          :to="item.to"
          nuxt
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-spacer />
        <v-list-item>
          <v-btn to="/signup" exact nuxt block>Anmelden</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title class="pa-0"
        ><v-btn to="/" nuxt exact text plain :ripple="false"
          ><v-img contain width="150" src="Sichere-Zuflucht-Logo.svg" /></v-btn
      ></v-toolbar-title>
      <v-spacer />
      <client-only>
        <v-btn v-if="loggedIn" to="/profile" nuxt exact icon
          ><v-avatar color="primary" size="38"
            ><v-img :src="user.avatar" /></v-avatar
        ></v-btn>
      </client-only>
    </v-app-bar>
    <v-main>
      <nuxt class="pb-8" />
    </v-main>
    <v-card
      dark
      color="red"
      width="70"
      style="position: fixed; bottom: 30%; right: 0; z-index: 100"
      href="https://www.chefkoch.de/rs/s0/was+kochen/Rezepte.html"
      tile
    >
      <v-card-text class="pa-1 d-flex flex-column align-center">
        <v-icon small>mdi-eye-off</v-icon>
        <p style="font-size: 10px; line-height: 10px" class="text-center mb-0">
          Seite verstecken
        </p>
      </v-card-text>
    </v-card>
    <v-footer inset absolute app class="d-flex flex-column justify-center mt-6">
      <span class="mt-4"
        >&copy; {{ new Date().getFullYear() }} Sichere Zuflucht gGmbH</span
      >
      <span class="mb-6"
        ><a href="mailto:kontakt@sichere-zuflucht.de"
          >kontakt@sichere-zuflucht.de</a
        ></span
      >
      <div class="d-flex flex-wrap justify-center">
        <v-btn v-for="(item, i) in footer" :key="i" :to="item.to" text plain
          ><p v-text="item.title"></p
        ></v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      loggedInUser: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Übersicht',
          to: '/profile',
        },
      ],
      loggedInWoman: [
        {
          icon: 'mdi-account-box',
          title: 'Beratungen',
          to: '/frauen/findCoach',
        },
        {
          icon: 'mdi-shield-home',
          title: 'Wohnungen',
          to: '/frauen/wohnungssuche',
        },
      ],
      loggedInCoach: [
        {
          icon: 'mdi-credit-card',
          title: 'Bezahlung',
          to: '/beratung/bezahlung',
        },
        {
          icon: 'mdi-shield-check',
          title: 'Verifizierung',
          to: '/beratung/personenverifizierung',
        },
        {
          icon: 'mdi-account-edit',
          title: 'Profil bearbeiten',
          to: '/beratung/registrierung',
        },
      ],
      noUser: [
        {
          title: 'Startseite',
          to: '/',
        },
        {
          title: 'Über uns',
          to: '/',
        },
        {
          title: 'Wie wir helfen',
          to: '/',
        },
        {
          title: 'Wie du helfen kannst',
          to: '/',
        },
        {
          title: 'Aktuelles',
          to: '/',
        },
      ],
      footer: [
        {
          title: 'Presse',
          to: '/',
        },
        {
          title: 'FAQ',
          to: '/',
        },
        {
          title: 'AGB',
          to: '/',
        },
        {
          title: 'Datenschutz',
          to: '/',
        },
        {
          title: 'Impressum',
          to: '/',
        },
      ],
    }
  },
  computed: {
    loginText: (that) => (!that.loggedIn ? 'Login' : 'Logout'),
    loggedIn: (that) => {
      if (process.client)
        return that.$store.getters['modules/user/isAuthenticated']
      return false
    },
    user: (that) => that.$store.getters['modules/user/user'],
    membership() {
      return this.$store.getters['modules/user/membership']
    },
  },
  methods: {
    login() {
      this.$router.push('/signup')
    },
    logout() {
      this.$fire.auth.signOut()
      this.$router.push('/')
    },
  },
}
</script>
