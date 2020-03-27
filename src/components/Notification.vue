<template>

  <transition name="fade">
    <div v-if="show" :class="`fixed z-50 right-0 bottom-0 mr-5 mb-5 p-4 rounded-md overflow-hidden shadow-xl transform transition-all ${type}`">
      <slot></slot>
    </div>
  </transition>

</template>

<script>

export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      show: true,
    }
  },
  methods: {
    hide () {
      this.show = false
    }
  },
  created () {
    setTimeout(this.hide, 3000);
  }
}
</script>

<style lang="scss" scoped>
.alert-success {
  @apply bg-primary text-white
}
.alert-danger {
  @apply bg-danger text-white
}
</style>
