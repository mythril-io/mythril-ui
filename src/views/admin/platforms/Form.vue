<template>
<div>
  <Title title="Platforms"/>

  <div class="bg-white overflow-hidden overflow-hidden shadow rounded-lg">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(save)">
        <div class="px-4 py-5 sm:p-6">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Create a Platform</h3>
              <p class="mt-1 text-sm leading-5 text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div>
                <label for="name" class="block text-sm font-medium leading-5 text-gray-700">
                  Name
                </label>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input id="name" v-model="platform.name" class="form-input flex-1 block w-full rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="Dreamcast" />
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
                    <input id="acronym" v-model="platform.acronym" class="form-input flex-1 block w-full rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="DC" />
                  </div>
                  <span class="text-sm text-red-700">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 ">
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="button" @click="$emit('cancel')" class="button button-white leading-5 mr-2">
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
</template>

<script>
import Title from '@/components/admin/Title.vue';

export default {
  props: {
    resource: {
      type: Object,
      required: false,
      default: null
    }
  },
  components: {
    Title
  },
  data () {
      return {
          platform: {
            name: '',
            acronym: ''
          },
      }
  },
  methods: {
    save() {
      this.$emit('save', this.platform);
    }
  },
  created () {
      if (this.resource) {
        // Deep copy
        this.platform = JSON.parse(JSON.stringify(this.resource));
      }
  },
}
</script>
