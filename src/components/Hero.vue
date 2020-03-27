<template>
  <div class="py-10 bg-primary text-white bg-no-repeat bg-fixed bg-position" v-bind:class="character">
    <Container :padding="false" class="py-2 text-3xl sm:text-4xl md:text-4xl font-light tracking-tight subpixel-antialiased">
      <span class="bg-primary p-1">{{ title }}</span>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/layout/Container.vue'

export default {
  components: {
    Container
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    character: {
      type: String,
      required: false,
      default: 'botw-link'
    },
  },
};
</script>

<style media="screen">
.bg-position {
  background-position: 65% 0%;
}
.botw-link {
  background-image: url('https://mythril.nyc3.cdn.digitaloceanspaces.com/general/login-register-link.png');
}
</style>
