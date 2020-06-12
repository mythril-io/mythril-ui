<template>
<BaseModal :open="open" width="sm:max-w-4xl">
  <template #body>

    <ReleaseForm
      :gameId="gameId"
      :existingRelease="release"
      v-on:create="$emit('create')"
      v-on:update="$emit('update')"
      v-on:cancel="$emit('cancel')"
    />

  </template>
</BaseModal>
</template>

<script>
import BaseModal from '@/components/modals/Base.vue'
import ReleaseForm from '@/components/forms/Release.vue'

export default {
  name: 'ReleaseModal',
  components: {
    BaseModal, ReleaseForm
  },
  props: {
    release: {
      type: Object,
      default: null,
    },
    open: {
      type: Boolean,
      required: true,
    },
    gameId: {
      type: Number,
      required: true
    }
  }
}
</script>
