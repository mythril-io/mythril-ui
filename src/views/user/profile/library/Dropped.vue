<template>
  <LibraryFetch :statusId="5" title="Dropped" />
</template>

<script>
import LibraryFetch from '@/components/profile/LibraryFetch.vue'

export default {
  name: 'UserLibraryDropped',
  components: {
    LibraryFetch
  },
}
</script>
