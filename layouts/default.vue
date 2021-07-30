<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app class="secondary" dark fixed>
      <client-only>
        <v-list v-if="loggedIn">
          <div v-if="membership === 'Woman'">
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
                {{ item.title }}
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
                {{ item.title }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-if="membership === 'Coach' && user.public"
              :to="'/berater/' + user.public.uid"
              nuxt
              exact
            >
              <v-list-item-icon>
                <v-icon>mdi-account-edit</v-icon>
              </v-list-item-icon>
              <v-list-item-content> Profil </v-list-item-content>
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
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>
          <v-spacer />
          <v-list-item>
            <v-btn to="/registration/signup" exact nuxt block
              >Registrieren</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn to="/registration/signin" exact nuxt block text
              >Einloggen</v-btn
            >
          </v-list-item>
        </v-list>
      </client-only>
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
        <v-btn v-if="loggedIn && user.public" to="/profile" nuxt exact icon
          ><v-avatar color="primary" size="38"
            ><v-img :src="user.public.avatar" /></v-avatar
        ></v-btn>
      </client-only>
    </v-app-bar>
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
    <v-main style="hyphens: auto" class="pb-6">
      <nuxt />
    </v-main>
    <UtilsFooter></UtilsFooter>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      loggedInWoman: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Übersicht',
          to: '/frauen',
        },
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
        {
          icon: 'mdi-cog',
          title: 'Einstellungen',
          to: '/frauen/settings',
        },
      ],
      loggedInCoach: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Übersicht',
          to: '/beratung',
        },
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
          icon: 'mdi-cog',
          title: 'Einstellungen',
          to: '/beratung/settings',
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
    }
  },
  computed: {
    loginText() {
      return !this.loggedIn ? 'Login' : 'Logout'
    },
    loggedIn() {
      return this.$store.getters['modules/user/isAuthenticated']
    },
    user() {
      return this.$store.getters['modules/user/user']
    },
    membership() {
      return this.$store.getters['modules/user/membership']
    },
  },
  methods: {
    login() {
      this.$router.push('/registration/signup')
    },
    logout() {
      this.$fire.auth.signOut()
      this.$router.push('/')
    },
  },
}
</script>
