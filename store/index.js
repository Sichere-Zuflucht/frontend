import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      account: null,
    },
    getters: {
      isAuthenticated(state) {
        return !!state.user
      },
    },
    actions: {
      nuxtServerInit({ dispatch, commit }, { res }) {
        if (res && res.locals && res.locals.user) {
          const {
            allClaims: claims,
            idToken: token,
            ...authUser
          } = res.locals.user

          commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims, token })
        }
      },
      onAuthStateChangedAction: (ctx, { authUser, claims }) => {
        if (!authUser) {
          // claims = null
          // Perform logout operations
          console.log('logg out', authUser)
        } else {
          // Do something with the authUser and the claims object...
          console.log('logg in', authUser)
        }
      },
    },
    mutations: {
      ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
        if (authUser) {
          const { uid, email, emailVerified } = authUser
          state.user = { uid, email, emailVerified }
        }
      },
    },
  })
}

export default createStore
