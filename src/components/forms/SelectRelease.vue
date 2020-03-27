<template>
  <multiselect
    class="mt-2"
    v-model="inputVal"
    :options="options"
    track-by="id"

    placeholder="Select a Release"
    open-direction="bottom"
    :max-height="300"
    id="releases"
  >
  <template slot="singleLabel" slot-scope="props">
    <div class="flex items-center">
      <div class="flex-1">
        <h2 class="text-md text-gray-800 font-bold">
          {{ props.option.platform.name }}
        </h2>
        <div class="mt-0 text-sm leading-5 truncate text-gray-700">
          {{ props.option.region.name }} {{ props.option.alternate_title ? ' - ' + props.option.alternate_title: '' }}
        </div>
      </div>
    </div>
  </template>
  <template slot="option" slot-scope="props">
    <div class="flex items-center">
      <div class="flex-1">
        <h2 class="text-md text-gray-800 font-bold">
          {{ props.option.platform.name }}
        </h2>
        <div class="mt-0 text-sm leading-5 truncate text-gray-700">
          {{ props.option.region.name }} {{ props.option.alternate_title ? ' - ' + props.option.alternate_title: '' }}
        </div>
      </div>
    </div>
  </template>
  </multiselect>
</template>

<script>

export default {
  name: 'SelectRelease',
  props: ['value', 'options'],
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  watch: {
      'options': {
          handler(newValue) {
            this.inputVal = null;
          },
          immediate: true,
      }
  },
}
</script>

<style>
  @import '~vue-multiselect/dist/vue-multiselect.min.css';
</style>
