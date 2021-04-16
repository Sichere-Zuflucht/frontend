const state = () => ({
  uid: null,
  email: null,
  emailVerified: null,
  membership: null,
})

const getters = {
  uid(state) {
    if (state.uid) return state.uid
    else return null
  },

  user(state) {
    return state
  },

  isAuthenticated(state) {
    return !!state.uid
  },
  membership(state) {
    return state.membership
  },
  routing(state) {
    if (state.membership) return state.membership.routing
    else return '/'
  },
}

const actions = {
  onAuthStateChangedAction({ commit }, { authUser, claims }) {
    if (!authUser) {
      // claims = null
      // Perform logout operations
      console.log('logg out', authUser)
      commit('setMembership', null)
    } else {
      // Do something with the authUser and the claims object...
      console.log('logg in', authUser)
      this.$fire.firestore
        .collection('users')
        .doc(authUser.uid)
        .get()
        .then((user) => {
          const userData = user.data()
          commit('setUserData', userData)

          userData.membership.get().then((doc) => {
            commit('setMembership', doc.data())
          })
        })
    }
  },
  logout({ commit }) {
    this.$fire.auth.signOut()
    commit('setUserData', null)
  },
}

const mutations = {
  setUserData(state, userData) {
    console.log('[STORE MUTATIONS] - setUserData:', userData)
    for (const entry of Object.entries(userData)) {
      // filter out firestore objects (like membership)
      if (entry[1].firestore === undefined) {
        state[entry[0]] = entry[1]
      }
    }
  },
  setMembership(state, membership) {
    console.log('[STORE MUTATIONS] - setMembership:', membership)
    state.membership = membership
  },
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    console.log('ON_AUTH_STATE_CHANGED_MUTATION', authUser, state)
    if (authUser) {
      const { uid, email, emailVerified } = authUser
      state.email = email
      state.emailVerified = emailVerified
      state.uid = uid
    } else {
      state.email = null
      state.emailVerified = null
      state.uid = null
    }
  },
}

export default {
  mutations,
  actions,
  getters,
  state,
}
