export const state = () => {
  return {
    claims: null,
  }
}
export const getters = {
  membership(state) {
    return state.claims?.membership
  },
  emailVerified(state) {
    return state.claims?.email_verified
  },
  routing(state) {
    return state.claims?.routing
  },
}
export const actions = {}
export const mutations = {
  setData(state, data) {
    console.log('[STORE MUTATIONS] - SSR - setData:', data)
    if (!data) {
      state.claims = null
    } else {
      const { claims } = data
      state.claims = claims
    }
  },
}
