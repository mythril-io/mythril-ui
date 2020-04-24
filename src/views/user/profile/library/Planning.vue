<template>
  <LibraryFetch :statusId="2" :user="user" title="Planning" />
</template>

<script>
import LibraryFetch from '@/components/profile/LibraryFetch.vue'

export default {
  name: 'UserLibraryPlanning',
  props: ['user'],
  components: {
    LibraryFetch
  },
}
</script>
