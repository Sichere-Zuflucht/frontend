const state = () => ({
  private: null,
  public: null,
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
    return state.public?.uid
  },
  user(state) {
    return state
  },
  private(state) {
    return state.private
  },
  public(state) {
    return state.public
  },
  isAuthenticated(state) {
    return !!state.public?.uid
  },
  membership(state) {
    return state.public?.membership
  },
  isVerifying(state) {
    return state.private?.verifySetting.isVerifying
  },
  verified(state) {
    return state.private?.verifySetting.verified
  },
  routing(state) {
    return state.public?.membership.routing || '/'
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
    dispatch('fetchUserProfile', { user, redirect: true })
  },
  fetchUserProfile({ commit }, { user, redirect = false }) {
    console.log('fetchUser', user, redirect)
    // fetch user profile

    const userRef = this.$fire.firestore.collection('users/').doc(user.uid)

    userRef.get().then((userDoc) => {
      if (userDoc.exists) {
        const _private = userRef
          .collection('private')
          .get()
          .then((ref) => ref.docs[0].data())
        const _public = userRef
          .collection('public')
          .get()
          .then((ref) => ref.docs[0].data())

        Promise.all([_private, _public]).then((p) => {
          p[1].uid = user.uid
          commit('setUserData', { _private: p[0], _public: p[1] })
          p[1].membership.get().then((doc) => {
            commit('setMembership', {
              membership: doc.data(),
              redirect,
            })
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
  createFirebaseUser({ dispatch }, userData) {
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
    state.public.membership = membership
    if (redirect) this.$router.push({ path: '/profile' })
  },
  setUserData(state, { _private, _public }) {
    console.log('[STORE MUTATIONS] - setUserData:', _private, _public)
    if (!_private || !_public) {
      for (const key of Object.keys(state)) {
        state[key] = null
      }
    } else {
      state.private = removeFirebaseObjects(_private)
      state.public = removeFirebaseObjects(_public)
    }
  },
  setInfo(state, info) {
    console.log('[STORE MUTATIONS] - setInfo:', info)
    state.public.info = info
  },
  setVerify(state, verifySetting) {
    console.log('[STORE MUTATIONS] - setVerify:', state, verifySetting)
    state.private.verifySetting = verifySetting
  },
}

export default {
  mutations,
  actions,
  getters,
  state,
}
