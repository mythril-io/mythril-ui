<template>
  <LibraryFetch :statusId="4" :user="user" title="On Hold" />
</template>

<script>
import LibraryFetch from '@/components/LibraryFetch.vue'

export default {
  name: 'UserLibraryOnHold',
  props: ['user'],
  components: {
    LibraryFetch
  },
}
</script>
