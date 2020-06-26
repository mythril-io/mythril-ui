<template>
  <div>
    <form>
      <div>
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Avatar and Cover Photo
          </h3>
        </div>
        <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">

            <div class="sm:col-span-6 text-sm text-gray-500">
              Uploaded images may take some time for the changes to be reflected in your browser. Try resetting your browser cache. If that doesn't work, it's likely due to caching done at the server side.
            </div>

            <div class="sm:col-span-6">
              <label for="photo" class="block text-sm leading-5 font-medium text-gray-700">
                Avatar
              </label>
              <span class="mt-1 text-sm text-gray-500">Allowed Formats: JPEG, PNG. Max size: 3MB</span>
              <div class="mt-2 flex items-center">
                <span class="inline-block h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                  <img :src="getCurrentUserAvatar()" />
                </span>
                <span class="ml-5">
                  <image-upload @updateImage="updateAvatar" name="avatar">
                    <template #submit>
                      <a type="button" class="py-2 px-3 border border-gray-300 cursor-pointer rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                        Change
                      </a>
                    </template>
                  </image-upload>
                </span>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="cover_photo" class="block text-sm leading-5 font-medium text-gray-700">
                Cover photo
              </label>
              <span class="mt-1 text-sm text-gray-500">Allowed Formats: JPEG, PNG. Max size: 6MB</span>
              <div class="mt-2 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" v-bind:class="{ 'banner-bg': user.banner }" v-bind:style= "getUserBannerStyle(user.banner)">
                <div class="text-center">
                  <svg v-if="!user.banner" class="mx-auto h-12 w-12 text-gray-400 mb-5" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <image-upload @updateImage="updateBanner" name="banner">
                    <template #submit>
                      <a type="button" class="py-2 px-3 border bg-white border-gray-300 cursor-pointer rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                        Change
                      </a>
                    </template>
                  </image-upload>
                </div>
              </div>
            </div>
          </div>
      </div>
    </form>
  </div>
</template>

<script>
import ImageUpload from '@/components/ImageUploadV2.vue'
import { userService } from '@/services';
import { iconsMixin } from '@/mixins';

export default {
  name: 'SettingsImages',
  mixins: [iconsMixin],
  components: {
    ImageUpload
  },
  computed: {
    user() {
      return this.$store.state.authentication.user;
    }
  },
  methods: {
    updateAvatar(image) {
      const { dispatch } = this.$store;
      userService.patchAvatar(image).then(
        response => {
          dispatch('authentication/updateUser', response.data );
          dispatch('alert/success', 'Avatar updated', { root: true });
        },
        error => {
          dispatch('alert/error', 'Failed to update avatar' , { root: true });
        }
      );
    },
    updateBanner(image) {
      const { dispatch } = this.$store;
      userService.patchBanner(image).then(
        response => {
          dispatch('authentication/updateUser', response.data );
          dispatch('alert/success', 'Cover photo updated', { root: true });
        },
        error => {
          dispatch('alert/error', 'Failed to update cover photo' , { root: true });
        }
      );
    }
  },
}
</script>

<style lang="scss" scoped>
.banner-bg {
  @apply border-none h-56 opacity-75 bg-cover #{!important}
}
</style>
