<template>
  <div>
    <Hero title="Browse Games" />
    <Container style="max-width: 100rem !important;">
      <div>

        <div class="flex mt-8 flex-wrap">
          <div class="w-full xl:w-1/4">
            <GamesFilter v-on:update="applyFilters($event)" />
          </div>
          <div class="w-full xl:w-3/4 pt-8 xl:pt-0 xl:pl-8">
            <Loading v-if="loading & newRequest" :simple="true" />
            <div v-else>
              <Message v-if="!games.items || games.items.length == 0" content="No games found." />
              <div v-else>
                <Message content="Curious on how games are organized/consolidated? Please take a look at our FAQ to get a better understanding." />

                <div class="mt-8 grid grid-cols-2 gap-6" style="max-width: 85rem !important;">
                  <div v-for="game in games.items" :key="game.id">
                    <GameCard :game="game" />
                  </div>
                </div>

                <infinite-loading v-if="games.has_next" @infinite="getMoreData">
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

export default {
  name: 'Games',
  components: {
    Hero, Container, Loading, Message, GameCard, GamesFilter
  },
  data () {
    return {
      games: null,
      page: 1,
      filters: null,
      newRequest: true,
      loading: true,
    }
  },
  methods: {
    getData (filters=null) {
      const { dispatch } = this.$store;
      this.loading = true;
      return gameService.getByPage(this.page, filters).then(
        response => {
          if (this.newRequest) {
            this.newRequest = false;
            this.games = response.data;
          } else {
            this.games.has_next = response.data.has_next
          }
          this.page = response.data.next_num;
          this.loading = false;

          return response;
        },
        error => {
          dispatch('alert/error', "Unable to load games", { root: true });
        }
      );
    },
    getMoreData ($state) {
      this.getData(this.filters).then(
        response => {
          if (response.data.items.length) {
            this.games.items.push(...response.data.items);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      );
    },
    applyFilters(filters) {
      var developers = JSON.stringify(filters.developers);
      var publishers = JSON.stringify(filters.publishers);
      var platforms = JSON.stringify(filters.platforms);
      var genres = JSON.stringify(filters.genres);
      this.$router.replace({
        query: {
          search: filters.search,
          developers: developers,
          publishers: publishers,
          platforms: platforms,
          genres: genres,
          score: filters.score,
          // sort: filters.sort,
        }
      });

      this.page = 1;
      this.newRequest = true;
      this.filters = JSON.parse(JSON.stringify(filters));
      this.getData(filters);
    },
  },
  created () {
    // var search = location.search.substring(1);
    // var filters = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    // this.filters = filters;
    this.getData();
  },
}
</script>
