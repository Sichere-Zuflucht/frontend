<template>
  <v-app light>
    <client-only>
      <v-navigation-drawer v-model="drawer" app class="primary" dark>
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
            <v-btn block to="signup">Anmelden</v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </client-only>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title class="pa-0"
        ><v-img contain width="150" src="Sichere-Zuflucht-Logo.svg"
      /></v-toolbar-title>
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
    <v-footer
      :absolute="true"
      app
      class="d-flex flex-column justify-center mt-6"
    >
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
          to: '/',
        },
        {
          icon: 'mdi-account-box',
          title: 'Mein Profil',
          to: '/profile',
        },
        {
          icon: 'mdi-email',
          title: 'Mein Postfach',
          to: '/profile',
        },
        {
          icon: 'mdi-comment-account',
          title: 'Meine Beratungen',
          to: '/profile',
        },
        {
          icon: 'mdi-credit-card',
          title: 'Zahlungsanbieter',
          to: '/profile',
        },
      ],
      noUser: [
        {
          title: 'Startseite',
          to: '/',
        },
        {
          title: 'Über uns',
          to: '/a',
        },
        {
          title: 'Wie wir helfen',
          to: '/a',
        },
        {
          title: 'Wie du helfen kannst',
          to: '/a',
        },
        {
          title: 'Aktuelles',
          to: '/a',
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
      this.$router.push('/login')
    },
    logout() {
      this.$fire.auth.signOut()
      this.$router.push('/')
    },
  },
}
</script>
