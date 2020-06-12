<template>
  <LibraryFetch :statusId="3" :user="user" title="Completed" />
</template>

<script>
import LibraryFetch from '@/components/LibraryFetch.vue'

export default {
  name: 'UserLibraryCompleted',
  props: ['user'],
  components: {
    LibraryFetch
  },
}
</script>
