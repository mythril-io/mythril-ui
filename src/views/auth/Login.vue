<template>
  <div>
    <Hero title="Welcome back!" />
    <div class="min-h-3/4 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <div>
          <h2 class="mt-6 text-center text-3xl leading-9 title">
            Sign in to your account
          </h2>
        </div>
        <form class="mt-8" @submit.prevent="handleSubmit">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm">
            <div>
              <input aria-label="Username" name="username" v-model="username" type="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Username" />
            </div>
            <div class="-mt-px">
              <input aria-label="Password" name="password" v-model="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />
            </div>
          </div>

          <!-- <div class="mt-6 flex items-center justify-between">
            <div>
              <router-link :to="{ name: 'ForgotPassword' }" exact class="is-link">
                Forgot your password?
              </router-link>
            </div>
          </div> -->

          <div class="mt-6">
            <button type="submit" :disabled="loggingIn" class="group relative w-full flex justify-center button button-primary">
              <span class="absolute left-0 inset-y pl-3">
                <svg class="h-5 w-5 text-white group-hover:text-white transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    components: {
      Hero
    },
    computed: {
        loggingIn () {
            return this.$store.state.authentication.status.loggingIn;
        }
    },
    created () {
        // reset login status
        this.$store.dispatch('authentication/logout');
    },
    methods: {
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            const { dispatch } = this.$store;
            if (username && password) {
                dispatch('authentication/login', { username, password });
            }
        }
    }
};
</script>
