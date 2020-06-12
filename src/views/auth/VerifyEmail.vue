<template>
  <div class="min-h-3/4 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-3xl">
      <h2 class="mt-6 text-center text-2xl leading-9 title">
        Verifying your email ...
      </h2>
    </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        id: '',
        token: '',
        expires: '',
        signature: ''
      }
    },
    created () {
      this.id = this.$route.params.id;
      this.token = this.$route.params.token;
      this.expires = this.$route.query.expires;
      this.signature = this.$route.query.signature;
      this.verify();
    },
    methods: {
      verify () {
        const { id, token, expires, signature } = this;
        this.$store.dispatch('authentication/verifyEmail', { id, token, expires, signature });
      }
    }
};
</script>
