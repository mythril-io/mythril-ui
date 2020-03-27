<template>
  <div>
    <Playing />
    <Completed class="mt-7" />
    <Planning class="mt-7" />
    <OnHold class="mt-7" />
    <Dropped class="mt-7" />
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
  components: {
    Playing, Completed, Planning, OnHold, Dropped
  },
}
</script>
