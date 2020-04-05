<template>
  <div>
    <Hero title="Write a Review" />
    <Container class="min-h-1/2">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(post)">
          <div>
            <Message class="mt-2 text-white" background="bg-primary">
              <div class="mb-4">Step 1: Select a Game</div>
              <SelectGame v-model="review.game" />
            </Message>

            <transition name="fade">
              <div v-if="review.game" class="mt-6">
                <Message background="bg-warning">
                  <div class="mb-4">Step 2: Select a Release</div>
                  <SelectRelease :options="review.game.releases" v-model="review.release" />
                </Message>
              </div>
            </transition>

            <transition name="fade">
              <div v-if="review.game && review.release" class="mt-6">
                <Message class="mt-2" background="bg-gray-100" content="Step 3: Write Your Review!" />

                <ValidationProvider rules="required|min:500" name="content" v-slot="{ errors }">
                  <vue-simplemde class="mt-2" id="content" name="content" v-model="review.content" :configs="editorConfig" ref="markdownEditor" />
                  <span class="text-sm text-red-700">{{ errors[0] }}</span>
                </ValidationProvider>

                <div class="mt-2">
                  <label for="summary" class="block text-sm font-medium leading-5 text-gray-700">Summary</label>
                  <ValidationProvider rules="required|max:255" v-slot="{ errors }">
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <textarea id="summary" v-model="review.summary" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Write a short summary about your review (Maximum 255 characters)" />
                    </div>
                    <span class="text-sm text-red-700">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="mt-2">
                  <label for="score" class="block text-sm font-medium leading-5 text-gray-700">Score</label>
                  <ValidationProvider rules="required|numeric" v-slot="{ errors }">
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <input id="score" v-model="review.score" type="number" min="0" max="100" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Enter a number between 1-100" />
                    </div>
                    <span class="text-sm text-red-700">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="mt-8 border-t border-gray-200 pt-5">
                  <div class="flex justify-end">
                    <span class="rounded-md shadow-sm">
                      <button type="submit" class="button button-primary">
                        Save
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
import SelectRelease from '@/components/forms/SelectRelease.vue'
import VueSimplemde from 'vue-simplemde'
import { iconsMixin, markdownEditorMixin } from '@/mixins';
import { reviewService } from '@/services';

export default {
  name: 'CreateReview',
  mixins: [iconsMixin, markdownEditorMixin],
  components: {
    Hero, Container, Message, VueSimplemde, SelectGame, SelectRelease
  },
  data () {
    return {
      review: {
        game: null,
        release: null,
        summary: '',
        content: '',
        score: null
      },
    }
  },
  methods: {
    post () {
      const { dispatch } = this.$store;
      const game = { id: this.review.game.id };

      let resource = JSON.parse(JSON.stringify(this.review));
      resource.game = game;

      reviewService.post(resource).then(
        response => {
          this.$router.push({ name: 'Reviews' });
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
  },
}
</script>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
