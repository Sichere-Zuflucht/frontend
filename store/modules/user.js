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
  onAuthStateChangedAction({ commit }, { authUser }) {
    if (!authUser) {
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
  async login({ dispatch }, form) {
    // sign user in
    const { user } = await this.$fire.auth.signInWithEmailAndPassword(
      form.email,
      form.password
    )
    // fetch user profile and set in state
    dispatch('fetchUserProfile', user)
  },
  fetchUserProfile({ commit }, user) {
    // fetch user profile
    this.$fire.firestore
      .collection('users')
      .doc(user.uid)
      .get()
      .then((u) => {
        const userData = u.data()
        if (userData) {
          const data = {
            authData: user,
            storeData: userData,
          }
          commit('setUserDataAndRedirect', data)
          userData.membership.get().then((doc) => {
            commit('setMembershipAndRedirect', doc.data())
          })
        }
      })

    // change route to dashboard
  },
  setInfo({ commit }, { info, avatar, uid }) {
    commit('setInfo', info, avatar)
    this.$fire.firestore.collection('users').doc(uid).update({ info, avatar })
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
  setUserDataAndRedirect(state, data) {
    console.log('[STORE MUTATIONS] - setUserDataAndRedirect:', data)
    const { uid, email, emailVerified } = data.authData
    const userData = data.storeData
    state.email = email
    state.emailVerified = emailVerified
    state.uid = uid
    for (const entry of Object.entries(userData)) {
      // filter out firestore objects (like membership)
      if (entry[1].firestore === undefined) {
        state[entry[0]] = entry[1]
      }
    }
  },
  setMembershipAndRedirect(state, membership) {
    console.log('[STORE MUTATIONS] - setMembershipAndRedirect:', membership)
    state.membership = membership
    this.$router.push({ path: '/profile' })
  },
  setUserData(state, userData) {
    console.log('[STORE MUTATIONS] - setUserData:', userData)
    if (!userData) {
      for (const key of Object.keys(state)) {
        state[key] = null
      }
      // window.location.href = '/'
    } else {
      for (const entry of Object.entries(userData)) {
        // filter out firestore objects (like membership)
        if (entry[1].firestore === undefined) {
          state[entry[0]] = entry[1]
        }
      }
      // window.location.href = '/profile'
    }
  },
  setInfo(state, info, avatar) {
    console.log('[STORE MUTATIONS] - setInfo:', info)
    state.info = info
    state.avatar = avatar
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
    console.log('ON_AUTH_STATE_CHANGED_MUTATION', authUser)
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
