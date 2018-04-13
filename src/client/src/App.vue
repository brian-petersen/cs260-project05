<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand to="/home">PicShare Blockchain</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse is-nav id="nav-collapse">
          <b-navbar-nav v-if="hasSession" class="ml-auto">
            <b-nav-item @click.prevent="showCreate = true">Add Post</b-nav-item>
            <b-nav-item @click.prevent="signOut">Sign Out</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav v-else class="ml-auto">
            <b-nav-item to="/login">Sign In</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <router-view />

    <b-modal
      title="Create Post"
      v-model="showCreate"
      @ok="submitPost"
      @hidden="resetAddPost">

      <b-form @submit.prevent>
        <b-form-group
          label="Image"
          label-for="image">

          <b-form-file
            id="image"
            ref="imageInput"
            accept="image/*"
            v-model="imageFile"
          />
        </b-form-group>
        <b-form-group
          label="Caption"
          label-for="caption">

          <b-input
            id="caption"
            type="text"
            v-model="caption"
          />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      showCreate: false,
      imageFile: null,
      caption: '',
    }
  },
  computed: {
    ...mapGetters({
      hasSession: 'user/hasSession'
    })
  },
  methods: {
    ...mapActions({
      signOut: 'user/deleteSession'
    }),
    submitPost (e) {
      if (!this.imageFile) {
        e.preventDefault()
        alert('Image is required')

        return
      }

      this.$store.dispatch('posts/create', {
        imageFile: this.imageFile,
        caption: this.caption,
      })

      this.showCreate = false
    },
    resetAddPost () {
      this.$refs.imageInput.reset()

      this.imageFile = null
      this.caption = ''
    }
  }
}
</script>

<style>
body {
  background: url(./assets/bg.png)
}
</style>
