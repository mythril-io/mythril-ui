<template>
  <div>

    <div class="bg-gray-50 sm:rounded-lg xl:block">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex flex-wrap items-center">
          <div class="flex-1">
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input id="search" v-model="search" class="form-input block w-full pl-10 sm:text-sm sm:leading-5" placeholder="Search" />
            </div>
          </div>
          <div class="flex-initial xl:hidden ml-4">
            <span class="inline-flex">
              <button type="button" class="inline-flex items-center button leading-5 button-primary" @click="showFilters=!showFilters">
                <svg class="-mx-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </span>
          </div>
        </div>

        <div class="xl:block" v-bind:class="{ hidden: !showFilters }">
          <h3 class="mt-5 text-lg leading-6 font-medium text-gray-900">
            Filters
          </h3>
          <Loading v-if="!genres.length && !platforms.length && !developers.length && !publishers.length" :simple="true" />
          <div v-else class="mt-2 max-w text-sm leading-5 text-gray-500">
            <multiselect
              v-model="selectedGenres"
              :options="genres"
              :multiple="true"
              @input="setGenres"
              track-by="name"
              label="name"
              placeholder="Genres"
              id="genres"
            >
            </multiselect>
            <multiselect
              class="mt-3"
              v-model="selectedPlatforms"
              :options="platforms"
              :multiple="true"
              @input="setPlatforms"
              track-by="name"
              label="name"
              placeholder="Platforms"
              id="platforms"
            >
            </multiselect>
            <multiselect
              class="mt-3"
              v-model="selectedDevelopers"
              :options="developers"
              :multiple="true"
              @input="setDevelopers"
              track-by="name"
              label="name"
              placeholder="Developers"
              id="developers"
            >
            </multiselect>
            <multiselect
              class="mt-3"
              v-model="selectedPublishers"
              :options="publishers"
              :multiple="true"
              @input="setPublishers"
              track-by="name"
              label="name"
              placeholder="Publishers"
              id="publishers"
            >
            </multiselect>
            <h3 class="mt-5 text-lg leading-6 font-medium text-gray-900">
              Minimum Average Score
            </h3>
            <vue-slider class="mt-3"
              v-model="score"
              :lazy="true"
              :min-range="0"
              :max-range="100"
            />  
            <h3 class="mt-5 text-lg leading-6 font-medium text-gray-900">
              Sort
            </h3>
            <div class="mt-1 rounded-md shadow-sm">
              <select id="sort" v-model="sort" class="block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                <option value="popular">Popularity</option>
                <option value="recent">Recently Added</option>
                <option value="rating">Average Score</option>
              </select>
            </div>      
            <button type="button" name="clear-filters" @click="clearFilters" class="mt-6 button button-danger w-full">Clear Filters</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import BaseCard from '@/components/cards/Base.vue'
import Loading from '@/components/Loading.vue'
import VueSlider from 'vue-slider-component'
import { developerService, publisherService, genreService, platformService } from '@/services';
import _ from 'lodash';

export default {
  name: 'GamesFilter',
  components: {
    VueSlider, Loading
  },
  data () {
    return {
      showFilters: false,

      genres: [],
      platforms: [],
      developers: [],
      publishers: [],
    }
  },
  computed: {
    search: {
      set: _.debounce(function(search) {
          this.$store.dispatch('games/updateSearch', { search });
          this.applyFilters();
        }, 500),
      get() {
        return this.$store.state.games.filters.search;
      }
    },
    score: {
      set(score) {
        this.$store.dispatch('games/updateScore', { score });
        this.applyFilters();    
      },
      get() {
        return this.$store.state.games.filters.score;
      }
    },
    sort: {
      set(sort) {
        this.$store.dispatch('games/updateSort', { sort });
        this.applyFilters();    
      },
      get() {
        return this.$store.state.games.filters.sort;
      }
    },
    selectedGenres: {
      get() { 
        let values = this.$store.state.games.filters.genres;
        if(values) {
          return values.map(value => this.genres.find(option => option.id === value));
        }
        return null;
      },
      set(v) {
        let genres = v.map(value => value.id);
        this.$store.dispatch('games/updateGenres', { genres });
      }
    },
    selectedPlatforms: {
      get() { 
        let values = this.$store.state.games.filters.platforms;
        if(values) {
          return values.map(value => this.platforms.find(option => option.id === value));
        }
        return null;
      },
      set(v) {
        let platforms = v.map(value => value.id);
        this.$store.dispatch('games/updatePlatforms', { platforms });
      }
    },
    selectedDevelopers: {
      get() { 
        let values = this.$store.state.games.filters.developers;
        if(values) {
          return values.map(value => this.developers.find(option => option.id === value));
        }
        return null;
      },
      set(v) {
        let developers = v.map(value => value.id);
        this.$store.dispatch('games/updateDevelopers', { developers });
      }
    },
    selectedPublishers: {
      get() { 
        let values = this.$store.state.games.filters.publishers;
        if(values) {
          return values.map(value => this.publishers.find(option => option.id === value));
        }
        return null;
      },
      set(v) {
        let publishers = v.map(value => value.id);
        this.$store.dispatch('games/updatePublishers', { publishers });
      }
    }
  },
  methods: {
    setGenres() {
      var genres = [];
      this.selectedGenres ? genres = this.selectedGenres.map(a => a.id) : '';

      this.$store.dispatch('games/updateGenres', { genres }); 
      this.applyFilters();
    },
    setPlatforms() {
      var platforms = [];
      this.selectedPlatforms ? platforms = this.selectedPlatforms.map(a => a.id) : '';

      this.$store.dispatch('games/updatePlatforms', { platforms }); 
      this.applyFilters();
    },
    setDevelopers() {
      var developers = [];
      this.selectedDevelopers ? developers = this.selectedDevelopers.map(a => a.id) : '';

      this.$store.dispatch('games/updateDevelopers', { developers }); 
      this.applyFilters();
    },
    setPublishers() {
      var publishers = [];
      this.selectedPublishers ? publishers = this.selectedPublishers.map(a => a.id) : '';

      this.$store.dispatch('games/updatePublishers', { publishers }); 
      this.applyFilters();
    },
    applyFilters() {
      this.$emit('update');
    },
    clearFilters() {
      this.$store.dispatch('games/clearFilters');
      this.$emit('update');
    },
    getGenres() {
      const { dispatch } = this.$store;
      genreService.getAll().then(
        response => this.genres = response.data,
        error => dispatch('alert/error', error, { root: true })
      );
    },
    getPlatforms() {
      const { dispatch } = this.$store;
      platformService.getAll().then(
        response => this.platforms = response.data,
        error => dispatch('alert/error', error, { root: true })
      );
    },
    getDevelopers() {
      const { dispatch } = this.$store;
      developerService.getAll().then(
        response => this.developers = response.data,
        error => dispatch('alert/error', error, { root: true })
      );
    },
    getPublishers() {
      const { dispatch } = this.$store;
      publisherService.getAll().then(
        response => this.publishers = response.data,
        error => dispatch('alert/error', error, { root: true })
      );
    },
  },
  created () {
    this.getGenres();
    this.getPlatforms();
    this.getDevelopers();
    this.getPublishers();
  },
}
</script>

<style lang="scss">
/* VueSlider Component */
$themeColor: #00D1B2;
@import '~vue-slider-component/lib/theme/default.scss';

/* vue-multiselect Component */
@import '~vue-multiselect/dist/vue-multiselect.min.css';
</style>
