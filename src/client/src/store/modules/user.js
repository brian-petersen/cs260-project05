import axios from 'axios'

import router from '@/router'

export default {
  namespaced: true,
  state: {
    id: null,
    session: null,
    error: null,
  },
  mutations: {
    setData (state, payload) {
      state.id = payload.userId
      state.session = payload.session
      state.error = null

      axios.defaults.headers.common['Auth'] = state.session
      router.push('/home')
    },
    clearData (state) {
      this.id = null
      state.session = null
      state.error = null

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
        context.commit('setData', res.data)
      }
      catch (e) {
        context.commit('setError', { error: 'Invalid username or password' })
      }
    },
    async deleteSession (context, payload) {
      await axios.delete('/api/sessions')
      context.commit('clearData')
    }
  },
  getters: {
    hasSession (state) {
      return state.session !== null
    }
  }
}
