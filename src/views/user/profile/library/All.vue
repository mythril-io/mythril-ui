<template>
  <div class="space-y-7">
    <Playing :user="user" />
    <Completed :user="user" />
    <Planning :user="user" />
    <OnHold :user="user" />
    <Dropped :user="user" />
  </div>
</template>


<script>
import Playing from '@/views/user/profile/library/Playing.vue'
import Completed from '@/views/user/profile/library/Completed.vue'
import Planning from '@/views/user/profile/library/Planning.vue'
import OnHold from '@/views/user/profile/library/OnHold.vue'
import Dropped from '@/views/user/profile/library/Dropped.vue'

export default {
  name: 'UserLibraryAll',
  props: ['user'],
  components: {
    Playing, Completed, Planning, OnHold, Dropped
  },
}
</script>
