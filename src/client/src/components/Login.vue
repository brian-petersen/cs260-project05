<template>
  <b-container class="pt-4">
    <b-alert
      variant="danger"
      dismissible
      :show="error !== null"
      @dismissed="clearError">
      {{ error }}
    </b-alert>

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

      <b-button
        type="submit"
        variant="primary"
        class="offset-sm-3">

        Login
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    ...mapState('user', {
      error: state => state.error
    })
  },
  methods: {
    login () {
      this.$store.dispatch('user/createSession', {
        username: this.username,
        password: this.password,
      })
    },
    ...mapMutations({
      clearError: 'user/clearError'
    })
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
}
</style>
