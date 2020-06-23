<template>
<div>

    <Hero :title="data.title" :center="true" character="">
      <template #subtitle>
        <div class="mt-2 flex items-center flex-col">
          <div>
            <router-link :to="{name: 'Forums', params: { tag: tag.slug }}" :class="'tag shadow-xs first:ml-0 ml-2 ' + tag.colour" v-for="tag in data.tags" :key="tag.id">
              {{ tag.name }}
            </router-link>
          </div>
          <div class="mt-2" v-if="data.games.length">
            <router-link :to="{name: 'Game',  params: { id: game.id, slug: game.slug }}" class="tag ml-2 is-primary-alt shadow-xs" v-for="game in data.games" :key="game.id">
              {{ game.title }}
            </router-link>
          </div>
        </div>
      </template>
    </Hero>
    <div class="bg-gray-50 py-7" style="border-bottom: 2px #f5f5f5 solid;">
      <Container>
        <div class="md:flex bounce-enter-active md:space-x-5">
          <div class="flex-shrink-0 mb-5 md:mb-0">
            <div class="w-32" :aria-label="data.user.username" data-balloon-pos="up">
              <router-link :to="{ name: 'UserProfile', params: { username: data.user.username }}">
                <img class="h-32 w-32 rounded-full object-cover" :src="getUserAvatar(data.user)" :alt="data.user.username" />
              </router-link>
            </div>
          </div>
          <transition name="fade" mode="out-in">
            <div v-if="editing" class="flex-grow" key="edit">
              <DiscussionEditForm :discussion="data" v-on:save="update($event)" v-on:cancel="editing=false" />
            </div>
            <div class="flex-grow" v-else key="view">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center">
                  <router-link :to="{ name: 'UserProfile', params: { username: data.user.username }}" class="font-semibold">{{ data.user.username }}</router-link>
                  <span class="ml-2 text-xs text-gray-400" :aria-label="data.created_at | detailed" data-balloon-pos="up">{{ data.created_at | ago }}</span>
                </div>
                <div class="text-xs text-gray-400" v-if="data.edited_at">
                  <span :aria-label="data.edited_at | ago" data-balloon-pos="up">Edited</span>
                </div>
              </div>
              <div class="markdown" style="color:#363636;" v-html="compiledMarkdown(data.body)"></div>
              <div class="flex flex-col sm:flex-row justify-between items-center mt-10 space-y-5 sm:space-y-0">
                <div class="flex space-x-4">
                  <div class="text-center text-base leading-5 text-gray-900">
                    <div class="text-sm uppercase tracking-widest text-gray-500">Replies</div>
                    <div>{{ data.post_count }}</div>
                  </div>
                  <div class="text-center text-base leading-5 text-gray-900">
                    <div class="text-sm uppercase tracking-widest text-gray-500">Views</div>
                    <div>{{ data.view_count }}</div>
                  </div>
                  <div class="text-center text-base leading-5 text-gray-900">
                    <div class="text-sm uppercase tracking-widest text-gray-500">Users</div>
                    <div>{{ data.user_count }}</div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <div>
                    <button type="button" class="inline-flex items-center  button button-danger" @click="toggleLike">
                      <svg class="-mx-1 h-5 w-5" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      <span v-if="data.like_count" class="ml-3">{{ data.like_count }}</span>
                    </button>
                  </div>
                  <div>
                    <button type="button" class="button" :class="data.is_subscribed && getCurrentUser() ? 'button-danger' : 'button-primary'" @click="subscribe">
                      {{ data.is_subscribed && getCurrentUser() ? 'Unsubscribe' : 'Subscribe' }}
                    </button>
                  </div>
                  <div v-if="currentUserEquals(data.user)">
                    <button type="button" class="button button-warning" @click="editing=!editing">
                      <svg class="-mx-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

      </Container>
    </div>

</div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Container from '@/components/layout/Container.vue'
import DiscussionEditForm from '@/components/forms/edit/Discussion.vue'

import { iconsMixin, authMixin } from '@/mixins';
import { discussionService } from '@/services';

var md = require("markdown-it")();
import _ from 'lodash';

export default {
  name: 'ForumDiscussion',
  mixins: [iconsMixin, authMixin],
  props: {
    data: {
      type: Object,
      required: true
    },
  },
  components: {
    Container, Hero, DiscussionEditForm
  },
  data () {
    return {
      editing: false,
    }
  },
  methods: {
    update(discussion) {
      this.data.body = discussion.body;
      this.data.edited_at = discussion.edited_at;
    },
    toggleLike() {
      if(!this.getCurrentUser()) {
          return this.$router.push({ name: 'Login' });
      }
      const { dispatch } = this.$store;

      discussionService.toggleLike(this.data).then(
        response => {
          this.data.has_liked = response.data;
          response.data ? this.data.like_count++ : this.data.like_count--;
        },
        error => {
          dispatch('alert/error', "Unable to toggle like", { root: true });
        }
      );
    },
    subscribe() {
      if(!this.getCurrentUser()) {
          return this.$router.push({ name: 'Login' });
      }
      const { dispatch } = this.$store;

      discussionService.toggleSubscribe(this.data).then(
        response => {
          this.data.is_subscribed = response.data;
        },
        error => {
          dispatch('alert/error', "Unable to toggle subscribe", { root: true });
        }
      );
    },
    compiledMarkdown (data) {
      return md.render(data);
    },
  },
}
</script>

<style type="sass">
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
