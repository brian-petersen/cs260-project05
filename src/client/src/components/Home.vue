<template>
  <b-container class="mt-3">
    <div v-if="posts.length === 0" class="text-center">
      <i>No posts found</i>
    </div>
    <div v-else>
      <ul>
        <li v-for="post in posts" :key="post.id" class="text-light">
          <div>
            <img :src="'/api/posts/' + post.id + '/image'" />
          </div>
          <div class="clearfix details">
            <div class="float-left">
              <i>{{ post.caption ? post.caption : 'No caption provided' }}</i>
            </div>
            <div class="float-right">
              Posted by {{ post.username }} about {{ formatDate(post.created_at) }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Home',
  created () {
    if (!this.postsLoaded)
      this.$store.dispatch('posts/getAll')
  },
  computed: {
    ...mapState({
      postsLoaded: 'posts/loaded',
    }),
    ...mapGetters({
      posts: 'posts/sortedPosts',
    })
  },
  methods: {
    formatDate (date) {
      return moment(date).fromNow()
    }
  }
}
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul li {
  background: #868686;
  border-radius: 10px;
  max-width: 700px;
  margin: 0 auto;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 4px #000;
}

ul li img {
  width: 100%;
}

.details {
  padding-top: 15px;
}
</style>
