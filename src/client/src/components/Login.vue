<template>
  <b-container class="pt-4">
    <b-alert
      variant="danger"
      dismissible
      :show="error !== null"
      @dismissed="clearError">
      {{ error }}
    </b-alert>

    <h3 class="text-center">Login</h3>
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

    <h3 class="text-center mt-5">Register</h3>
    <b-form @submit.prevent="register">
      <b-form-group
        label="Username:"
        label-for="registerUsername"
        horizontal>

        <b-form-input
          id="registerUsername"
          type="text"
          v-model="registerUsername"
        />
      </b-form-group>

      <b-form-group
        label="Password:"
        label-for="registerPassword"
        horizontal>

        <b-form-input
          id="registerPassword"
          type="password"
          v-model="registerPassword"
        />
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        class="offset-sm-3">

        Register
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
      registerUsername: '',
      registerPassword: '',
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
    register() {
      this.$store.dispatch('user/register', {
        username: this.registerUsername,
        password: this.registerPassword,
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
