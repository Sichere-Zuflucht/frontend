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
        <v-btn
          v-if="loggedIn && user.public"
          :to="membership === 'Coach' ? '/beratung' : '/frauen'"
          nuxt
          exact
          icon
          plain
        >
          <v-avatar v-if="membership === 'Coach'" size="38"
            ><v-img v-if="user.public.avatar" :src="user.public.avatar" />
            <SharedCoachIcon
              v-else
              color="#b3b3b3"
              style="border: 1px solid #000"
              class="pa-2"
            /> </v-avatar
        ></v-btn>
      </client-only>
    </v-app-bar>
    <v-card
      dark
      color="red"
      width="70"
      style="position: fixed; bottom: 50px; right: 0; z-index: 100"
      href="https://www.brigitte.de/"
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
    <div class="d-flex flex-column align-center my-8">
      <v-icon color="primary">mdi-heart</v-icon>
      <p class="text-uppercase primary--text">du bist nicht allein!</p>
    </div>
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
          to: '/berater/suche',
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
          title: 'Magazin',
          to: '/magazine',
        },
        {
          title: 'Über uns',
          to: '/ueber-uns',
        },
        {
          title: 'Wie wir helfen',
          to: '/info-frauen',
        },
        {
          title: 'Wie du helfen kannst',
          to: '/info-berater',
        },
        {
          title: 'Spenden',
          to: '/spenden',
        },
        {
          title: 'Aktuelles',
          to: '/aktuelles',
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
