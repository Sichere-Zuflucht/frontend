import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const actions = {
  // todo do i need this shit when routing only happens during client side?
  // does the pwa help with the store being ready for routing?
  // what happens when I do all this not, and just make sure that routing happens
  // after vuex is ready (fetched data from server)
  // could also try again with vuexpersistence

  // todo currently everything seems to fall in place, check again the whole thing
  // otherwise nice work
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('modules/user/setClaims', {
        authUser,
        claims,
      })
    }
  },
}
export const store = new Vuex.Store({})
