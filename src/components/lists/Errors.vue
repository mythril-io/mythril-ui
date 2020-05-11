<template>

  <ul class="ml-5 list-disc text-sm">
    <li v-for="(error, index) in errors" :key="index">
      <span class="text-red-700">{{ error[0] }}</span>
    </li>
  </ul>

</template>

<script>
export default {
    name: 'ErrorList',
    props: {
      errors: {
        type: Array,
        required: true
      },
    },
};
</script>
