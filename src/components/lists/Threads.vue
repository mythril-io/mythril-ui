<template>
  <div>

    <transition name="fade">
      <div v-if="!loading && data.data.length">
        <div class="bg-white border border-gray-200 rounded-md mt-5">
          <ul>
            <li class="border-t border-gray-200 first:border-t-0" v-for="discussion in data.data" :key="discussion.id">
              <router-link :to="{ name: 'Discussion', params: { id: discussion.id, slug: discussion.slug }}" class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                <div class="flex items-center px-4 py-4 sm:px-6">
                  <router-link class="flex-shrink-0" :to="{ name: 'UserProfile', params: { username: discussion.user.username }}" :aria-label="'Started by ' + discussion.user.username" data-balloon-pos="up">
                    <img class="h-14 w-14 rounded-full object-cover" :src="getUserAvatar(discussion.user)" :alt="discussion.user.username"  />
                  </router-link>
                  <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4 items-center">
                    <div class="md:col-span-2">
                      <div class="leading-5 font-medium text-primary">
                        <span :aria-label="discussion.body | truncate(200)" data-balloon-pos="up" data-balloon-length="xlarge">
                          {{ discussion.title }}
                        </span >
                      </div>

                      <div v-if="discussion.last_post" class="text-xs leading-5 truncate text-gray-400">
                        <router-link :to="{ name: 'UserProfile', params: { username: discussion.last_post.user.username }}" class="hover:underline">{{ discussion.last_post.user.username }}</router-link>
                        replied {{ discussion.last_post.created_at | ago }}
                      </div>
                      <div v-else class="text-xs leading-5 truncate text-gray-400">
                        Started {{ discussion.created_at | ago }}
                      </div>
                      <div class="mt-2 md:flex items-center">
                        <router-link :to="{name: 'Forums', params: { tag: tag.slug }}" :class="'tag first:ml-0 ml-2 whitespace-no-wrap ' + tag.colour" v-for="tag in discussion.tags" :key="tag.id">
                          {{ tag.name }}
                        </router-link>
                        <router-link :to="{name: 'Game',  params: { id: game.id, slug: game.slug }}" class="tag ml-2 is-primary-alt truncate hidden md:inline" :title="game.title" v-for="game in discussion.games" :key="game.id">
                          {{ game.title }}
                        </router-link>
                      </div>
                    </div>
                    <div class="hidden md:block text-right">
                      <div class="flex justify-end space-x-4">
                        <div class="text-center text-sm leading-5 text-gray-900">
                          <div class="text-xs uppercase tracking-widest text-gray-500">Replies</div>
                          <div>{{ discussion.post_count }}</div>
                        </div>
                        <div class="text-center text-sm leading-5 text-gray-900">
                          <div class="text-xs uppercase tracking-widest text-gray-500">Views</div>
                          <div>{{ discussion.view_count }}</div>
                        </div>
                        <div class="text-center text-sm leading-5 text-gray-900">
                          <div class="text-xs uppercase tracking-widest text-gray-500">Likes</div>
                          <div>{{ discussion.like_count }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>

        <Pagination
          class="mt-2"
          :currentPage="data.current_page"
          :totalPages="data.last_page"
          :totalItems="data.total"
          :itemsPerPage="data.per_page"
          :disabled="loading"
          v-on:goto-page="getData($event)"
        />
      </div>
    </transition>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import { iconsMixin } from '@/mixins';

export default {
  name: 'DiscussionsList',
  mixins: [iconsMixin],
  props: {
    data: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Pagination
  },
  methods: {
    getData (page) {
      this.$emit('get-data', page)
    },
  },
}
</script>
