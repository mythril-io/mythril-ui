<template>
  <LibraryFetch :statusId="4" title="On Hold" />
</template>

<script>
import LibraryFetch from '@/components/profile/LibraryFetch.vue'

export default {
  name: 'UserLibraryOnHold',
  components: {
    LibraryFetch
  },
}
</script>
