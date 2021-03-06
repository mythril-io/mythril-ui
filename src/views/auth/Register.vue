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
        <form @submit.prevent="handleSubmit(submit)">
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
              <ValidationProvider rules="required|min:8|confirmed:password_confirmation" v-slot="{ errors }">
                <div class="mt-1">
                  <input id="password" v-model="password" type="password" required class="input placeholder-gray-400 sm:text-sm sm:leading-5" />
                </div>
                <span class="text-sm text-red-700">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>

          <div class="mt-6">
            <label for="password_confirmation" class="block text-sm font-medium leading-5 text-gray-700">
              Confirm Password
            </label>
            <ValidationProvider v-slot="{ errors }" vid="password_confirmation" name="password confirmation">
              <div class="mt-1">
                <input id="password_confirmation" v-model="password_confirmation" type="password" required class="input placeholder-gray-400 sm:text-sm sm:leading-5" />
              </div>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-6 flex justify-center">
            <ValidationProvider rules="required" name="recaptcha" v-slot="{ errors }">
              <vue-recaptcha
                ref="recaptcha"
                v-model="recaptchaToken"
                @verify="recaptchaToken=$event"
                @expired="onCaptchaExpired"
                :sitekey="siteKey"
                :loadRecaptchaScript="true"
              ></vue-recaptcha>
              <span class="text-sm text-red-700">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button :disabled="submitted" type="submit" class="w-full flex justify-center button button-primary">
                Register
              </button>
            </span>
          </div>
        </form>
        </ValidationObserver>

        <ErrorList v-if="errors" :errors="errors" class="mt-5" />

      </div>
    </div>
  </div>
</div>
</template>

<script>
import { router } from '@/router';
import VueRecaptcha from 'vue-recaptcha';
import Hero from '@/components/Hero.vue'
import ErrorList from '@/components/lists/Errors.vue'

export default {
    name: 'Register',
    data () {
      return {
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        submitted: false,
        siteKey: '6LekHd8UAAAAAJLPAcxWDj_EzWrQO2smK_APWJx5',
        recaptchaToken: '',
        errors: null
      }
    },
    components: { VueRecaptcha, Hero, ErrorList },
    methods: {
      submit () {
        this.submitted = true;
        const _this = this;
        const { email, username, password, password_confirmation, recaptchaToken } = this;

        this.$store.dispatch('authentication/register', { email, username, password, password_confirmation, recaptchaToken })
          .catch((error) => {
            this.errors = error.errors;
            _this.onCaptchaExpired();
            _this.submitted = false;
          })
      },
      onCaptchaExpired () {
        this.recaptchaToken = '';
        this.$refs.recaptcha.reset();
      }
    }
};
</script>
