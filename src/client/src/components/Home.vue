<template>
  <b-container class="mt-3">
    <div v-if="posts.length === 0" class="text-center">
      <i>No posts found</i>
    </div>
    <div v-else>
      <ul>
        <li v-for="post in posts" :key="post.id" class="text-light">
          <div class="image-container">
            <div
              v-show="userId === post.user_id"
              @click="editPost(post.id)"
              class="edit">Edit</div>
            <div
              v-show="userId === post.user_id"
              @click="deletePost(post.id)"
              class="delete"
              title="Delete">&times;</div>
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

    <b-modal
      title="Edit Caption"
      v-model="showEdit"
      @ok="onOkEdit">

      <b-form @submit.prevent>
        <b-form-group
          label="Caption"
          label-for="caption">

          <b-input
            id="caption"
            type="text"
            v-model="editCaption"
          />
        </b-form-group>
      </b-form>
    </b-modal>
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
  data () {
    return {
      showEdit: false,
      editId: null,
      editCaption: '',
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.id,
      postsLoaded: state => state.posts.loaded,
    }),
    ...mapGetters({
      posts: 'posts/sortedPosts',
    })
  },
  methods: {
    formatDate (date) {
      return moment(date).fromNow()
    },
    deletePost (postId) {
      this.$store.dispatch('posts/delete', { id: postId })
    },
    editPost (postId) {
      this.showEdit = true
      this.editId = postId
      this.editCaption = this.$store.state.posts.items[postId].caption
    },
    onOkEdit (e) {
      this.$store.dispatch('posts/update', {
        id: this.editId,
        caption: this.editCaption,
      })
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

.image-container {
  position: relative;
}

.edit {
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 25px;
  line-height: 1;
  text-shadow: 0 0 3px #000;
  cursor: pointer;
}

.delete {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 50px;
  line-height: 35px;
  text-shadow: 0 0 3px #000;
  cursor: pointer;
}

.edit:hover, .delete:hover {
  opacity: .7;
}
</style>
