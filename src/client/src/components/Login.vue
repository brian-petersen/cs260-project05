<template>
  <b-container class="pt-4">
    <b-form>
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
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
    }
  }
}
</script>

<style>

</style>
