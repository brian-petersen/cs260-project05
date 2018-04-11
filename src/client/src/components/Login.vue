<template>
  <b-container class="pt-4">
    <b-form @submit.prevent="login">
      <b-form-group
        label="Username:"
        label-for="username"
        horizontal>

        <b-form-input
          id="username"
          type="text"
          v-model="username"
        />
      </b-form-group>

      <b-form-group
        label="Password:"
        label-for="password"
        horizontal>

        <b-form-input
          id="password"
          type="password"
          v-model="password"
        />
      </b-form-group>

      <b-button type="submit" variant="primary" class="offset-sm-3">Login</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login () {
      const res = await axios.post('/api/sessions', {
        username: this.username,
        password: this.password
      })

      this.$store.commit('user/setSession', res.data)
    }
  }
}
</script>

<style>

</style>
