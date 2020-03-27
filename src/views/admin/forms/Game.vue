<template>
<div>
  <Loading v-if="loading" :simple="false"/>

  <div v-if="!loading">
    <Title v-if="true" :title="title"/>

    <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(save)">

    <div>
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Game Details</h3>
            <p class="mt-1 text-sm leading-5 text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3">
                  <label for="username" class="block text-sm font-medium leading-5 text-gray-700">
                    Title
                  </label>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input id="title" v-model="resource.title" class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>
                    <span class="text-sm text-red-700">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

              <div class="mt-6">
                <label for="synopsis" class="block text-sm leading-5 font-medium text-gray-700">
                  Synopsis
                </label>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <div class="rounded-md shadow-sm">
                    <textarea id="synopsis" v-model="resource.synopsis" rows="3" class="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="Brief description of the game. Do not include spoilers."></textarea>
                  </div>
                  <span class="text-sm text-red-700">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="mt-6 grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="developer" class="block text-sm font-medium leading-5 text-gray-700">Developer</label>
                  <ValidationProvider rules="required" name="developer" v-slot="{ errors }">
                    <multiselect
                      v-model="resource.developer"
                      :options="developers"
                      track-by="name"
                      label="name"
                      placeholder="Select a Developer"
                      id="developer"
                    >
                    </multiselect>
                    <span class="text-sm text-red-700">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="genres" class="block text-sm font-medium leading-5 text-gray-700">Genres</label>
                  <ValidationProvider rules="required" name="genre" v-slot="{ errors }">
                    <multiselect
                      v-model="resource.genres"
                      :options="genres"
                      :multiple="true"
                      track-by="name"
                      label="name"
                      placeholder="Select Genres"
                      id="genres"
                    >
                    </multiselect>
                    <span class="text-sm text-red-700">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

              <div class="mt-6">
                <label for="icon" class="block text-sm leading-5 font-medium text-gray-700">
                  Icon
                </label>
                <div class="mt-2 flex items-center">
                  <span v-if="!resource.icon" class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <span v-else class="inline-block h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                    <img :src="resource.icon" v-if="resource.icon.length > 10" />
                    <img :src="$store.state.cdnURL + 'games/icons/' + resource.icon" v-else />
                  </span>
                  <span class="ml-5 rounded-md shadow-sm">
                    <image-upload @updateImage="updateIcon" name="icon">
                      <template #submit>
                        <a type="button" class="py-2 px-3 border border-gray-300 cursor-pointer rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                          Change
                        </a>
                      </template>
                      <template #remove="{ removeImage }">
                        <button type="button" @click="removeImage" class="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                          Remove
                        </button>
                      </template>
                    </image-upload>
                  </span>

                </div>
              </div>

              <div class="mt-6">
                <label for="cover_photo" class="block text-sm leading-5 font-medium text-gray-700">
                  Cover photo
                </label>
                <div class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" v-bind:class="{ 'banner-bg': resource.banner }" v-bind:style= "bannerStyle">
                  <div class="text-center">
                    <svg v-show="!resource.banner" class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="mt-1 text-sm text-gray-600">
                      <image-upload @updateImage="updateBanner" name="banner">
                        <template #submit>
                          <a type="button" class="is-link cursor-pointer">
                            Upload a file
                          </a>
                        </template>
                        <template #remove="{ removeImage }">
                          <button type="button" @click="removeImage" class="py-2 px-3 border border-gray-300 rounded-md button-white">
                            Remove
                          </button>
                        </template>
                      </image-upload>
                    </p>
                    <p v-show="!resource.banner" class="mt-1 text-xs text-gray-500">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden sm:block">
      <div class="py-5">
        <div class="border-t border-gray-200"></div>
      </div>
    </div>

    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Releases</h3>
            <p class="mt-1 text-sm leading-5 text-gray-500">
              A release must have at least the following:
              <ul class="mt-2 ml-5 list-disc">
                <li>Platform</li>
                <li>Publisher</li>
                <li>Region</li>
                <li>Date Type</li>
                <li>Date (depends on Date Type)</li>
              </ul>
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">

          <ReleaseForm @add-release="addRelease($event)"/>

        </div>

        <div class="col-span-3 mt-6 md:mt-0" v-show="resource.releases.length > 0">
          <div class="flex flex-col">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Alt. Title
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Platform
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Publisher
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Co-Developer
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Region
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Date Type
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white even:bg-gray-50" v-for="(release, index) in resource.releases" :key="index">
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                        {{ release.alternate_title ? release.alternate_title : '-' }}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {{ release.platform.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {{ release.publisher.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {{ release.codeveloper ? release.codeveloper.name : '-' }}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {{ release.region.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {{ release.date_type ? release.date_type.format : '-' }}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {{ release.date ? release.date : '-' }}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                        <a href="#" @click="removeRelease(release, index)" class="is-link">Remove</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden sm:block">
      <div class="py-5">
        <div class="border-t border-gray-200"></div>
      </div>
    </div>

    <div class="text-right">
      <button type="submit" class="button button-primary leading-5 ">
        Save
      </button>
    </div>

    </form>
    </ValidationObserver>
  </div>

</div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import Title from '@/components/admin/Title.vue';
import ReleaseForm from '@/components/admin/ReleaseForm.vue';
import { gameService, developerService, genreService } from '@/services';

export default {
  name: 'GameForm',
  components: {
    Title, Loading, ImageUpload, ReleaseForm
  },
  data () {
    return {
      loading: false,
      developers: [],
      genres: [],

      resource: {
        title: '',
        synopsis: '',
        developer: null,
        genres: null,
        icon: '',
        banner: '',
        releases: []
      },
    }
  },
  computed: {
    title () {
      if (this.$route.params.id) {
        return "Edit a Game";
      } else {
        return "Create a Game"
      }
    },
    bannerStyle () {
      if (this.resource && this.resource.banner) {
        if (this.resource.banner.length > 10 ) {
          return { background: 'url(' + this.resource.banner + ') center no-repeat'};
        } else {
          return { background: 'url(' + this.$store.state.cdnURL + 'games/banners/' + this.resource.banner + ') center no-repeat'};
        }
      }
      return ''
    }
  },
  methods: {
    addRelease(release) {
      const { dispatch } = this.$store;
      if(this.resource.releases.length > 0)
      {
        for(var j = 0; j < this.resource.releases.length; j++)
        {
          if(release.platform.name === this.resource.releases[j].platform.name &&
            release.publisher.name === this.resource.releases[j].publisher.name &&
            release.alternate_title === this.resource.releases[j].alternate_title &&
            release.region.name === this.resource.releases[j].region.name)
          {
            return dispatch('alert/error', 'This release already exists. Please enter different release details.', { root: true });
          }
        }
      }
      const releaseCopy = JSON.parse(JSON.stringify(release));
      this.resource.releases.push(releaseCopy);
    },
    removeRelease (release, i = -1) {
      var index = this.resource.releases.indexOf(release);
			this.resource.releases.splice(index, 1);
    },
    save() {
      if (this.resource.id) {
        this.put(this.resource);
      } else {
        this.post(this.resource);
      }
    },
    cancel() {
      this.$router.push({ name: 'AdminGames' });
    },
    post (resource) {
      const { dispatch } = this.$store;
      gameService.post(resource).then(
        response => {
          this.$router.push({ name: 'AdminGames' });
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    put (resource) {
      const { dispatch } = this.$store;
      gameService.put(resource).then(
        response => {
          this.$router.push({ name: 'AdminGames' });
          dispatch('alert/success', response.data.message, { root: true });
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    getDevelopers() {
      const { dispatch } = this.$store;
      developerService.getAll().then(
        response => this.developers = response.data,
        error => dispatch('alert/error', error, { root: true })
      );
    },
    getGenres() {
      const { dispatch } = this.$store;
      genreService.getAll().then(
        response => this.genres = response.data,
        error => dispatch('alert/error', error, { root: true })
      );
    },
    updateIcon(file) {
      this.resource.icon = file;
    },
    updateBanner(file) {
      this.resource.banner = file;
    }
  },
  created () {
      this.getDevelopers();
      this.getGenres();

      if (this.$route.params.id) {
        this.loading = true;
        const { dispatch } = this.$store;
        gameService.get(this.$route.params.id).then(
          response => {
            this.resource = response.data;
            this.loading = false;
          },
          error => {
            this.loading = false;
            dispatch('alert/error', error, { root: true });
          }
        );
      }
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.banner-bg {
  @apply border-none h-40 opacity-75 bg-cover #{!important}
}
</style>
