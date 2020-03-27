<template>
  <div class="bg-gray-50">

    <div class="bg-primary py-10 pb-32 border-t border-gray-700" v-bind:style="coverPhoto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <slot name="header"></slot>

      </div>
    </div>

    <main class="-mt-20">
      <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow rounded-lg min-h-1/2">

          <slot name="content"></slot>

        </div>
      </div>
    </main>

  </div>
</template>

<script>
export default {
  name: 'OverlapPage',
  props: ['coverPhoto'],
  // props: {
  //   coverPhoto: {
  //     type: Object,
  //     required: false,
  //     default: null
  //   }
  // },
}
</script>
