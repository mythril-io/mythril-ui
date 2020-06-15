<template>
<div>
  <Loading v-if="loading" :simple="true"/>
  <div v-else>

    <div v-if="deleting">

      <div class="mt-2">
        <p class="text-sm leading-5 text-gray-500">
          Are you sure you want to delete the following entry? This action cannot be undone.
        </p>
        <div class="mt-5 text-md form-input text-gray-500">
          {{ selected.release.platform.name }} - {{ selected.release.region.name }} {{ selected.release.alternate_title ? ' - ' + selected.release.alternate_title: '' }}
        </div>
      </div>

      <div class="mt-3 py-3 sm:flex sm:flex-row-reverse">
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button type="button" @click="deleteResource" class="inline-flex justify-center w-full button button-danger">
            Delete
          </button>
        </span>
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button @click="$emit('cancel')" type="button" class="inline-flex justify-center w-full button button-white">
            Cancel
          </button>
        </span>
      </div>
    </div>

    <div v-else>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(save)">
          <div class="p-4 rounded-md bg-gray-50 shadow">
            <div class="grid grid-cols-1 row-gap-3 col-gap-4 sm:grid-cols-6">
              <div class="sm:col-span-6">
                <label for="release" class="block text-sm font-medium leading-5 text-gray-700">
                  Release
                </label>
                <div v-if="selected" class="flex items-center mt-2 form-input opacity-50 cursor-not-allowed">
                  <div class="flex-1">
                    <h2 class="text-md text-gray-800 font-bold">
                      {{ entry.release.platform.name }}
                    </h2>
                    <div class="mt-0 text-sm leading-5 truncate text-gray-700">
                      {{ entry.release.region.name }} {{ entry.release.alternate_title ? ' - ' + entry.release.alternate_title: '' }}
                    </div>
                  </div>
                </div>
                <div v-else>
                  <ValidationProvider rules="required">
                    <SelectRelease id="release" name="release" :gameId="gameId" v-model="entry.release" />
                  </ValidationProvider>
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="status" class="block text-sm font-medium leading-5 text-gray-700">
                  Status
                </label>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <div class="mt-1 rounded-md shadow-sm">
                    <select id="status" v-model="entry.play_status" class="block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                      <option disabled value="">Select a Status</option>
                      <option v-for="status in playStatuses" v-bind:value="status" :key="status.id">{{ status.name }}</option>
                    </select>
                  </div>
                  <span class="text-sm text-red-700">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="sm:col-span-3">
                <label for="score" class="block text-sm font-medium leading-5 text-gray-700">
                  Score
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <select id="score" v-model="entry.score" class="block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    <option disabled :value="null">Select a Score</option>
                    <option v-for="n in 10" v-bind:value="n" :key="n">{{n}}</option>
                  </select>
                </div>
              </div>

              <div class="sm:col-span-1 flex items-center">
                <div class="relative flex items-start">
                  <div class="absolute flex items-center h-5">
                    <input id="own" type="checkbox" value="1" v-model="entry.own" class="form-checkbox h-4 w-4 text-primary transition duration-150 ease-in-out" />
                  </div>
                  <div class="pl-7 text-sm leading-5">
                    <label for="own" class="font-medium text-gray-700">Own it?</label>
                    <!-- <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p> -->
                  </div>
                </div>
              </div>

              <div class="sm:col-span-1 flex items-center">
                <div class="relative flex items-start">
                  <div class="absolute flex items-center h-5">
                    <input id="digital" type="checkbox" v-model="entry.digital" class="form-checkbox h-4 w-4 text-primary transition duration-150 ease-in-out" />
                  </div>
                  <div class="pl-7 text-sm leading-5">
                    <label for="digital" class="font-medium text-gray-700">Digital?</label>
                    <!-- <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p> -->
                  </div>
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="hours" class="block text-sm font-medium leading-5 text-gray-700">
                  Hours Played
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input id="hours" v-model="entry.hours" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="notes" class="block text-sm font-medium leading-5 text-gray-700">
                  Notes
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <textarea id="notes" v-model="entry.notes" rows="2" class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 py-3 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="submit" class="inline-flex justify-center w-full button button-primary">
                Save
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
    </div>

  </div>
</div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import SelectRelease from '@/components/forms/SelectRelease.vue'
import { libraryService } from '@/services';

export default {
  name: 'LibraryForm',
  components: {
    SelectRelease, Loading
  },
  props: {
    gameId: {
      type: Number,
      required: true
    },
    library: {
      type: Array,
      required: true
    },
    playStatuses: {
      type: Array,
      required: true
    },
    selected: {
      type: Object,
      required: false,
      default: null
    },
    deleting: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      new: true,

      entry: {
        release: null,
        play_status: '',
        own: 1,
        digital: 0,
        hours: null,
        score: null,
        notes: '',
      },
    }
  },
  methods: {
    save () {
      this.new ? this.validate() : this.patch();
    },
    validate () {
      // Make sure user doesn't already have an entry for the specified release
      const match = this.library.find((item) => item.release.id == this.entry.release.id);

      if (!match) {
        this.post();
      } else {
        this.$store.dispatch('alert/error', "Duplicate entries not allowed", { root: true });
      }
    },
    setCheckboxValues() {
      this.entry.own ? this.entry.own = 1 : this.entry.own = 0;
      this.entry.digital ? this.entry.digital = 1 : this.entry.digital = 0;
    },
    post () {
      this.setCheckboxValues();
      const { dispatch } = this.$store;
      const _this = this;
      const release_id = this.entry.release.id;
      const play_status_id = this.entry.play_status.id;

      let resource = JSON.parse(JSON.stringify(this.entry));
      resource.release_id = release_id;
      resource.play_status_id = play_status_id;
      delete resource.release;
      delete resource.play_status;

      libraryService.post(resource).then(
        response => {
          _this.$emit('post', response.data)
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    patch () {
      this.setCheckboxValues();
      const { dispatch } = this.$store;
      const _this = this;
      const resource = {
        id: this.entry.id,
        digital: this.entry.digital,
        play_status_id: this.entry.play_status.id,
        score: this.entry.score,
        own: this.entry.own,
        notes: this.entry.notes,
        hours: this.entry.hours
      }
      libraryService.patch(resource).then(
        response => {
          _this.$emit('patch')
          dispatch('alert/success', response.data.message, { root: true });
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    deleteResource () {
      const { dispatch } = this.$store;
      const _this = this;

      libraryService.deleteResource(this.selected.id).then(
        response => {
          _this.$emit('delete', this.selected)
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
  },
  created () {
    if (this.selected) {
      this.new = false;
      this.entry = JSON.parse(JSON.stringify(this.selected));
    }
  }
}
</script>
