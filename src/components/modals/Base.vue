<template>

  <transition name="modal-bg">
    <div v-show="open" class="z-50 fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <transition name="modal-bg">
        <div v-show="open" class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
      </transition>

      <transition name="modal">
        <div v-show="open" class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full max-h-3/4 overflow-y-visible" v-bind:class="width">

          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <slot name="body"></slot>
          </div>

          <div v-if="footer" class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <slot name="footer"></slot>
          </div>

        </div>
      </transition>
    </div>
  </transition>

</template>

<script>
export default {
    name: 'BaseModal',
    props: {
      open: {
        type: Boolean,
        required: true,
      },
      width: {
        type: String,
        required: false,
        default: 'sm:max-w-lg'
      },
      footer: {
        type: Boolean,
        required: false,
        default: false
      },
    },
};
</script>
