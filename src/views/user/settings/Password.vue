<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
      <form @submit.prevent="handleSubmit(patch)">
        <div>
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Update Your Password
            </h3>
            <p class="mt-1 text-sm leading-5 text-gray-500">
              Never share your password with anyone!
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">

              <div class="sm:col-span-3">
                <label for="Password" class="block text-sm font-medium leading-5 text-gray-700">
                  Password
                </label>
                <ValidationProvider rules="required|min:8|confirmed:confirmation" v-slot="{ errors }">
                  <div class="mt-1 rounded-md shadow-sm">
                    <input id="Password" v-model="password" type="password" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                  <span class="text-sm text-red-700">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="sm:col-span-3">
                <label for="confirmation" class="block text-sm font-medium leading-5 text-gray-700">
                  Confirm Password
                </label>
                <ValidationProvider v-slot="{ errors }" vid="confirmation">
                  <div class="mt-1 rounded-md shadow-sm">
                    <input id="confirmation" v-model="confirmation" type="password" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                  <span class="text-sm text-red-700">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

            </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-5">
          <div class="flex justify-end">
            <span class="rounded-md shadow-sm">
              <button type="submit" class="button button-primary">
                Save
              </button>
            </span>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { userService } from '@/services';

export default {
  name: 'SettingsPassword',
  data () {
    return {
      password: '',
      confirmation: ''
    }
  },
  methods: {
    patch () {
      const { dispatch } = this.$store;
      const { observer } = this.$refs.observer;
      userService.patchPassword(this.password).then(
        response => {
          dispatch('alert/success', 'Password updated');
          this.password = '';
          this.confirmation = '';
          this.$refs.observer.reset();
        },
        error => {
          dispatch('alert/error', error);
        }
      );
    },
  },
}
</script>
