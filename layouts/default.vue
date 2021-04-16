<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          nuxt
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="loggedIn">
        <v-list-item
          v-for="(item, i) in loggedInUser"
          :key="i"
          :to="item.to"
          nuxt
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
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
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn v-if="loggedIn"> Login </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
      ],
      loggedInUser: [
        {
          icon: 'mdi-settings',
          title: 'Einstellungen',
          to: '/settings',
        },
        {
          icon: 'mdi-profile',
          title: 'Profil',
          to: '/profile',
        },
      ],
      noUser: [
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/login',
        },
      ],
      miniVariant: false,
      title: 'Sichere Zuflucht',
    }
  },
  computed: {
    // login: (that) => (!that.loggedIn ? 'Login' : 'Logout'),
    loggedIn: (that) => that.$store.getters['modules/user/isAuthenticated'],
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    logout() {
      this.$store.dispatch('modules/user/logout')
      this.$router.push('/')
    },
    /* logInOut() {
      if (this.loggedIn) {
        this.$fire.auth.signOut()
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    }, */
  },
}
</script>
