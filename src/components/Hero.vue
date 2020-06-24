<template>
  <div class="py-10 text-white bg-no-repeat bg-fixed bg-position" v-bind:class="[character, backgroundClass]">
    <Container :padding="false" class="py-2" v-bind:class="{ 'text-center': center }">
      <span class="text-3xl sm:text-4xl md:text-4xl font-light tracking-tight subpixel-antialiased" v-bind:class="backgroundClass">{{ title }}</span>
      <div v-bind:class="{ 'flex justify-center': center }">
        <slot name="subtitle"></slot>
      </div>
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
    backgroundClass: {
      type: String,
      default: 'bg-primary',
    },
    character: {
      type: String,
      required: false,
      default: 'botw-link'
    },
    center: {
      type: Boolean,
      required: false,
      default: false
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
