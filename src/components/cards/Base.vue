<template>
<div class="bg-white overflow-hidden shadow rounded-lg">
  <div v-if="header" class="border-b border-gray-200 px-4 py-5 sm:px-6">
    <!-- We use less vertical padding on card headers on desktop than on body sections -->
    <slot name="header"></slot>
  </div>
  <div v-bind:class="{ 'px-4 py-5 sm:p-6': padding }">
    <slot name="body"></slot>
  </div>
  <div v-if="footer" class="border-t border-gray-200 px-4 py-4 sm:px-6">
    <!-- We use less vertical padding on card footers at all sizes than on headers or body sections -->
    <slot name="footer"></slot>
  </div>
</div>
</template>

<script>
export default {
    name: 'BaseCard',
    props: {
      header: {
        type: Boolean,
        required: false,
        default: false
      },
      footer: {
        type: Boolean,
        required: false,
        default: false
      },
      padding: {
        type: Boolean,
        required: false,
        default: true
      },
    },
};
</script>
