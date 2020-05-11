<template>
  <div class="min-h-3/4 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl leading-9 title">
        Verify Your Email Address
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

        Before you can use your account, please check your email for a verification link.
        If you did not receive the email, <a class="is-link" @click="submit">click here to request another</a>.

      </div>
    </div>
  </div>
</template>

<script>
import { userService } from '@/services';

export default {
    methods: {
      submit () {
        const { dispatch } = this.$store;
        userService.resendVerification()
          .then(
              response => dispatch('alert/success', response.message, { root: true }),
              error => dispatch('alert/error', error.message, { root: true })
          );
      }
    }
};
</script>
