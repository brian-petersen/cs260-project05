import axios from 'axios'

import router from '@/router'

export default {
  namespaced: true,
  state: {
    session: null,
    error: null,
  },
  mutations: {
    setSession (state, payload) {
      state.session = payload.session
      axios.defaults.headers.common['Auth'] = state.session
      router.push('/home')
    },
    clearSession (state) {
      state.session = null
      delete axios.defaults.headers.common['Auth']
      router.push('/login')
    },
    setError (state, payload) {
      state.error = payload.error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async createSession (context, payload) {
      try {
        const res = await axios.post('/api/sessions', payload)
        context.commit('setSession', res.data)
      }
      catch (e) {
        context.commit('setError', { error: 'Invalid username or password' })
      }
    },
    async deleteSession (context, payload) {
      await axios.delete('/api/sessions')
      context.commit('clearSession')
    }
  },
  getters: {
    hasSession (state) {
      return state.session !== null
    }
  }
}
