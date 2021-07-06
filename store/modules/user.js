import _ from 'lodash'
const state = () => ({
  uid: null,
  email: null,
  emailVerified: null,
  membership: null,
  public: null,
  verifySetting: {
    isVerifying: null,
    verified: null,
  },
})

function removeFirebaseObjects(obj) {
  if (typeof obj === 'object')
    return Object.entries(obj)
      .filter(([k, v]) => v.firestore === undefined)
      .reduce(
        (r, [key, value]) => ({ ...r, [key]: removeFirebaseObjects(value) }),
        {}
      )
  else return obj
}

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
  onAuthStateChangedAction({ commit, dispatch }, { authUser }) {
    if (!authUser) {
      // Perform logout operations
      console.log('logg out', authUser)
      commit('setUserData', null)
    } else {
      // Do something with the authUser and the claims object...
      console.log('logg in', authUser)
      dispatch('fetchUserProfile', { user: authUser })
    }
  },
  async login({ dispatch }, form) {
    // sign user in
    const { user } = await this.$fire.auth.signInWithEmailAndPassword(
      form.email,
      form.password
    )
    // fetch user profile and set in state
    dispatch('fetchUserProfile', { user })
  },
  fetchUserProfile({ commit }, { user, redirect = false }) {
    // fetch user profile
    this.$fire.firestore
      .collection('users')
      .doc(user.uid)
      .get()
      .then((u) => {
        const userData = u.data()
        if (userData) {
          commit('setAuthData', user)
          commit('setUserData', userData)
          userData.public.membership.get().then((doc) => {
            commit('setMembership', {
              membership: doc.data(),
              redirect,
            })
          })
        }
      })
  },
  setInfo({ commit }, { info }) {
    this.$fire.functions
      .httpsCallable('user-setInfo')(info)
      .then(() => commit('setInfo', info))
  },
  setVerify({ commit }, { verifySetting }) {
    this.$fire.functions
      .httpsCallable('user-setVerify')(verifySetting)
      .then(() => commit('setVerify', verifySetting))
  },
  createFirebaseUser({ dispatch }, { userData }) {
    this.$fire.functions
      .httpsCallable('user-create')(userData)
      .then((authUser) => {
        dispatch('fetchUserProfile', { user: authUser.data, redirect: true })
      })
  },
}

const mutations = {
  setAuthData(state, authData) {
    console.log('[STORE MUTATIONS] - setAuthData:', authData)
    const { uid, email, emailVerified } = authData
    state.email = email
    state.emailVerified = emailVerified
    state.uid = uid
  },
  setMembership(state, data) {
    console.log('[STORE MUTATIONS] - setMembership:', data)
    const { membership, redirect } = data
    state.membership = membership
    state.public.membership = membership
    if (redirect) this.$router.push({ path: '/profile' })
  },
  setUserData(state, userData) {
    console.log('[STORE MUTATIONS] - setUserData:', userData)
    if (!userData) {
      for (const key of Object.keys(state)) {
        state[key] = null
      }
    } else {
      _.merge(state, removeFirebaseObjects(userData))
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
