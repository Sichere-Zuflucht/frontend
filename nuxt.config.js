import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base: '/frontend/',
    middleware: 'index',
  },
  static: {
    prefix: '/frontend/',
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - sichere-zufluch',
    title: 'sichere-zuflucht',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/firebase'],
  firebase: {
    config: {
      apiKey: 'AIzaSyDMjjzgxNWEsDWYETgWbFgaYnwzAmLyzhM',
      authDomain: 'sicherezuflucht.firebaseapp.com',
      projectId: 'sicherezuflucht',
      storageBucket: 'sicherezuflucht.appspot.com',
      messagingSenderId: '163834643967',
      appId: '1:163834643967:web:277673f1c69b5eaf3213ca',
    },
    services: {
      auth: {
        persistence: 'local', // default
        initialize: {
          onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'onAuthStateChangedAction',
          subscribeManually: false,
        },
        ssr: true, // default
        emulatorPort: undefined,
        // emulatorHost: 'http://localhost',
      },
      firestore: {
        memoryOnly: false, // default
        chunkName:
          process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
        enablePersistence: true,
        emulatorPort: undefined,
        settings: {
          // Firestore Settings - currently only works in SPA mode
        },
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.purple.lighten3,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.teal.darken1,
        },
        dark: {
          primary: colors.purple.lighten4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.teal.darken1,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev }) {
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      }
    },
  },
  server: {
    host: '0.0.0.0',
  },
}
