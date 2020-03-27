<template>
  <Overlap :coverPhoto="data ? getGameBannerStyle(data.recommended_game.banner) : ''">
    <template #header>

      <div class="flex justify-center items-center h-40" v-if="data">
        <div>
          <h2 class="text-center text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
            <router-link :to="{ name: 'Game', params: { id: data.recommended_game.id }}" class="hover:underline">{{ getRecommendedTitle(data) }}</router-link> Recommendation
          </h2>
          <div class="mt-2 text-center text-sm leading-5 truncate text-gray-400">
            <router-link :to="{ name: 'Games', query: { platform: data.recommended_release.platform.id }}">
              <span class="tag ml-2">{{ data.recommended_release.platform.name }}</span>
            </router-link>
            <span class="ml-2">
              <router-link :to="{ name: 'UserProfile', params: { id: data.user.id }}">
                <span class="tag rounded-r-none">{{ data.user.username }}</span>
              </router-link>
              <span class="tag is-primary rounded-l-none">{{ data.created_at | dateFormat }}</span>
            </span>
          </div>
        </div>
      </div>

    </template>
    <template #content>

      <div class="px-4 py-5 sm:p-8" v-if="data">
        <Loading v-if="loading" :simple="true"/>
        <div v-else>
          <transition name="fade">
            <div v-if="!editing">
              <div class="flex justify-end w-full mb-4" v-if="currentUserEquals(data.user)">
                <div>
                  <button type="button" class="inline-flex items-center button button-warning" @click="editing=!editing">
                    <svg class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                    </svg>
                    Edit
                  </button>
                </div>
              </div>

              <div class="text-center text-lg italic text-gray-500">
                "If you liked <router-link :to="{ name: 'Game', params: { id: data.game.id }}" class="is-link">{{ getTitle(data) }}</router-link> ({{ data.release.platform.name }}),
                you may also like <router-link :to="{ name: 'Game', params: { id: data.recommended_game.id }}" class="is-link">{{ getRecommendedTitle(data) }}</router-link>
                ({{ data.recommended_release.platform.name }})"
              </div>

              <div class="mt-5 markdown" v-html="compiledMarkdown(data.content)"></div>
              <div class="mt-5 text-gray-300">Last Updated: {{ data.updated_at | dateFormat }}</div>
            </div>
          </transition>

          <transition name="fade">
            <EditForm v-if="editing" :recommendation="data" v-on:save="update($event)" v-on:cancel="editing=false" />
          </transition>
        </div>
      </div>

    </template>
  </Overlap>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Overlap from '@/components/pages/Overlap.vue'
import EditForm from '@/components/forms/edit/Recommendation.vue'
import { recommendationService } from '@/services';
import { iconsMixin, getResourceMixin, gameTitleMixin, authMixin } from '@/mixins';

export default {
  name: 'Recommendation',
  mixins: [iconsMixin, getResourceMixin, gameTitleMixin, authMixin],
  components: {
    Loading, Overlap, EditForm
  },
  methods: {
    getData (id) {
      const { dispatch } = this.$store;
      recommendationService.get(this.$route.params.id).then(
        response => {
          this.data = response.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    update (data) {
      this.data.content = data.content;
    }
  },
}
</script>
