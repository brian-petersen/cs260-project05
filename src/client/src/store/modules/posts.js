import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'

import router from '@/router'

export default {
  namespaced: true,
  state: {
    loaded: false,
    items: {},
  },
  mutations: {
    setLoaded (state) {
      state.loaded = true
    },
    addPosts (state, payload) {
      payload.posts.forEach(p =>
        Vue.set(state.items, p.id, p))
    }
  },
  actions: {
    async getAll (context) {
      const res = await axios.get('/api/posts')

      context.commit('addPosts', { posts: res.data })
    },
    async create (context, payload) {
      const data = new FormData()
      data.append('image', payload.imageFile)
      data.append('caption', payload.caption)

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      const res = await axios.post('/api/posts', data, config)

      context.commit('addPosts', { posts: res.data })
      router.push('/home')
    }
  },
  getters: {
    sortedPosts: state => Object.values(state.items)
    .sort((a, b) => {
      const left = new Date(a.created_at)
      const right = new Date(b.created_at)

      if (left > right)
        return -1
      else if (left < right)
        return 1
      else
        return 0
    })
  }
}
