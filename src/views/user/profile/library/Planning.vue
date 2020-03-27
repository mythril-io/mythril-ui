<template>
  <LibraryFetch :statusId="2" title="Planning" />
</template>

<script>
import LibraryFetch from '@/components/profile/LibraryFetch.vue'

export default {
  name: 'UserLibraryPlanning',
  components: {
    LibraryFetch
  },
}
</script>
