<template>
<div>
  
  <transition name="fade">
    <Message v-if="parentPost" class="my-5 space-y-4">
      <div class="flex justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-10" :aria-label="parentPost.user.username" data-balloon-pos="up">
            <router-link :to="{ name: 'UserProfile', params: { username: parentPost.user.username }}">
              <img class="h-10 w-10 rounded-full object-cover" :src="getUserAvatar(parentPost.user)" :alt="parentPost.user.username" />
            </router-link>
          </div>
          <div>
            <router-link :to="{ name: 'UserProfile', params: { username: parentPost.user.username }}" class="font-semibold text-gray-800">{{ parentPost.user.username }}</router-link>
          </div>
          <div class="text-xs text-gray-400">{{ parentPost.created_at | ago }}</div>
        </div>
        <div>
          <button class="button button-primary" @click="removeParentPost()">
            <svg class="-mx-2 -my-1 h-4 w-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="markdown text-gray-500" v-html="compiledMarkdown(parentPost.body)"></div>
    </Message>
  </transition>

  <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(post)">

      <ValidationProvider rules="required|min:10" name="body" v-slot="{ errors }">
          <vue-simplemde class="mt-2" id="body" name="body" v-model="body" :configs="editorConfig" ref="markdownEditor" />
          <span class="text-sm text-red-700">{{ errors[0] }}</span>
      </ValidationProvider>

      <div class="mt-3">
          <div class="flex justify-end">
          <span class="rounded-md shadow-sm">
              <button type="submit" class="button button-primary">
                  Post Reply
              </button>
          </span>
          </div>
      </div>
      
      </form>
  </ValidationObserver>

</div>
</template>

<script>
import VueSimplemde from 'vue-simplemde'
import Message from '@/components/Message.vue'
import { discussionService } from '@/services';
import { markdownEditorMixin, iconsMixin } from '@/mixins';
var md = require("markdown-it")();

export default {
  name: 'PostForm',
  mixins: [markdownEditorMixin, iconsMixin],
  components: {
    VueSimplemde, Message
  },
  props: {
    discussionId: {
      type: Number,
      required: true
    },
    parentPost: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      body: '',
      submitting: false,
    }
  },
  methods: {
    compiledMarkdown(data) {
      return md.render(data);
    },
    removeParentPost() {
      this.$emit('remove-parent')
    },
    post() {
      const { dispatch } = this.$store;

      let resource = {
        'discussion_id': this.discussionId,
        'body': this.body
      }
      this.parentPost ? resource.parent_post_id = this.parentPost.id : '';

      discussionService.addPost(this.discussionId, resource).then(
        response => {
          this.$emit('create', response.data)
          // dispatch('alert/success', "Post created", { root: true });
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
  },
}
</script>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>