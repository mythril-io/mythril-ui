<template>
  <Overlap :coverPhoto="data ? getGameBannerStyle(data.release.game.banner) : ''">
    <template #header>

      <div class="flex justify-center items-center h-40" v-if="data">
        <div>
          <h2 class="text-center text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
            <router-link :to="{ name: 'Game', params: { id: data.release.game.id, slug: data.release.game.slug }}" class="hover:underline">{{ getTitle(data) }}</router-link> Review
          </h2>
          <div class="mt-2 text-center text-sm leading-5 truncate text-gray-400">
            <router-link :to="{ name: 'Games', query: { platform: data.release.platform.id }}">
              <span class="tag ml-2">{{ data.release.platform.name }}</span>
            </router-link>
            <span class="ml-2">
              <router-link :to="{ name: 'UserProfile', params: { username: data.user.username }}">
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
            <div v-if="!editing" >
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

              <div class="markdown" v-html="compiledMarkdown(data.content)"></div>

              <div class="flex justify-center items-center mt-10">
                <div class="flex justify-center items-center is-primary rounded-md p-7 shadow">
                  <span class="font-bold text-5xl leading-9">
                    {{ data.score }}%
                  </span>
                </div>
              </div>

              <div class="mx-auto w-full lg:w-4/5 -mt-5">
                <div class="bg-gray-50 rounded-md text-center px-4 pt-12 pb-8">
                  <div>
                    {{ data.summary }}
                  </div>
                  <!-- <div class="flex flex-wrap md:flex-no-wrap md:items-center justify-center md:justify-between mt-5">
                    <div class="text-center mb-2 md:mb-0 w-full md:w-auto order-2 md:order-none text-sm text-gray-600">
                      <span v-if="totalLikes">
                        {{ data.likes }} out of {{ totalLikes }} users liked this review
                      </span>
                      <span v-else>No users have liked this review</span>
                    </div>
                    <div class="mb-2 md:mb-0 order-1 md:order-none">
                      <button type="button" class="leading-5 button button-sentiment fill-current" :class="userSentiment==1 ? 'text-white bg-primary' : 'text-primary'"  @click="like">
                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 -mx-1">
                          <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                        </svg>
                      </button>
                      <button type="button" class="ml-2 leading-5 button button-sentiment fill-current" :class="userSentiment==0 ? 'text-white bg-danger' : 'text-danger'" @click="dislike">
                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 -mx-1">
                          <path d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <progress v-if="totalLikes" max="100" class="progress mt-2" :value="likePercentage">{{ likePercentage }}</progress> -->
                </div>
              </div>

              <div class="mt-5 text-sm tracking-tight text-gray-300">Last Updated: {{ data.updated_at | dateFormat }}</div>
            </div>
          </transition>

          <transition name="fade">
            <EditForm v-if="editing" :review="data" v-on:save="update($event)" v-on:cancel="editing=false" />
          </transition>

        </div>
      </div>

    </template>
  </Overlap>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Overlap from '@/components/layout/Overlap.vue'
import EditForm from '@/components/forms/edit/Review.vue'
import { reviewService } from '@/services';
import { iconsMixin, getResourceMixin, gameTitleMixin, authMixin } from '@/mixins';

export default {
  name: 'Review',
  mixins: [iconsMixin, getResourceMixin, gameTitleMixin, authMixin],
  components: {
    Loading, Overlap, EditForm
  },
  data () {
    return {
      userSentiment: null,
    }
  },
  computed: {
    totalLikes () {
      return this.data.likes + this.data.dislikes
    },
    likePercentage () {
      if (this.totalLikes == 0) {
        return 0
      }
      return Math.round((this.data.likes / (this.totalLikes))*100)
    }
  },
  methods: {
    like() {
      if(!this.getCurrentUser()) {
        return this.$router.push({ name: 'Login' });
      }
      const { dispatch } = this.$store;
      reviewService.like(this.$route.params.id).then(
        response => {
          this.data.likes = response.data.like_count;
          this.data.dislikes = response.data.dislike_count;
          this.userSentiment = response.data.user_sentiment;
        },
        error => {
          dispatch('alert/error', 'Unable to like review', { root: true });
        }
      );
    },
    dislike() {
      if(!this.getCurrentUser()) {
        return this.$router.push({ name: 'Login' });
      }
      const { dispatch } = this.$store;
      reviewService.dislike(this.$route.params.id).then(
        response => {
          this.data.likes = response.data.like_count;
          this.data.dislikes = response.data.dislike_count;
          this.userSentiment = response.data.user_sentiment;
        },
        error => {
          dispatch('alert/error', 'Unable to dislike review', { root: true });
        }
      );
    },
    getUserSentiment () {
      const { dispatch } = this.$store;
      reviewService.getUserSentiment(this.$route.params.id).then(
        response => this.userSentiment = response.data.user_sentiment,
      );
    },
    getData (id) {
      const { dispatch } = this.$store;
      this.getCurrentUser() ? this.getUserSentiment() : ''

      reviewService.get(this.$route.params.id).then(
        response => {
          this.data = response.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          dispatch('alert/error', 'Unable to retrieve data', { root: true });
        }
      );
    },
    update (data) {
      this.data.content = data.content;
      this.data.summary = data.summary;
    }
  },
}
</script>
