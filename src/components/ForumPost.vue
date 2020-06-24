<template>
    
    <div class="md:flex md:space-x-12">
        <div class="flex-shrink-0 mb-5 md:mb-0">
            <div class="w-20" :aria-label="post.user.username" data-balloon-pos="up">
            <router-link :to="{ name: 'UserProfile', params: { username: post.user.username }}">
                <img class="h-20 w-20 rounded-full object-cover" :src="getUserAvatar(post.user)" :alt="post.user.username" />
            </router-link>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div v-if="editing" class="flex-grow" key="edit">
                <PostEditForm :post="post" v-on:save="update($event)" v-on:cancel="editing=false" />
            </div>
            <div v-else class="flex-grow space-y-3" key="show">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <router-link :to="{ name: 'UserProfile', params: { username: post.user.username }}" class="font-semibold">{{ post.user.username }}</router-link>
                        <span class="ml-2 text-xs text-gray-400" :aria-label="post.created_at | detailed" data-balloon-pos="up">{{ post.created_at | ago }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="text-xs text-gray-400" v-if="post.edited_at">
                            <span :aria-label="post.edited_at | ago" data-balloon-pos="up">Edited</span>
                        </div>
                        <div class="text-xs text-gray-400 text-primary">
                            #{{ post.num }}
                        </div>
                    </div>
                </div>
                <div v-if="post.parent" class="space-y-3">
                    <button class="button button-gray flex items-center space-x-2" @click="showParent=!showParent">
                        <svg class="h-4 w-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                        </svg>
                        <span>{{ post.parent.user.username }}</span>
                    </button>
                    <transition name="fade">
                        <Message v-if="showParent" class="my-5 space-y-4">
                            <div class="flex justify-between">
                                <div class="flex items-center space-x-2">
                                    <div class="w-10" :aria-label="post.parent.user.username" data-balloon-pos="up">
                                        <router-link :to="{ name: 'UserProfile', params: { username: post.parent.user.username }}">
                                        <img class="h-10 w-10 rounded-full object-cover" :src="getUserAvatar(post.parent.user)" :alt="post.parent.user.username" />
                                        </router-link>
                                    </div>
                                    <div>
                                        <router-link :to="{ name: 'UserProfile', params: { username: post.parent.user.username }}" class="font-semibold text-gray-800">{{ post.parent.user.username }}</router-link>
                                    </div>
                                    <div class="text-xs text-gray-400">{{ post.parent.created_at | ago }}</div>
                                </div>
                                <div>
                                    <button class="button button-white" @click="find(post.parent)">
                                        <svg class="-mx-2 -my-1 h-4 w-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="markdown text-gray-500" v-html="compiledMarkdown(post.parent.body)"></div>
                        </Message>
                    </transition>
                </div>
                <div class="markdown" style="color:#363636;" v-html="compiledMarkdown(post.body)"></div>
                <div class="flex justify-between">
                    <div>
                        <button v-if="post.replies.length" class="button button-gray flex items-center space-x-2" @click="showReplies=!showReplies">
                            <span>{{ post.replies.length }} {{ post.replies.length > 1 ? 'Replies' : 'Reply' }}</span>
                            <svg class="h-4 w-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="flex items-center justify-end">
                        <div class="is-link hover:text-danger flex items-center space-x-1" @click="toggleLike()">
                            <span class="text-sm" v-if="post.like_count">{{ post.like_count }}</span>
                            <svg v-if="!post.has_liked" class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            <svg v-else class="h-5 w-5" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </div>
                        <div class="is-link hover:text-gray-800 ml-2" @click="reply(post)">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                            </svg>
                        </div>
                        <div class="is-link hover:text-gray-800 ml-2" v-if="currentUserEquals(post.user)" @click="editing=true">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <transition name="fade">
                    <div v-if="showReplies" class="pt-2 space-y-2">
                        <Message class="space-y-4" background="bg-gray-100" v-for="post in post.replies" :key="post.id">
                            <div class="flex justify-between">
                                <div class="flex items-center space-x-2">
                                    <div class="w-10" :aria-label="post.user.username" data-balloon-pos="up">
                                        <router-link :to="{ name: 'UserProfile', params: { username: post.user.username }}">
                                        <img class="h-10 w-10 rounded-full object-cover" :src="getUserAvatar(post.user)" :alt="post.user.username" />
                                        </router-link>
                                    </div>
                                    <div>
                                        <router-link :to="{ name: 'UserProfile', params: { username: post.user.username }}" class="font-semibold text-gray-800">{{ post.user.username }}</router-link>
                                    </div>
                                    <div class="text-xs text-gray-400">{{ post.created_at | ago }}</div>
                                </div>
                                <div>
                                    <button class="button button-white" @click="find(post)">
                                        <svg class="-mx-2 -my-1 h-4 w-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="markdown text-gray-500" v-html="compiledMarkdown(post.body)"></div>

                        </Message>
                    </div>
                </transition>

            </div>
        </transition>

    </div>

</template>

<script>
import PostEditForm from '@/components/forms/edit/Post.vue'
import Message from '@/components/Message.vue'
import { postService } from '@/services';
import { iconsMixin, authMixin } from '@/mixins';
var md = require("markdown-it")();

export default {
  name: 'ForumPost',
  mixins: [iconsMixin, authMixin],
  props: {
    post: {
      type: Object,
      required: true
    },
  },
  components: {
    PostEditForm, Message
  },
  data () {
    return {
      editing: false,
      showParent: false,
      showReplies: false,
    }
  },
  methods: {
    compiledMarkdown(data) {
      return md.render(data);
    },
    update(post) {
      this.post.body = post.body;
      this.post.edited_at = post.edited_at;
    },
    toggleLike() {
      if(!this.getCurrentUser()) {
          return this.$router.push({ name: 'Login' });
      }
      const { dispatch } = this.$store;

      postService.toggleLike(this.post).then(
        response => {
          this.post.has_liked = response.data;
          response.data ? this.post.like_count++ : this.post.like_count--;
        },
        error => {
          dispatch('alert/error', "Unable to toggle like", { root: true });
        }
      );
    },
    reply(post) {
      !this.getCurrentUser() ? this.$router.push({ name: 'Login' }) : this.$emit('reply', post);
    },
    find(post) {
        this.$emit('find', post);
    }
  },
}
</script>