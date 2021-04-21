<template>
  <v-app light>
    <client-only>
      <v-navigation-drawer v-model="drawer" app class="primary" dark right>
        <v-list v-if="!loggedIn">
          <v-list-item
            v-for="(none, i) in noUser"
            :key="i"
            :to="none.to"
            nuxt
            exact
          >
            <v-list-item-content>
              <v-list-item-title v-text="none.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item
            v-for="(loggedin, i) in loggedInUser"
            :key="i"
            :to="loggedin.to"
            nuxt
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ loggedin.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="loggedin.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template #append>
          <div class="pa-2">
            <v-btn block to="/" @click="test">test</v-btn>
            <v-btn block to="/" @click="logout">Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </client-only>
    <v-app-bar app>
      <v-toolbar-title class="pa-0"
        ><v-img contain width="150" src="Sichere-Zuflucht-Logo.svg"
      /></v-toolbar-title>
      <v-spacer />
      <v-btn @click="test"> t </v-btn>
      <client-only>
        <v-btn v-if="!loggedIn" to="login"> Login </v-btn>

        <v-btn v-else to="profile" icon
          ><v-avatar color="primary" size="38"
            ><v-img :src="user.avatar" /></v-avatar
        ></v-btn>
      </client-only>
      <v-app-bar-nav-icon right @click.stop="drawer = !drawer" />
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
          title: 'Account',
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
    // login: (that) => (!that.loggedIn ? 'Login' : 'Logout'),
    loggedIn: (that) => {
      if (process.client)
        return that.$store.getters['modules/user/isAuthenticated']
      return false
    },
    user: (that) => that.$store.getters['modules/user/user'],
  },
  methods: {
    test() {
      console.log(
        'user: ',
        this.user,
        ' | state: ',
        this.$store.state.modules.user
      )
    },
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
