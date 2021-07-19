const state = () => ({
  private: null,
  public: null,
})

function removeFirebaseObjects(obj) {
  if (!!obj && typeof obj === 'object')
    return Object.entries(obj)
      .filter(([k, v]) => v?.firestore === undefined)
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
  stripe(state) {
    return state.private?.stripe
  },
  stripeDone(state) {
    return (
      state.private?.stripe.chargesEnabled &&
      state.private?.stripe.payoutsEnabled
    )
  },
  isAuthenticated(state) {
    return !!state.public?.uid
  },
  membership(state) {
    return state.public?.membership
  },
  avatar(state) {
    return state.public?.avatar
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
  readyToShow(state) {
    return (
      state.private?.verifySetting.verified &&
      state.private.stripe &&
      state.public?.info
    )
  },
}

const actions = {
  nuxtServerInit({ commit }, req) {
    console.log('req', req)
    // if (req.session.user) {
    //   commit('user', req.session.user)
    // }
  },
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
  setInfo({ commit }, info) {
    this.$fire.functions
      .httpsCallable('user-setData')({ data: { info }, priv: false })
      .then(() => commit('setInfo', info))
  },
  setAvatar({ commit }, avatar) {
    this.$fire.functions
      .httpsCallable('user-setData')({ data: { avatar }, priv: false })
      .then(() => commit('setAvatar', avatar))
  },
  requestVerify({ commit }, verifyData) {
    return this.$fire.functions
      .httpsCallable('email-sendVerifyAccMail')(verifyData)
      .then((settings) => {
        commit('setVerify', settings.data)
      })
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
  setUserData(state, data) {
    console.log('[STORE MUTATIONS] - setUserData:', data)
    if (!data?._private || !data?._public) {
      for (const key of Object.keys(state)) {
        state[key] = null
      }
    } else {
      const { _private, _public } = data
      state.private = removeFirebaseObjects(_private)
      state.public = removeFirebaseObjects(_public)
    }
  },
  setInfo(state, info) {
    console.log('[STORE MUTATIONS] - setInfo:', info)
    state.public.info = info
  },
  setAvatar(state, avatar) {
    console.log('[STORE MUTATIONS] - setAvatar:', avatar)
    state.public.avatar = avatar
  },
  setVerify(state, verifySetting) {
    console.log('[STORE MUTATIONS] - setVerify:', verifySetting)
    state.private.verifySetting = verifySetting
  },
}

export default {
  mutations,
  actions,
  getters,
  state,
}
