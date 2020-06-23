<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(save)">
        <ValidationProvider rules="required|min:10" name="body" v-slot="{ errors }">
          <vue-simplemde class="mt-2" id="body" name="body" v-model="data.body" :configs="editorConfig" ref="markdownEditor" />
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
import VueSimplemde from 'vue-simplemde'
import { discussionService } from '@/services';
import { markdownEditorMixin } from '@/mixins';

export default {
  name: 'DiscussionEditForm',
  mixins: [markdownEditorMixin],
  components: {
    VueSimplemde
  },
  props: {
    discussion: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      data: {
        id: 0,
        body: '',
      },
      submitting: false,
    }
  },
  methods: {
    save() {
      const { dispatch } = this.$store;
      const _this = this;
      this.submitting = true;
      discussionService.patch(this.data).then(
        response => {
          dispatch('alert/success', "Updated", { root: true });
          _this.$emit('save', response.data);
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
    this.data.id = this.discussion.id;
    this.data.body = this.discussion.body;
  }
}
</script>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
