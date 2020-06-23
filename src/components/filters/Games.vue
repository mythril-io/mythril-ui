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
              <input id="search" v-model="filters.search" class="form-input block w-full pl-10 sm:text-sm sm:leading-5" placeholder="Search" />
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
          <div class="mt-2 max-w text-sm leading-5 text-gray-500">
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
              v-model="filters.score"
              :lazy="true"
              :min-range="0"
              :max-range="100"
            />            
            <button type="button" name="clear-filters" @click="clearFilters" class="mt-6 button button-danger w-full">Clear Filters</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import BaseCard from '@/components/cards/Base.vue'
import VueSlider from 'vue-slider-component'
import { developerService, publisherService, genreService, platformService } from '@/services';
import _ from 'lodash';

export default {
  name: 'GamesFilter',
  components: {
    VueSlider
  },
  data () {
    return {
      showFilters: false,

      genres: [],
      platforms: [],
      developers: [],
      publishers: [],

      selectedGenres: [],
      selectedPlatforms: [],
      selectedDevelopers: [],
      selectedPublishers: [],

      filters: {
        genres: [],
        platforms: [],
        developers: [],
        publishers: [],
        score: 0,
        search: ''
      }
    }
  },
  watch: {
      filters: {
          handler(newVal, oldVal) {
            this.applyFilters();
          },
          deep: true,
      },
  },
  methods: {
    applyFilters() {
        this.$emit('update', this.filters);
    },
    clearFilters() {
      let reset = {
        genres: [],
        platforms: [],
        developers: [],
        publishers: [],
        score: 0,
        search: ''
      }
      this.filters = reset;
      this.selectedGenres = [];
      this.selectedPlatforms = [];
      this.selectedDevelopers = [];
      this.selectedPublishers = [];
    },
    setPlatforms() {
      if (this.selectedPlatforms) {
        this.filters.platforms = this.selectedPlatforms.map(a => a.id);
      } else {
        this.filters.platforms = [];
      }
      this.applyFilters();
    },
    setGenres() {
      if (this.selectedGenres) {
        this.filters.genres = this.selectedGenres.map(a => a.id);
      } else {
        this.filters.genres = [];
      }
      this.applyFilters();
    },
    setDevelopers() {
      if (this.selectedDevelopers) {
        this.filters.developers = this.selectedDevelopers.map(a => a.id);
      } else {
        this.filters.developers = [];
      }
      this.applyFilters();
    },
    setPublishers() {
      if (this.selectedPublishers) {
        this.filters.publishers = this.selectedPublishers.map(a => a.id);
      } else {
        this.filters.publisher = [];
      }
      this.applyFilters();
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
