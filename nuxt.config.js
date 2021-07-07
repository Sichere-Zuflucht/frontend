import colors from 'vuetify/es5/util/colors'

const base = '/frontend'
const hostURL = 'https://sichere-zuflucht.github.io'
const isDev = process.env.NODE_ENV !== 'production'
const port = 80
const redAPI = process.env.RED_API

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base,
    middleware: 'index',
  },
  static: {
    prefix: base,
  },

  publicRuntimeConfig: {
    base,
    stripe: {
      publishableKey:
        'pk_test_51IbjZeFRsEq5IriEKQifwCzu8LMnx6uMxxhOz7HIELiaYpFCnsfNlVaiTOU72b2uWwQP4B5gI8GwDrsrSNJS0hPP00e8y3RbDo',
    },
    isDev,
    redAPI,
    baseUrl: (isDev ? 'http://localhost:' + port : hostURL) + base,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Sichere Zuflucht',
    title: 'Sichere Zuflucht',
    htmlAttrs: {
      lang: 'de',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Wir schaffen Zufluchtsorte – für Gewalt erleidende Frauen und Kinder in der Corona-Krise. Sichere-Zuflucht ist ein Plattform, auf der leerstehende Wohnungen, Apartments oder Mietwohnungen den Frauenhäusern als Zuflucht angeboten werden können',
      },
      { property: 'og:title', content: 'Sichere Zuflucht' },
      {
        property: 'og:description',
        content:
          'Wir schaffen Zufluchtsorte – für Gewalt erleidende Frauen und Kinder in der Corona-Krise. Sichere-Zuflucht ist ein Plattform, auf der leerstehende Wohnungen, Apartments oder Mietwohnungen den Frauenhäusern als Zuflucht angeboten werden können',
      },
      {
        property: 'og:image',
        content:
          'https://assets-global.website-files.com/5e95aa93bef5360e2788a86e/5e9c77999aae7e1abab9e645_sichere-zuflucht-logo-lang-2.svg',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'twitter:description',
        content:
          'Wir schaffen Zufluchtsorte – für Gewalt erleidende Frauen und Kinder in der Corona-Krise. Sichere-Zuflucht ist ein Plattform, auf der leerstehende Wohnungen, Apartments oder Mietwohnungen den Frauenhäusern als Zuflucht angeboten werden können',
      },
      {
        property: 'twitter:title',
        content: 'Sichere Zuflucht',
      },
      {
        property: 'twitter:image',
        content:
          'https://assets-global.website-files.com/5e95aa93bef5360e2788a86e/5e9c77999aae7e1abab9e645_sichere-zuflucht-logo-lang-2.svg',
      },
      { content: 'summary_large_image', name: 'twitter:card' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: base + '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        href:
          'https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap',
        rel: 'stylesheet',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  // does this change stuff with firestore contxt allready innitialized?
  render: {
    bundleRenderer: {
      runInNewContext: false,
    },
  },

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
  modules: ['@nuxtjs/firebase', 'nuxt-stripe-module'],
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
      functions: {
        // emulatorPort: process.env.NODE_ENV === 'development' ? 5001 : undefined,
        emulatorPort: undefined,
      },
      auth: {
        persistence: 'local', // default
        initialize: {
          onAuthStateChangedAction: 'modules/user/onAuthStateChangedAction',
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
        // emulatorPort: process.env.NODE_ENV === 'development' ? 9090 : undefined,
        emulatorPort: undefined,
        settings: {
          // Firestore Settings - currently only works in SPA mode
        },
      },
      storage: true,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    options: {
      customProperties: true,
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.pink.lighten3, // purple.lighten3,
          accent: colors.pink.darken4, // grey.darken3,
          secondary: colors.yellow.darken3, // amber.darken3,
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
    extend(config, { isDev, isClient }) {
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      } else if (isClient) {
        config.devtool = 'hidden-source-map'
      }
    },
  },
  server: {
    host: '0.0.0.0',
    port,
  },
}
