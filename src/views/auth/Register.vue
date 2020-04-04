<template>
<div>
  <Hero title="Join the community!" />

  <div class="min-h-3/4 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl leading-9 title">
        Register an account
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
            <label for="username" class="block text-sm font-medium leading-5 text-gray-700">
              Username
            </label>
            <ValidationProvider rules="required|alpha_num|min:2" v-slot="{ errors }">
              <div class="mt-1">
                <input id="username" v-model="username" type="text" required class="input placeholder-gray-400 sm:text-sm sm:leading-5" />
              </div>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-6">
            <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
              Password
            </label>
              <ValidationProvider rules="required|min:6|alpha_dash|confirmed:confirmation" v-slot="{ errors }">
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
            <ValidationProvider v-slot="{ errors }" vid="confirmation">
              <div class="mt-1">
                <input id="confirmation" v-model="confirmation" type="password" required class="input placeholder-gray-400 sm:text-sm sm:leading-5" />
              </div>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <vue-recaptcha :sitekey="siteKey" :loadRecaptchaScript="true">
                <button type="submit" class="w-full flex justify-center button button-primary">
                  Register
                </button>
              </vue-recaptcha>
            </span>
          </div>
        </form>
        </ValidationObserver>
        <div class="mt-4 text-center">
          <router-link :to="{ name: 'SendVerifyEmail' }" class="is-muted-link">
            Resend Verification Email
          </router-link>
        </div>


      </div>
    </div>
  </div>
</div>
</template>

<script>
import { userService } from '@/services';
import { router } from '@/router';
import VueRecaptcha from 'vue-recaptcha';
import Hero from '@/components/Hero.vue'

export default {
    data () {
        return {
            email: '',
            username: '',
            password: '',
            confirmation: '',
            siteKey: '6LenYE8UAAAAAOcNkodpMA6oWf2f4JVk_9GjYXGW',
            submitted: false
        }
    },
    components: { VueRecaptcha, Hero },
    methods: {
        onSubmit () {
            this.submitted = true;
            const { email, username, password } = this;
            const { dispatch } = this.$store;
            if (email && username && password) {
              userService.register(email, username, password)
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
