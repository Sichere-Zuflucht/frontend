const state = () => ({
  uid: null,
  email: null,
  emailVerified: null,
  membership: null,
  verifySetting: {
    isVerifying: null,
    verified: null,
  },
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
  isVerifying(state) {
    return state.verifySetting.isVerifying
  },
  verified(state) {
    return state.verifySetting.verified
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
      commit('setUserData', null)
    } else {
      // Do something with the authUser and the claims object...
      console.log('logg in', authUser)
      this.$fire.firestore
        .collection('users')
        .doc(authUser.uid)
        .get()
        .then((user) => {
          const userData = user.data()
          if (userData) {
            commit('setUserData', userData)
            userData.membership.get().then((doc) => {
              commit('setMembership', doc.data())
            })
          }
        })
    }
  },
  setInfo({ commit }, { info, uid }) {
    commit('setInfo', info)
    this.$fire.firestore.collection('users').doc(uid).update({ info })
  },
  setVerify({ commit }, { uid, verifySetting }) {
    commit('setVerify', verifySetting)
    this.$fire.firestore.collection('users').doc(uid).update({ verifySetting })
  },
  async createFirebaseUser({ commit }, { uid, userData }) {
    commit('setUserData', userData)
    await userData.membership.get().then((doc) => {
      commit('setMembership', doc.data())
    })
    await this.$fire.firestore.collection('users/').doc(uid).set(userData)
  },
}

const mutations = {
  setUserData(state, userData) {
    console.log('[STORE MUTATIONS] - setUserData:', userData)
    if (!userData) {
      for (const key of Object.keys(state)) {
        state[key] = null
      }
    } else {
      for (const entry of Object.entries(userData)) {
        // filter out firestore objects (like membership)
        if (entry[1].firestore === undefined) {
          state[entry[0]] = entry[1]
        }
      }
    }
  },
  setInfo(state, info) {
    console.log('[STORE MUTATIONS] - setInfo:', info)
    state.info = info
  },
  setVerify(state, verifySetting) {
    console.log('[STORE MUTATIONS] - setVerify:', state, verifySetting)
    state.verifySetting = verifySetting
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
