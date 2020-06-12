<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(save)">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6">
            <label for="alternate_title" class="block text-sm font-medium leading-5 text-gray-700">Alternate Title (Optional)</label>
            <input id="alternate_title" v-model="release.alternate_title" class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>

          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <label for="platform" class="block text-sm font-medium leading-5 text-gray-700">Platform</label>
            <ValidationProvider rules="required" name="platform" v-slot="{ errors }">
              <multiselect
                v-model="release.platform"
                :options="platforms"
                track-by="name"
                label="name"
                placeholder="Select a Platform"
                :disabled="existingRelease ? true : false"
                id="platform"
              >
              </multiselect>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label for="publisher" class="block text-sm font-medium leading-5 text-gray-700">Publisher</label>
            <ValidationProvider rules="required" name="publisher" v-slot="{ errors }">
              <multiselect
                v-model="release.publisher"
                :options="publishers"
                track-by="name"
                label="name"
                placeholder="Select a Publisher"
                :disabled="existingRelease ? true : false"
                id="publisher"
              >
              </multiselect>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label for="codeveloper" class="block text-sm font-medium leading-5 text-gray-700">Co-Developer (Optional)</label>
            <multiselect
              v-model="release.codeveloper"
              :options="developers"
              track-by="name"
              label="name"
              placeholder="Select a Co-Developer"
              id="codeveloper"
            >
            </multiselect>
          </div>

          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <label for="region" class="block text-sm font-medium leading-5 text-gray-700">Region</label>
            <ValidationProvider rules="required" name="region" v-slot="{ errors }">
              <multiselect
                v-model="release.region"
                :options="regions"
                track-by="name"
                label="name"
                placeholder="Select a Region"
                :disabled="existingRelease ? true : false"
                id="region"
              >
              </multiselect>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label for="date_type" class="block text-sm font-medium leading-5 text-gray-700">Date Type</label>
            <ValidationProvider rules="required" name="date type" v-slot="{ errors }">
              <multiselect
                v-model="release.date_type"
                :options="dateTypes"
                track-by="format"
                label="format"
                placeholder="Select a Date Type"
                id="date_type"
              >
              </multiselect>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label for="date" class="block text-sm font-medium leading-5 text-gray-700">Date</label>
            <flat-pickr name="date" v-model="release.date" class="input" :config='flatPickrConfig' placeholder="Select Date"></flat-pickr>
          </div>
        </div>

        <div class="mt-3 py-3 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button type="submit" class="inline-flex justify-center w-full button button-primary">
              {{ existingRelease ? 'Save' : 'Create' }}
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button @click="$emit('cancel')" type="button" class="inline-flex justify-center w-full button button-white">
              Cancel
            </button>
          </span>
        </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { developerService, publisherService, genreService, platformService, regionService, dateTypeService, releaseService } from '@/services';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'ReleaseForm',
  components: {
    flatPickr
  },
  props: {
    existingRelease: {
      type: Object,
      default: null,
    },
    gameId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      developers: [],
      publishers: [],
      platforms: [],
      regions: [],
      dateTypes: [],
      flatPickrConfig: { dateFormat: "Y-m-d" },

      release: {
        alternate_title: '',
        platform: null,
        publisher: null,
        codeveloper: null,
        region: null,
        date: null,
        date_type: null
      },
    }
  },
  methods: {
    save(){
      this.existingRelease ? this.patch() : this.post();
    },
    prepareResource() {
      const platform_id = this.release.platform.id;
      const publisher_id = this.release.publisher.id;
      const codeveloper_id = this.release.codeveloper ? this.release.codeveloper.id : null;
      const region_id = this.release.region.id;
      const date_type_id = this.release.date_type.id;

      let resource = JSON.parse(JSON.stringify(this.release));
      resource.platform_id = platform_id;
      resource.publisher_id = publisher_id;
      resource.codeveloper_id = codeveloper_id;
      resource.region_id = region_id;
      resource.date_type_id = date_type_id;
      resource.game_id = this.gameId;

      delete resource.platform;
      delete resource.publisher;
      delete resource.codeveloper;
      delete resource.region;
      delete resource.date_type;

      return resource;
    },
    post() {
      const { dispatch } = this.$store;
      let resource = this.prepareResource();

      releaseService.post(resource).then(
        response => {
          dispatch('alert/success', 'Release created', { root: true });
          this.$emit('create');
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    patch() {
      const { dispatch } = this.$store;
      let resource = this.prepareResource();

      releaseService.patch(resource).then(
        response => {
          dispatch('alert/success', 'Release updated', { root: true });
          this.$emit('update');
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
    getPlatforms() {
      const { dispatch } = this.$store;
      platformService.getAll().then(
        response => this.platforms = response.data,
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
    getRegions() {
      const { dispatch } = this.$store;
      regionService.getAll().then(
        response => this.regions = response.data,
        error => dispatch('alert/error', error, { root: true })
      );
    },
    getDateTypes() {
      const { dispatch } = this.$store;
      dateTypeService.getAll().then(
        response => this.dateTypes = response.data,
        error => dispatch('alert/error', error, { root: true })
      );
    },
  },
  watch: {
      'existingRelease': {
          handler() {
            if (this.existingRelease) {
              this.release = JSON.parse(JSON.stringify(this.existingRelease));
            } else {
              this.release = {
                alternate_title: '',
                platform: null,
                publisher: null,
                codeveloper: null,
                region: null,
                date: null,
                date_type: null
              };
            }
          },
          immediate: true,
      }
  },
  created () {
      this.getDevelopers();
      this.getPlatforms();
      this.getPublishers();
      this.getRegions();
      this.getDateTypes();
  },
}
</script>
