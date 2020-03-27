<template>
  <div>
    <Loading v-if="!game" :simple="true" />

    <div v-else>
      <!-- <div class="flex justify-end">
        <div>
          <span class="tag is-dark rounded-r-none">Score</span>
          <span class="tag is-primary rounded-l-none">{{ game.score | percentageFormat }}</span>
        </div>
        <div class="ml-2">
          <span class="tag is-dark rounded-r-none">Ranked</span>
          <span class="tag rounded-l-none">#{{ game.score_rank }}</span>
        </div>
        <div class="ml-2">
          <span class="tag is-dark rounded-r-none">Popularity</span>
          <span class="tag rounded-l-none">#{{ game.popularity_rank }}</span>
        </div>
      </div>
      <div class="mt-3">
          <progress max="100" class="progress" :value="game.score">{{ game.score | percentageFormat }}</progress>
      </div> -->

      <div class="grid md:grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-7">
          <Title title="Description" />
          <div class="bg-gray-50 p-4 rounded-md">
            <span v-html="compiledMarkdown"></span>
          </div>
          <!-- <Title class="mt-6" title="Recent Reviews" />
          <Message content="No reviews found. Be the first to write one! Write a Review" />
          <Title class="mt-6" title="Recent Recommendations" />
          <Message content="No recommendations found. Be the first to write one! Write a Recommendation" /> -->
        </div>
        <div class="col-span-12 md:col-span-5">

          <div class="grid grid-cols-3 gap-4 mb-5">
            <div>
              <div class="text-center md:text-xs lg:text-base font-medium tracking-widest is-dark p-1 rounded-tl rounded-tr">
                Score
              </div>
              <div>
                <div class="flex justify-center items-center is-primary rounded-bl rounded-br p-4 opacity-75">
                  <span class="font-bold text-3xl md:text-2xl lg:text-3xl leading-9">
                    {{ game.score | percentageFormat }}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div class="text-center text-base md:text-xs lg:text-base font-medium tracking-widest is-dark p-1 rounded-tl rounded-tr">
                Ranked
              </div>
              <div>
                <div class="flex justify-center items-center is-primary rounded-bl rounded-br p-4 opacity-75">
                  <span class="font-bold text-3xl md:text-2xl lg:text-3xl leading-9">
                    #{{ game.score_rank }}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div class="text-center text-base md:text-xs lg:text-base font-medium tracking-widest is-dark p-1 rounded-tl rounded-tr">
                Popularity
              </div>
              <div>
                <div class="flex justify-center items-center is-primary rounded-bl rounded-br p-4 opacity-75">
                  <span class="font-bold text-3xl md:text-2xl lg:text-3xl leading-9">
                    #{{ game.popularity_rank }}
                  </span>
                </div>
              </div>
            </div>

          </div>

          <Title class="mb-0.5" title="Genres" />
          <div>
            <span class="first:-ml-2" v-for="genre in orderedGenres(game.genres)" :key="genre.id">
              <span class="tag ml-2" :aria-label="genre.name" data-balloon-pos="up">
                {{ genre.acronym }}
              </span>
            </span>
          </div>

          <Title class="mt-4 mb-0.5" title="Platforms" />
          <div>
            <span class="first:-ml-2" v-for="platform in orderedPlatforms(game.releases)" :key="platform.id">
              <span class="tag ml-2" :aria-label="platform.name" data-balloon-pos="up">
                {{ platform.acronym }}
              </span>
            </span>
          </div>

          <Title class="mt-4 mb-0.5" title="Recent User Activity" />

          <div v-show="true">
            <Loading v-if="loading" :simple="true" />
            <div class="grid grid-cols-4 gap-2" v-if="userActivity.length > 0 && !loading">
              <div class="flex items-center justify-center mb-3" v-for="entry in userActivity" :key="entry.id">
                <Tooltip :content="`${entry.user.username}: ${entry.play_status.name} (${entry.release.platform.name})`">
                  <router-link :to="{ name: 'UserProfile', params: { id: entry.user.id }}" class="overflow-hidden inline-block h-24 w-24 rounded-md border border-gray-100">
                    <img class="h-full w-full object-cover opacity-75 hover:opacity-100 cursor-pointer transition hover:scale-105 transform duration-150 ease-in-out" :src="getUserAvatar(entry.user)" :alt="entry.user.username" />
                  </router-link>
                </Tooltip>
              </div>
            </div>
            <Message v-if="userActivity.length == 0 && !loading" content="No recent user activity :(" />
          </div>

          <!-- <Title class="mt-4 mb-0.5" title="Users" /> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Tooltip from '@/components/Tooltip.vue'
import Title from '@/components/Title.vue'
import Message from '@/components/Message.vue'
import _ from 'lodash';
var md = require("markdown-it")();
import { libraryService } from '@/services';

export default {
  name: 'GameOverview',
  props: ['game'],
  components: {
    Loading, Title, Message, Tooltip
  },
  data () {
    return {
      loading: false,
      userActivity: []
    }
  },
  computed: {
    compiledMarkdown: function() {
      return md.render(this.game.synopsis);
    },
  },
  methods: {
    orderedPlatforms(releases) {
      var platforms = _.map(releases, "platform");
      var sorted = _.orderBy(platforms, ["name"], ["asc"]);
      return _.uniqBy(sorted, "id");
    },
    orderedGenres(genres) {
      return _.orderBy(genres, ["name"], ["asc"]);
    },
    getUserAvatar(user) {
      if (user.avatar) {
        return this.$store.state.userAvatarURL + user.avatar;
      }
      return this.$store.state.userAvatarURL + 'default.jpg'
    },
    getRecentUserActivity (id) {
      this.loading = true;
      const { dispatch } = this.$store;
      libraryService.getRecentForGame(this.$route.params.id).then(
        response => {
          this.userActivity = response.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          dispatch('alert/error', error, { root: true });
        }
      );
    }
  },
  created () {
      if (this.$route.params.id) {
        this.getRecentUserActivity(this.$route.params.id)
      }
  },
}
</script>

<style lang="scss">
  .progress {
    -webkit-appearance: none;
    border: none;
    border-radius: 290486px;
    display: block;
    height: 0.75rem;
    overflow: hidden;
    padding: 0;
    width: 100%;
  }
  .progress::-moz-progress-bar {
      background-color: #00d1b2;
  }
</style>
