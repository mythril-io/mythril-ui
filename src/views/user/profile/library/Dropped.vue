<template>
  <LibraryFetch :statusId="5" :user="user" title="Dropped" />
</template>

<script>
import LibraryFetch from '@/components/LibraryFetch.vue'

export default {
  name: 'UserLibraryDropped',
  props: ['user'],
  components: {
    LibraryFetch
  },
}
</script>
