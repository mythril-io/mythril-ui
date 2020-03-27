<template>
<div>
  <Loading v-if="loading" :simple="false"/>

  <div v-if="!loading">
    <Title v-if="true" :title="title"/>

    <div v-show="true">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <!-- <h3 class="text-lg font-medium leading-6 text-gray-900">Create a Platform</h3> -->
            <p class="mt-1 text-sm leading-5 text-gray-500">
              Please provide a platform name and acronym.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(save)">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div>
                    <label for="name" class="block text-sm font-medium leading-5 text-gray-700">
                      Name
                    </label>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <input id="name" v-model="resource.name" class="form-input flex-1 block w-full rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="Dreamcast" />
                      </div>
                      <span class="text-sm text-red-700">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="mt-6">
                    <label for="acronym" class="block text-sm leading-5 font-medium text-gray-700">
                      Acronym
                    </label>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <input id="acronym" v-model="resource.acronym" class="form-input flex-1 block w-full rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="DC" />
                      </div>
                      <span class="text-sm text-red-700">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="button" @click="cancel" class="button button-white leading-5 mr-2">
                    Cancel
                  </button>
                  <button type="submit" class="button button-primary leading-5 ">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>

    <div v-show="false" class="bg-white overflow-hidden overflow-hidden shadow rounded-lg">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(save)">
          <div class="px-4 py-5 sm:p-6">
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <!-- <h3 class="text-lg font-medium leading-6 text-gray-900">Create a Platform</h3> -->
                <p class="mt-1 text-sm leading-5 text-gray-500">
                  Please provide a platform name and acronym.
                </p>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <div>
                  <label for="name" class="block text-sm font-medium leading-5 text-gray-700">
                    Name
                  </label>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input id="name" v-model="resource.name" class="form-input flex-1 block w-full rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="Dreamcast" />
                    </div>
                    <span class="text-sm text-red-700">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="mt-6">
                  <label for="acronym" class="block text-sm leading-5 font-medium text-gray-700">
                    Acronym
                  </label>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input id="acronym" v-model="resource.acronym" class="form-input flex-1 block w-full rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="DC" />
                    </div>
                    <span class="text-sm text-red-700">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="button" @click="cancel" class="button button-white leading-5 mr-2">
              Cancel
            </button>
            <button type="submit" class="button button-primary leading-5 ">
              Save
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>

</div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Title from '@/components/admin/Title.vue';
import { platformService } from '@/services';

export default {
  name: 'PlatformForm',
  components: {
    Title, Loading
  },
  data () {
      return {
          loading: false,
          resource: {
            name: '',
            acronym: ''
          },
      }
  },
  computed: {
      title () {
          if (this.$route.params.id) {
            return "Edit a Platform";
          } else {
            return "Create a Platform"
          }
      }
  },
  methods: {
    save() {
      if (this.resource.id) {
        this.put(this.resource);
      } else {
        this.post(this.resource);
      }
    },
    cancel() {
      this.$router.push({ name: 'AdminPlatforms' });
    },
    post (resource) {
      const { dispatch } = this.$store;
      platformService.post(resource).then(
        response => {
          this.$router.push({ name: 'AdminPlatforms' });
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    put (resource) {
      const { dispatch } = this.$store;
      platformService.put(resource).then(
        response => {
          this.$router.push({ name: 'AdminPlatforms' });
          dispatch('alert/success', response.data.message, { root: true });
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
  },
  created () {
      if (this.$route.params.id) {
        this.loading = true;
        const { dispatch } = this.$store;
        platformService.get(this.$route.params.id).then(
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
