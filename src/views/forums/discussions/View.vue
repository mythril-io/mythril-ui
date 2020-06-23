<template>
  <div v-if="data">
    <!-- Discussion -->
    <ForumDiscussion :data="data" />

    <Container>
      <!-- Show Posts -->
      <div id="posts">
        <Loading v-if="loadingPosts" :simple="true" />
        <div v-else>
          <Posts 
            v-if="posts.data && posts.data.length" 
            :data="posts" 
            :loading="loadingPosts" 
            v-on:get-data="goToPage($event)"
            v-on:reply="setParentPost($event)"
            v-on:find="scrollToPost($event)"
          />
        </div>
      </div>


      <!-- New Post Form -->
      <div v-if="!loading && data" id="post-form">
        <transition name="fade" mode="out-in">
          <div class="flex justify-center mt-5" v-if="!replyForm" key="button">
            <button class="button button-primary" @click="showReplyForm()">Post a Reply</button>
          </div>
          <PostForm
            v-else 
            key="form" 
            :discussionId="data.id" 
            :parentPost="parentPost"
            v-on:remove-parent="parentPost=null"
            v-on:create="addPost($event)"
          />
        </transition>
      </div>

    </Container>

  </div>
</template>

<script>
import ForumDiscussion from '@/components/ForumDiscussion.vue'
import Loading from '@/components/Loading.vue'
import Container from '@/components/layout/Container.vue'
import Posts from '@/components/lists/Posts.vue'
import PostForm from '@/components/forms/Post.vue'

import { getResourceMixin, iconsMixin, authMixin } from '@/mixins';
import { discussionService, postService } from '@/services';
var md = require("markdown-it")();
import _ from 'lodash';

export default {
  name: 'Discussion',
  mixins: [iconsMixin, authMixin],
  components: {
    ForumDiscussion, Container, Loading, Posts, PostForm
  },
  data () {
    return {
      loading: false,
      data: null,
      editing: false,
      loadingPosts: true,
      posts: [],
      replyForm: false,
      parentPost: null
    }
  },
  methods: {
    getData() {
      const { dispatch } = this.$store;
      this.loading = true;
      discussionService.get(this.$route.params.id).then(
        response => {
          this.data = response.data;
          this.getPosts();
          this.loading = false;
          this.$route.params.slug != response.data.slug ? this.$router.push({params: {slug: response.data.slug}}) : ''
        },
        error => {
          this.loading = false;
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    goToPage(page) {
      this.$router.push({ query: { page: page }});
      this.$scrollTo('#posts');
    },
    getPosts() {
      const { dispatch } = this.$store;
      this.loadingPosts = true;
      discussionService.getPostsByPage(this.$route.params.id, this.$route.query.page).then(
        response => {
          response.data.data.length == 0 && response.data.current_page != 1 ? this.goToPage(1) : ''
          this.posts = response.data;
          this.loadingPosts = false;
        },
        error => {
          this.loadingPosts = false;
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    showReplyForm() {
      if(!this.getCurrentUser()) {
          return this.$router.push({ name: 'Login' });
      }
      this.replyForm=!this.replyForm
    },
    setParentPost(post) {
      this.parentPost = post;
      this.replyForm = true;
      this.$scrollTo('#post-form');
    },
    scrollToPost(post) {
      let found = _.find(this.posts.data, ['id', post.id]);
      
      found ? this.$scrollTo('#post-' + found.id) : this.findPost(post);
    },
    findPost(post) {
      const { dispatch } = this.$store;
      var _this = this;

      postService.find(post).then(
        response => {
          _this.posts.current_page == response.data ? this.getPosts(response.data) : _this.$router.push({ query: { page: response.data }});
          
          setTimeout(function(){
            _this.scrollToPost(post);
          }, 500);
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    addPost(post) {
      this.replyForm = false;
      // this.data.current_page == 1 ? this.posts.push(post) : ;
      this.scrollToPost(post);
    }
  },
  watch: {
      '$route.query': {
          handler() {
            this.$route.query.page ? this.getPosts() : ''
          },
          immediate: true,
      },
      '$route.params': {
          handler() {
              if(this.data && (this.$route.params.id != this.data.id)) {
                this.getData()
              }
          },
          immediate: true,
      }
  },
  created() {
    this.getData()
  }
}
</script>
