<template>
  <LibraryFetch :statusId="1" :user="user" title="Currently Playing" />
</template>

<script>
import LibraryFetch from '@/components/LibraryFetch.vue'

export default {
  name: 'UserLibraryPlaying',
  props: ['user'],
  components: {
    LibraryFetch
  },
}
</script>
