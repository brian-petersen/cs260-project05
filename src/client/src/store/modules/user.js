export default {
  namespaced: true,
  state: {
    session: 'sup',
  },
  mutations: {
    setSession (state, payload) {
      state.session = payload.session
    },
    clearSession (state) {
      state.session = null
    }
  },
  getters: {
    hasSession (state) {
      return state.session !== null
    }
  }
}
