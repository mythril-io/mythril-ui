<template>
  <div>
    <Tooltip :content="user.username">
      <router-link tag="a" :to="{ name: 'UserProfile', params: { id: user.id } }" class="overflow-hidden inline-block rounded-md border border-gray-100" v-bind:class="dimensions">
        <img class="h-full w-full object-cover opacity-75 hover:opacity-100 hover:scale-105 transform transition duration-150 ease-in-out" :src="getUserAvatar(user)" :alt="user.username" />
      </router-link>
    </Tooltip>
  </div>
</template>

<script>
import Tooltip from '@/components/Tooltip.vue'
import { iconsMixin } from '@/mixins';

export default {
  name: 'UserAvatar',
  mixins: [iconsMixin],
  props: {
    user: {
      type: Object,
      required: true
    },
    dimensions: {
      type: String,
      required: false,
      default: 'h-20 w-20'
    },
  },
  components: {
    Tooltip
  },
}
</script>
