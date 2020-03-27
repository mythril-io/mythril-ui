<template>
<div>

  <div v-if="simple" class="flex justify-center items-center" :class="heightClass">
    <div class="loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

  <div v-else class="bg-white overflow-hidden shadow rounded-lg mt-8">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex justify-center items-center" :class="heightClass">

        <div class="loader">
          <div></div>
          <div></div>
          <div></div>
        </div>

      </div>
    </div>
  </div>

</div>
</template>


<script>
export default {
  props: {
    simple: {
      type: Boolean,
      required: false,
      default: false
    },
    heightClass: {
      type: String,
      required: false
    }
  },
};
</script>

<style>
.loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #00D1B2;
  animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.loader div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.loader div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.loader div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes loader {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}

</style>
