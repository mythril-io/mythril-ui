<template>
  <div>
    <Title class="" title="Edit Recommendation" />
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(save)">
        <ValidationProvider rules="required|min:200" v-slot="{ errors }">
          <vue-simplemde class="mt-2" id="content" name="content" v-model="data.content" :configs="editorConfig" ref="markdownEditor" />
          <span class="text-sm text-red-700">{{ errors[0] }}</span>
        </ValidationProvider>

        <div class="flex justify-end w-full mt-4">
          <div class="inline-flex">
            <button type="submit" class="button button-primary">
              Save
            </button>
            <button type="button" class="button button-white ml-2" @click="$emit('cancel')">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import VueSimplemde from 'vue-simplemde'
import { recommendationService } from '@/services';
import { markdownEditorMixin } from '@/mixins';

export default {
  name: 'RecommendationEditForm',
  mixins: [markdownEditorMixin],
  components: {
    Title, VueSimplemde
  },
  props: {
    recommendation: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      data: {
        id: 0,
        content: '',
      },
      submitting: false,
    }
  },
  methods: {
    save () {
      const { dispatch } = this.$store;
      const _this = this;
      this.submitting = true;
      recommendationService.patch(this.data).then(
        response => {
          dispatch('alert/success', response.data.message, { root: true });
          _this.$emit('save', this.data);
          _this.$emit('cancel');
          this.submitting = false;
        },
        error => {
          dispatch('alert/error', error, { root: true });
          this.submitting = false;
        }
      );
    },
  },
  created () {
    this.data.id = this.recommendation.id;
    this.data.content = this.recommendation.content;
  }
}
</script>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
