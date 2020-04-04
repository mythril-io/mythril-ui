<template>
<BaseModal :open="open" width="sm:max-w-4xl min-h-1/2">
  <template #body>

  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(save)">
        <div>
          <label for="release" class="block text-sm font-medium leading-5 text-gray-700">
            Release
          </label>
          <div v-if="favourite" class="flex items-center mt-2 form-input opacity-50 cursor-not-allowed">
            <div class="flex-1">
              <h2 class="text-md text-gray-800 font-bold">
                {{ favourite.release.platform.name }}
              </h2>
              <div class="mt-0 text-sm leading-5 truncate text-gray-700">
                {{ favourite.release.region.name }} {{ favourite.release.alternate_title ? ' - ' + favourite.release.alternate_title: '' }}
              </div>
            </div>
          </div>
          <SelectRelease v-else id="release" :options="game.releases" v-model="release" />
        </div>

        <div class="mt-3 py-3 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button v-if="favourite" type="submit" class="inline-flex justify-center w-full button button-danger">
              Remove
            </button>
            <button v-else type="submit" class="inline-flex justify-center w-full button button-primary">
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

  </template>
</BaseModal>
</template>

<script>
import BaseModal from '@/components/modals/Base.vue'
import SelectRelease from '@/components/forms/SelectRelease.vue'
import { favouriteService } from '@/services';

export default {
  name: 'FavouriteModal',
  components: {
    SelectRelease, BaseModal
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    game: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      favourite: null,
      release: null
    }
  },
  methods: {
    save() {
      this.favourite ? this.deleteResource() : this.post() ;
    },
    post () {
      const { dispatch } = this.$store;
      const _this = this;
      const resource = {
        'release': this.release,
        'game': {
          'id': this.game.id
        }
      }
      favouriteService.post(resource).then(
        response => {
          dispatch('alert/success', 'Added to favourites', { root: true });
          _this.$emit('post');
          _this.$emit('cancel');
        },
        error => {
          dispatch('alert/error', 'Unable to add favourite', { root: true });
        }
      );
    },
    deleteResource () {
      const { dispatch } = this.$store;
      const _this = this;
      favouriteService.deleteResource(this.favourite.id).then(
        response => {
          dispatch('alert/success', 'Removed from favourites', { root: true });
          _this.$emit('delete');
          _this.$emit('cancel');
        },
        error => {
          dispatch('alert/error', 'Unable to remove favourite', { root: true });
        }
      );
    },
    getFavourite () {
      this.loading = true;
      favouriteService.getByGameAndUser(this.$route.params.id).then(
        response => {
          this.favourite = response.data;
          this.loading = false;
        },
        error => { this.loading = false }
      );
    }
  },
  created () {
    this.$route.params.id ? this.getFavourite(this.$route.params.id) : ''
  }
}
</script>
