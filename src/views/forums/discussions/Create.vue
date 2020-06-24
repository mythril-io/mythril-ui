<template>
  <div>
    <Hero title="Start a Discussion" />
    <Container class="min-h-1/2">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(post)">
          <div>
            <Message class="mt-2 text-white" background="bg-gray-100">
              <div class="mb-4 text-gray-500">Tags</div>
              <multiselect
                v-model="selectedTags"
                :options="filteredTags"
                :multiple="true"
                :max="3"
                @input="updateFilteredTags($event)"
                @remove="updateFilteredTags()"
                track-by="name"
                label="name"
                placeholder="e.g. Games, Site Feedback"
                id="tags"
              >
              </multiselect>
              <p class="mt-1 text-right text-gray-500 text-sm">{{ selectedTags.length }}/3</p>
            </Message>

            <transition name="fade">
              <div v-if="selectedTags.length" class="mt-3">
                <Message v-if="selectedTags && selectedTags.length && !stopTagSelection" background="bg-primary">
                  <div class="mb-4 text-white">Games (optional)</div>
                  <SelectGame v-model="games" :multiple="true" :max="2" />
                  <p class="mt-1 text-right text-white text-sm">{{ games.length }}/2</p>
                </Message>

                <div class="mt-6">
                  <ValidationProvider rules="required|max:255" v-slot="{ errors }">
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <input id="title" v-model="discussion.title" type="text" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Title" />
                    </div>
                    <span class="text-sm text-red-700">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="mt-3">
                  <ValidationProvider rules="required|min:10" name="body" v-slot="{ errors }">
                    <vue-simplemde class="mt-2" id="body" name="body" v-model="discussion.body" :configs="editorConfig" ref="markdownEditor" />
                    <span class="text-sm text-red-700">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="mt-5">
                  <div class="flex justify-end">
                    <span class="rounded-md shadow-sm">
                      <button type="submit" class="button button-primary">
                        Start Discussion
                      </button>
                    </span>
                  </div>
                </div>

              </div>
            </transition>

          </div>
        </form>
      </ValidationObserver>
    </Container>

  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Container from '@/components/layout/Container.vue'
import Message from '@/components/Message.vue'
import SelectGame from '@/components/forms/SelectGame.vue'
import VueSimplemde from 'vue-simplemde'
import { iconsMixin, markdownEditorMixin, authMixin } from '@/mixins';
import { discussionService, tagService } from '@/services';
import _ from 'lodash';

export default {
  name: 'CreateReview',
  mixins: [iconsMixin, markdownEditorMixin, authMixin],
  components: {
    Hero, Container, Message, VueSimplemde, SelectGame
  },
  data () {
    return {
      tags: [],
      filteredTags: [],

      selectedTags: [],
      games: [],
      discussion: {
        title: '',
        body: '',
      },
    }
  },
  computed: {
    stopTagSelection() {
        var boolean = false;

        _.map(this.selectedTags, function(tag) { 
            (tag.slug == 'general' || tag.slug == 'site-updates' || tag.slug == 'site-feedback') ? boolean = true : ''
        });

        return boolean;
    }
  },
  methods: {
    getTags() {
      const { dispatch } = this.$store;

      tagService.getAll().then(
        response => {
          let isAdmin = _.includes(this.getCurrentUser().rolenames, 'admin');
          let filtered;

          isAdmin ? filtered = response.data : filtered = _.filter(response.data, tag => tag.slug != 'site-updates');

          this.tags = _.orderBy(filtered, 'name', 'asc');
          this.filteredTags = _.orderBy(filtered, 'name', 'asc');
        },
        error => dispatch('alert/error', error, { root: true })
      );
    },
    updateFilteredTags(tag=null) {
        // If tag is general, updates then show no more tags
        if(this.selectedTags && this.selectedTags.length && this.stopTagSelection) {
            this.filteredTags = [];
        }
        //else if tag is NOT general, updates then show all tags except general, updates
        else if(this.selectedTags && this.selectedTags.length && !this.stopTagSelection) {
            let tempTags = JSON.parse(JSON.stringify(this.tags));
            this.filteredTags = _.pullAllBy(tempTags, [
                { 'slug': 'general' }, 
                { 'slug': 'site-updates' }, 
                { 'slug': 'site-feedback' }, 
                { 'slug': (tag ? tag.slug : '') },
            ], 'slug');
        }
        //else show all tags
        else {
            this.filteredTags = JSON.parse(JSON.stringify(this.tags));
        }
    },
    post() {
      const { dispatch } = this.$store;

      let resource = JSON.parse(JSON.stringify(this.discussion));
      resource.tag_ids = _.map(this.selectedTags, 'id');
      this.games.length ? resource.game_ids = _.map(this.games, 'id') : '';

      discussionService.post(resource).then(
        response => {
          this.$router.push({ name: 'Discussion', params: { id: response.data.id, slug: response.data.slug } });
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
  },
  created() {
    this.getTags();
  }
}
</script>

<style>
  @import '~simplemde/dist/simplemde.min.css';

  /* vue-multiselect Component */
  @import '~vue-multiselect/dist/vue-multiselect.min.css';
</style>