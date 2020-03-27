<template>
  <div class="min-h-3/4 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl leading-9 title">
        Resend Verification Email
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

        <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div>
            <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
              Email address
            </label>
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <div class="mt-1">
                <input id="email" v-model="email" type="email" required class="input placeholder-gray-400 sm:text-sm sm:leading-5" />
              </div>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-6">
            <span class="block w-full">
              <button type="submit" class="w-full flex justify-center button button-primary">
                Submit
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
import { userService } from '@/services';
import { router } from '@/router';

export default {
    data () {
        return {
            email: '',
            submitted: false
        }
    },
    methods: {
        onSubmit () {
            this.submitted = true;
            const { email } = this;
            const { dispatch } = this.$store;
            if (email) {
              userService.resendVerification(email)
                  .then(
                      response => {
                          dispatch('alert/success', response.data.message, { root: true });
                      },
                      error => {
                          dispatch('alert/error', error, { root: true });
                      }
                  );
            }
        }
    }
};
</script>
