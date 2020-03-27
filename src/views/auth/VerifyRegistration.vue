<template>
  <div class="min-h-3/4 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-3xl">
      <h2 class="mt-6 text-center text-2xl leading-9 title">
        Verifying your registration ...
      </h2>
    </div>
  </div>
</template>

<script>
import { userService } from '@/services';
import { router } from '@/router';

export default {
    data () {
        return {
            token: ''
        }
    },
    created () {
        this.token = this.$route.query.token;
        this.verify();
    },
    methods: {
        verify () {
            const { token } = this;
            const { dispatch } = this.$store;
            if (token) {
              dispatch('authentication/verify', { token });
            }
        }
    }
};
</script>
