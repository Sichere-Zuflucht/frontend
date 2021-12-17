<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="secondary"
      dark
      fixed
      disable-resize-watcher
    >
      <client-only>
        <v-list>
          <div v-for="(item, i) in noUser" :key="i">
            <v-list-group
              v-if="item.subgroup"
              :value="true"
              no-action
              :to="item.to"
              nuxt
              exact
              active-class="white--text"
            >
              <template #activator>
                <v-list-item-icon
                  ><v-icon>{{ item.icon }}</v-icon></v-list-item-icon
                >
                <v-list-item-content>{{ item.title }}</v-list-item-content>
              </template>
              <v-list-item
                v-for="(sub, n) in item.subgroup"
                :key="n"
                :to="sub.to"
                nuxt
                exact
                active-class="white--text"
              >
                <v-list-item-content>
                  {{ sub.title }}
                </v-list-item-content>
              </v-list-item></v-list-group
            >
            <v-list-item v-else :to="item.to">
              <v-list-item-icon
                ><v-icon>{{ item.icon }}</v-icon></v-list-item-icon
              >
              <v-list-item-content>
                {{ item.title }}
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
        <v-divider />
        <v-list v-if="loggedIn">
          <div v-if="membership === 'Woman'">
            <v-list-group
              v-for="(item, i) in loggedInWoman"
              :key="i"
              :value="true"
              no-action
              active-class="white--text"
            >
              <template #activator>
                <v-list-item-icon
                  ><v-icon>{{ item.icon }}</v-icon></v-list-item-icon
                >
                <v-list-item-content>{{ item.title }}</v-list-item-content>
              </template>
              <v-list-item
                v-for="(sub, n) in item.subgroup"
                :key="n"
                :to="sub.to"
                nuxt
                exact
                active-class="white--text"
              >
                <v-list-item-content>
                  {{ sub.title }}
                </v-list-item-content>
              </v-list-item></v-list-group
            >
          </div>
          <div v-else>
            <v-list-group
              v-for="(item, i) in loggedInCoach"
              :key="i"
              :value="true"
              no-action
              active-class="white--text"
            >
              <template #activator>
                <v-list-item-icon
                  ><v-icon>{{ item.icon }}</v-icon></v-list-item-icon
                >
                <v-list-item-content>{{ item.title }}</v-list-item-content>
              </template>
              <v-list-item
                :to="'/berater/' + uid"
                nuxt
                exact
                active-class="white--text"
              >
                <v-list-item-content> Mein Profil </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-for="(sub, n) in item.subgroup"
                :key="n"
                :to="sub.to"
                nuxt
                exact
                active-class="white--text"
              >
                <v-list-item-content>
                  {{ sub.title }}
                </v-list-item-content>
              </v-list-item></v-list-group
            >
          </div>
          <v-divider class="my-2" />
          <v-list-item>
            <v-btn block to="/" color="accent" @click="logout">Abmelden</v-btn>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-spacer />
          <v-list-item>
            <v-btn to="/registration/signup" color="accent" exact nuxt block
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
          nuxt
          exact
          icon
          plain
          :to="membership === 'Coach' ? '/beratung' : null"
          @click="membership === 'Coach' ? null : logout()"
        >
          <v-avatar
            v-if="membership === 'Coach'"
            size="38"
            color="grey lighten-2"
            ><v-img v-if="user.public.avatar" :src="user.public.avatar" />
            <v-icon v-else>mdi-account</v-icon>
            <!-- <SharedCoachIcon
              v-else
              color="#b3b3b3"
              style="border: 1px solid #b3b3b3"
              class="pa-2"
            />--> </v-avatar
          ><v-icon v-else>mdi-logout</v-icon></v-btn
        >
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
    <v-main style="hyphens: auto" class="pb-0">
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
          title: 'Mein Bereich',
          subgroup: [
            {
              icon: 'mdi-account-box',
              title: 'Beratung',
              to: '/frauen',
            },
            {
              icon: 'mdi-cog',
              title: 'Konto',
              to: '/frauen/settings',
            },
            /* {
              icon: 'mdi-shield-home',
              title: 'Wohnungen',
              to: '/frauen/wohnungssuche',
            }, */
          ],
        },
      ],
      loggedInCoach: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Mein Bereich',
          subgroup: [
            {
              icon: 'mdi-account-box',
              title: 'Beratung',
              to: '/beratung',
            },
            {
              icon: 'mdi-cog',
              title: 'Konto',
              to: '/beratung/settings',
            },
            {
              icon: 'mdi-credit-card',
              title: 'Bezahlung',
              to: '/beratung/bezahlung',
            },
          ],
        },
      ],
      noUser: [
        {
          icon: 'mdi-newspaper-variant',
          title: 'Magazin',
          to: '/magazine',
        },
        {
          icon: 'mdi-face-woman',
          title: 'Für Frauen',
          subgroup: [
            {
              icon: 'mdi-information-variant',
              title: 'Informationen',
              to: '/info-frauen',
            },
            {
              icon: 'mdi-account-search',
              title: 'Beratung finden',
              to: '/berater/suche',
            },
          ],
        },
        {
          icon: 'mdi-hand-heart',
          title: 'Für Berater*innen',
          to: '/info-berater',
        },
        {
          icon: 'mdi-gift',
          title: 'Spenden',
          to: '/spenden',
        },
        {
          icon: 'mdi-account-group',
          title: 'Über uns',
          to: '/ueber-uns',
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
    uid() {
      return this.$store.getters['modules/user/uid']
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
