<template>

  <multiselect
    class="mt-2"
    v-model="inputVal"
    :options="options"
    track-by="id"
    label="title"
    placeholder="Search for a Game"
    open-direction="bottom"
    :loading="loading"
    :max-height="400"
    :show-labels="false"
    @search-change="getData($event)"
    id="games"
  >
    <template slot="singleLabel" slot-scope="props">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <img class="inline-block h-10 w-10 rounded-md" :src="getGameIcon(props.option)" :alt="props.option.title" />
        </div>
        <div class="flex-1 ml-4">
          <h2 class="text-md text-gray-800 font-bold">
            {{ props.option.title }}
          </h2>
        </div>
      </div>
    </template>
    <template slot="option" slot-scope="props">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <img class="inline-block h-10 w-10 rounded-md" :src="getGameIcon(props.option)" :alt="props.option.title" />
        </div>
        <div class="flex-1 ml-4">
          <h2 class="text-md text-gray-800 font-bold">
            {{ props.option.title }}
          </h2>
          <div class="mt-0 text-sm leading-5 truncate text-gray-700">
            Developed by: {{ props.option.developer.name }}
          </div>
        </div>
      </div>
    </template>
  </multiselect>

</template>

<script>
import { iconsMixin } from '@/mixins';
import { gameService } from '@/services';

export default {
  name: 'SelectGame',
  mixins: [iconsMixin],
  props: ['value'],
  data () {
    return {
      options: [],
      loading: false,
    }
  },
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
  methods: {
    getData (query) {
      const { dispatch } = this.$store;
      this.loading = true;
      return gameService.search(query).then(
        response => {
          this.options = response.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          dispatch('alert/error', error, { root: true });
        }
      );
    },
  },
}
</script>

<style>
  @import '~vue-multiselect/dist/vue-multiselect.min.css';
</style>
