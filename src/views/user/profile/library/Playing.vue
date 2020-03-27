<template>
  <LibraryFetch :statusId="1" title="Currently Playing" />
</template>

<script>
import LibraryFetch from '@/components/profile/LibraryFetch.vue'

export default {
  name: 'UserLibraryPlaying',
  components: {
    LibraryFetch
  },
}
</script>
