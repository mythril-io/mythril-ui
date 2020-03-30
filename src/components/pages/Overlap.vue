<template>
  <div class="bg-gray-50">

    <div class="bg-primary py-10 pb-32 border-t border-gray-700" v-bind:style="coverPhoto">
      <Container :padding="false">

        <slot name="header"></slot>

      </Container>
    </div>

    <main class="-mt-20 pb-12">
      <Container :padding="false">
        <div class="bg-white overflow-hidden shadow rounded-lg min-h-1/2">

          <slot name="content"></slot>

        </div>
      </Container>
    </main>

  </div>
</template>

<script>
import Container from '@/components/layout/Container.vue'

export default {
  name: 'OverlapPage',
  props: ['coverPhoto'],
  components: {
    Container
  },
  // props: {
  //   coverPhoto: {
  //     type: Object,
  //     required: false,
  //     default: null
  //   }
  // },
}
</script>
