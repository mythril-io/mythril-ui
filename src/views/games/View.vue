<template>
  <Overlap :coverPhoto="data ? getGameBannerStyle(data.banner) : ''">
    <template #header>

      <div class="min-w-0 flex-1 lg:flex sm:items-center sm:justify-between" v-if="data">
        <div>
          <div class="lg:flex items-center">
            <div class="flex-shrink-0">
              <img class="inline-block h-48 w-48 lg:h-56 lg:w-56 rounded-md" :src="getGameIcon(data)" :alt="data.title" />
            </div>
            <div class="flex-1 mt-3 lg:mt-0 lg:ml-4">
              <h2 class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
                {{ data.title }}
              </h2>
              <div class="mt-0 text-sm leading-5 truncate text-gray-400" v-if="data">
                Developed by: {{ data.developer.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 lg:mt-0 lg:h-56 flex items-end">
          <div class="flex items-center">
            <button type="button" class="leading-5 button" v-bind:class="[userHasLibrary ? 'button-warning' : 'button-primary']" @click="openLibraryModal">
              {{ userHasLibrary ? 'Edit Library' : 'Add to Library' }}
            </button>
            <button type="button" class="ml-2 leading-5 button button-danger" @click="openFavouriteModal">
              <svg v-if="userHasFavourite" fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5 -mx-1">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
              </svg>
              <svg v-else fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5 -mx-1">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <transition name="modal-bg">
        <LibraryModal
          v-if="data && libraryModal"
          :open="libraryModal"
          :game="data"
          v-on:update="updateUserHasLibrary($event)"
          v-on:cancel="libraryModal=false"
        />
      </transition>

      <transition name="modal-bg">
        <FavouriteModal
          v-if="data && favouriteModal"
          :open="favouriteModal"
          :game="data"
          v-on:post="userHasFavourite=true"
          v-on:delete="userHasFavourite=false"
          v-on:cancel="favouriteModal=false"
        />
      </transition>

    </template>
    <template #content>

      <div class="bg-gray-50">
        <div>
          <div class="sm:hidden">
            <select class="form-select block w-full" @change="changeTab($event.target.value)">
              <option value="Game">Overview</option>
              <option value="GameReviews">Reviews</option>
              <option value="GameRecommendations">Recommendations</option>
              <option value="GameReleases">Releases</option>
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
import { gameService } from '@/services';

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
      userHasFavourite: false,
      userHasLibrary: false
    }
  },
  methods: {
    openLibraryModal () {
      this.getCurrentUser() ? this.libraryModal=true : this.$router.push({ name: 'Login' });
    },
    openFavouriteModal () {
      this.getCurrentUser() ? this.favouriteModal=true : this.$router.push({ name: 'Login' });
    },
    updateUserHasLibrary(libraryLength) {
      libraryLength > 0 ? this.userHasLibrary = true : this.userHasLibrary = false;
    },
    changeTab(routeName) {
      this.$router.push({ name: routeName });
    },
    getUserStatus(id) {
      gameService.getUserStatus(id).then(
        response => {
          this.userHasFavourite = (response.data.favourite == "true");
          this.userHasLibrary = (response.data.library == "true");
        },
        error => { }
      );
    },
    getData (id) {
      // Obtain current user's library and favourite
      this.getCurrentUser() ? this.getUserStatus(id) : ''

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
  },
}
</script>
