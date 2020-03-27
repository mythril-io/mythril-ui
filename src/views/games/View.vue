<template>
  <Overlap :coverPhoto="data ? getGameBannerStyle(data.banner) : ''">
    <template #header>

      <div class="min-w-0 flex-1 md:flex sm:items-center sm:justify-between" v-if="data">
        <div>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="inline-block h-56 w-56 rounded-md" :src="getGameIcon(data)" :alt="data.title" />
            </div>
            <div class="flex-1 ml-4">
              <h2 class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
                {{ data.title }}
              </h2>
              <div class="mt-0 text-sm leading-5 truncate text-gray-400" v-if="data">
                Developed by: {{ data.developer.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:h-56 flex items-end">
          <div>
            <button type="button" class="leading-5 button button-primary" @click="openLibraryModal">
              Add to Library
            </button>
            <button type="button" class="ml-2 leading-5 button button-danger" @click="openFavouriteModal">
              <svg class="fill-current inline-block -mx-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path class="heroicon-ui" d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <transition name="modal-bg">
        <LibraryModal
          v-if="data && libraryModal"
          :open="libraryModal"
          :data="data"
          v-on:cancel="libraryModal=false"
        />
      </transition>

      <transition name="modal-bg">
        <FavouriteModal
          v-if="data && favouriteModal"
          :open="favouriteModal"
          :game="data"
          :favourite="favourite"
          v-on:post="updateFavourite($event)"
          v-on:delete="removeFavourite()"
          v-on:cancel="favouriteModal=false"
        />
      </transition>

    </template>
    <template #content>

      <div class="bg-gray-50">
        <div>
          <div class="sm:hidden">
            <select class="form-select block w-full">
              <router-link tag="option" :to="{ name: 'Game' }">Overview</router-link>
              <router-link tag="option" :to="{ name: 'GameReviews' }">Reviews</router-link>
              <router-link tag="option" :to="{ name: 'GameRecommendations' }">Recommendations</router-link>
              <router-link tag="option" :to="{ name: 'GameReleases' }">Releases</router-link>
            </select>
          </div>
          <div class="hidden sm:block">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex ">
                <router-link tag="a" :to="{ name: 'Game' }" exact class="is-tab">
                  Overview
                </router-link>
                <router-link tag="a" :to="{ name: 'GameReviews' }" class="is-tab">
                  Reviews
                </router-link>
                <router-link tag="a" :to="{ name: 'GameRecommendations' }" class="is-tab">
                  Recommendations
                </router-link>
                <router-link tag="a" :to="{ name: 'GameReleases' }" class="is-tab">
                  Releases ({{ data ? data.releases.length : '-'}})
                </router-link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-5 sm:p-6">
        <Loading v-show="loading" :simple="true"/>
        <div v-show="!loading">
          <transition name="fade" mode="out-in">
            <router-view :game="data" />
          </transition>
        </div>
      </div>

    </template>
  </Overlap>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Overlap from '@/components/pages/Overlap.vue'
import LibraryModal from '@/components/modals/Library.vue'
import FavouriteModal from '@/components/modals/Favourite.vue'
import { iconsMixin, getResourceMixin, authMixin } from '@/mixins';
import { gameService, favouriteService } from '@/services';

export default {
  name: 'Game',
  mixins: [iconsMixin, getResourceMixin, authMixin],
  components: {
    Loading, Overlap, LibraryModal, FavouriteModal
  },
  data () {
    return {
      libraryModal: false,
      favouriteModal: false,
      favourite: null,
    }
  },
  methods: {
    addFavourite () {
      this.getCurrentUser() ? this.favouriteModal=true : this.$router.push({ name: 'Login' });
    },
    updateFavourite(favourite) {
      this.favourite = favourite;
      this.favouriteModal = false;
      this.$store.dispatch('alert/success', 'Added to favourites', { root: true });
    },
    removeFavourite() {
      this.favourite = null;
      this.favouriteModal = false;
      this.$store.dispatch('alert/success', 'Removed from favourites', { root: true });
    },
    openLibraryModal () {
      this.getCurrentUser() ? this.libraryModal=true : this.$router.push({ name: 'Login' });
    },
    openFavouriteModal () {
      this.getCurrentUser() ? this.favouriteModal=true : this.$router.push({ name: 'Login' });
    },
    getData (id) {
      // Obtain current user's favourite
      this.getCurrentUser() ? this.getFavourite() : this.favourite=null;

      // Get game data
      const { dispatch } = this.$store;
      gameService.get(id).then(
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
    getFavourite () {
      favouriteService.getByGameAndUser(this.$route.params.id).then(
        response => this.favourite = response.data,
        error => { }
      );
    }
  },
}
</script>
