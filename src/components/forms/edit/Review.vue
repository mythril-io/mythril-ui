<template>
  <div>
    <Title class="" title="Edit Review" />
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(save)">
        <ValidationProvider rules="required|min:500" v-slot="{ errors }">
          <vue-simplemde class="mt-2" id="content" name="content" v-model="data.content" :configs="editorConfig" ref="markdownEditor" />
          <span class="text-sm text-red-700">{{ errors[0] }}</span>
        </ValidationProvider>

        <div class="mt-2">
          <label for="summary" class="block text-sm font-medium leading-5 text-gray-700">Summary</label>
          <ValidationProvider rules="required|max:255" v-slot="{ errors }">
            <div class="mt-1 relative rounded-md shadow-sm">
              <textarea id="summary" v-model="data.summary" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Write a short summary about your review (Maximum 255 characters)" />
            </div>
            <span class="text-sm text-red-700">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

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
import { reviewService } from '@/services';
import { markdownEditorMixin } from '@/mixins';

export default {
  name: 'ReviewEditForm',
  mixins: [markdownEditorMixin],
  components: {
    Title, VueSimplemde
  },
  props: {
    review: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      data: {
        id: 0,
        content: '',
        summary: '',
      },
      submitting: false,
    }
  },
  methods: {
    save () {
      const { dispatch } = this.$store;
      const _this = this;
      this.submitting = true;
      reviewService.patch(this.data).then(
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
    this.data.id = this.review.id;
    this.data.content = this.review.content;
    this.data.summary = this.review.summary;
  }
}
</script>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
