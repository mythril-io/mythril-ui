<template>
  <div>
    <Hero title="Browse Games" />
    <Container style="max-width: 100rem !important;">
      <div>

        <div class="flex mt-8 flex-wrap">
          <div class="w-full xl:w-1/4">
            <GamesFilter v-on:update="applyFilters" />
          </div>
          <div class="w-full xl:w-3/4 pt-8 xl:pt-0 xl:pl-8">
            <Loading v-if="loading & newRequest" :simple="true" />
            <div v-else>
              <Message v-if="!games.data || games.data.length == 0" content="No games found." />
              <div v-else>
                <Message content="Curious on how games are organized/consolidated? Please take a look at our FAQ to get a better understanding." />

                <div class="mt-8 grid grid-cols-2 gap-6" style="max-width: 85rem !important;">
                  <div v-for="game in games.data" :key="game.id">
                    <GameCard :game="game" />
                  </div>
                </div>

                <infinite-loading v-if="games.next_page_url" @infinite="getMoreData">
                  <div slot="spinner">
                    <Loading :simple="true"/>
                  </div>
                  <div slot="no-more"></div>
                  <div slot="no-results"></div>
                </infinite-loading>
              </div>
            </div>

          </div>
        </div>

      </div>
    </Container>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Container from '@/components/layout/Container.vue'
import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'
import GameCard from '@/components/cards/Game.vue'
import GamesFilter from '@/components/filters/Games.vue'
import { gameService } from '@/services';
import _ from 'lodash';

export default {
  name: 'Games',
  components: {
    Hero, Container, Loading, Message, GameCard, GamesFilter
  },
  data () {
    return {
      games: null,
      page: 1,
      newRequest: true,
      loading: true,
    }
  },
  methods: {
    getData () {
      const { dispatch } = this.$store;
      const filters = this.$store.state.games.filters;

      this.loading = true;
      return gameService.getByPage(this.page, filters).then(
        response => {
          if (this.newRequest) {
            this.newRequest = false;
            this.games = response.data;
          } else {
            this.games.next_page_url = response.data.next_page_url
          }
          this.page = ++response.data.current_page;
          this.loading = false;

          return response;
        },
        error => {
          dispatch('alert/error', "Unable to load games", { root: true });
        }
      );
    },
    getMoreData ($state) {
      this.getData().then(
        response => {
          if (response.data.data.length) {
            this.games.data.push(...response.data.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      );
    },
    applyFilters() {
      let filters = this.$store.state.games.filters;

      let query = {
        search: filters.search,
        developers: JSON.stringify(filters.developers),
        publishers: JSON.stringify(filters.publishers),
        platforms: JSON.stringify(filters.platforms),
        genres: JSON.stringify(filters.genres),
        score: filters.score,
        // sort: filters.sort,
      }

      _.isEqual(this.$route.query, query) ? '' : this.$router.replace({ query: query });

      this.page = 1;
      this.newRequest = true;
      this.getData();
    },
    setFiltersByQuery() {
      // Remove "[" and "]"
      const genresString = this.$route.query.genres ? this.$route.query.genres.substr(1).slice(0, -1) : null;
      const platformsString = this.$route.query.platforms ? this.$route.query.platforms.substr(1).slice(0, -1) : null;
      const developersString = this.$route.query.developers ? this.$route.query.developers.substr(1).slice(0, -1) : null;
      const publishersString = this.$route.query.publishers ? this.$route.query.publishers.substr(1).slice(0, -1) : null;

      // Prepare values
      let score = this.$route.query.score;
      let search = this.$route.query.search;
      let genres = genresString ? genresString.split(',').map(x=>+x) : null;
      let platforms = platformsString ? platformsString.split(',').map(x=>+x) : null;
      let developers = developersString ? developersString.split(',').map(x=>+x) : null;
      let publishers = publishersString ? publishersString.split(',').map(x=>+x) : null;

      // Dispatch store actions
      score ? this.$store.dispatch('games/updateScore', { score }) : '';
      search ? this.$store.dispatch('games/updateSearch', { search }) : '';
      genres ? this.$store.dispatch('games/updateGenres', { genres }) : '';
      platforms ? this.$store.dispatch('games/updatePlatforms', { platforms }) : '';
      developers ? this.$store.dispatch('games/updateDevelopers', { developers }) : '';
      publishers ? this.$store.dispatch('games/updatePublishers', { publishers }) : '';
    }
  },
  watch: {
      '$route.query': {
          handler() {
              this.setFiltersByQuery()
          },
          immediate: true,
      },
  },
  created () {
    this.getData();
  },
}
</script>
