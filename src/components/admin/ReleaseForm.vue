<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(save)">
      <div class="shadow sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
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
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button type="submit" class="button button-white leading-5">
            Add Release
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { developerService, publisherService, genreService, platformService, regionService, dateTypeService } from '@/services';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'ReleaseForm',
  components: {
    flatPickr
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
      this.$emit('add-release', this.release);
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
  created () {
      this.getDevelopers();
      this.getPlatforms();
      this.getPublishers();
      this.getRegions();
      this.getDateTypes();
  },
}
</script>
