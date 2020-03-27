<template>
  <div class="w-full p-4 rounded-md" v-bind:class="background">
    <slot></slot>
    {{ content }}
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: false
    },
    background: {
      type: String,
      required: false,
      default: 'bg-teal-50'
    },
  },
};
</script>
