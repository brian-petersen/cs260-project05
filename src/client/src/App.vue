<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand to="/home">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse is-nav id="nav-collapse">
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!hasSession" to="/login">Sign In</b-nav-item>
            <b-nav-item v-else @click.stop.prevent="signOut">Sign Out</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      hasSession: 'user/hasSession'
    })
  },
  methods: {
    ...mapActions({
      signOut: 'user/deleteSession'
    })
  }
}
</script>

<style>
</style>
