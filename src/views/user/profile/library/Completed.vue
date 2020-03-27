<template>
  <LibraryFetch :statusId="3" title="Completed" />
</template>

<script>
import LibraryFetch from '@/components/profile/LibraryFetch.vue'

export default {
  name: 'UserLibraryCompleted',
  components: {
    LibraryFetch
  },
}
</script>
