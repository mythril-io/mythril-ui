<template>

  <div class="mx-auto px-4 sm:px-6 lg:px-8" v-bind:class="maxWidth">
    <div v-bind:class="{ 'py-4 mb-6': padding }">

      <slot></slot>

    </div>
  </div>

</template>

<script>
export default {
    name: 'Container',
    props: {
      padding: {
        type: Boolean,
        required: false,
        default: true
      },
      maxWidth: {
        type: String,
        required: false,
        default: 'max-w-7xl'
      },
    },
};
</script>
