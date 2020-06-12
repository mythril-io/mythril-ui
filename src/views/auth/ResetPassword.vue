<template>
  <div class="min-h-3/4 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl leading-9 title">
        Reset Password
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

        <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <div>
            <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
              Email address
            </label>
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <div class="mt-1">
                <input disabled id="email" v-model="email" type="email" required class="disabled input placeholder-gray-400 sm:text-sm sm:leading-5" />
              </div>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-6">
            <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
              Password
            </label>
              <ValidationProvider rules="required|min:6|alpha_dash|confirmed:password_confirmation" v-slot="{ errors }">
                <div class="mt-1">
                  <input id="password" v-model="password" type="password" required class="input placeholder-gray-400 sm:text-sm sm:leading-5" />
                </div>
                <span class="text-sm text-red-700">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>

          <div class="mt-6">
            <label for="confirmation" class="block text-sm font-medium leading-5 text-gray-700">
              Confirm Password
            </label>
            <ValidationProvider v-slot="{ errors }" vid="password_confirmation" name="password confirmation">
              <div class="mt-1">
                <input id="password_confirmation" v-model="password_confirmation" type="password" required class="input placeholder-gray-400 sm:text-sm sm:leading-5" />
              </div>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-6">
            <span class="block w-full">
              <button type="submit" class="w-full flex justify-center button button-primary">
                Reset Password
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
export default {
    data () {
      return {
        token: '',
        email: '',
        password: '',
        password_confirmation: '',
        submitted: false,
      }
    },
    methods: {
      submit () {
        this.submitted = true;
        const { token, email, password, password_confirmation } = this;
        this.$store.dispatch('authentication/resetPassword', { token, email, password, password_confirmation });
      }
    },
    created() {
      this.email = this.$route.query.email;
      this.token = this.$route.params.token;
    }
};
</script>
