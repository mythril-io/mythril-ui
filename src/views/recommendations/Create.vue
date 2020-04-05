<template>
  <div>
    <Hero title="Write a Recommendation" />
    <Container class="min-h-1/2">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(validate)">
          <div>

            <div class="flex flex-wrap  mt-2">
              <div class="w-full md:w-1/2 pr-0 md:pr-3 border-r-0 md:border-r-2 border-dashed border-gray-200">
                <div class="text-center text-lg text-gray-500">
                  If you like this game ...
                </div>
                <Message class="mt-2 text-white" background="bg-primary">
                  <div class="mb-4">Select a Game</div>
                  <SelectGame v-model="recommendation.game" />
                </Message>

                <transition name="fade">
                  <div v-if="recommendation.game" class="mt-6">
                    <Message background="bg-warning">
                      <div class="mb-4">Select a Release</div>
                      <SelectRelease :options="recommendation.game.releases" v-model="recommendation.release" />
                    </Message>
                  </div>
                </transition>

              </div>

              <div class="w-full md:w-1/2 pl-0 md:pl-3 mt-4 md:mt-0">
                <div class="text-center text-lg text-gray-500">
                  ... then you might like this game
                </div>
                <Message class="mt-2 text-white" background="bg-primary">
                  <div class="mb-4">Select a Game</div>
                  <SelectGame v-model="recommendation.recommended_game" />
                </Message>

                <transition name="fade">
                  <div v-if="recommendation.recommended_game" class="mt-6">
                    <Message background="bg-warning">
                      <div class="mb-4">Select a Release</div>
                      <SelectRelease :options="recommendation.recommended_game.releases" v-model="recommendation.recommended_release" />
                    </Message>
                  </div>
                </transition>

              </div>
            </div>

            <transition name="fade">
              <div v-if="recommendation.game && recommendation.release && recommendation.recommended_game && recommendation.recommended_release" class="mt-6">
                <Message class="mt-2" background="bg-gray-100" content="Write Your Recommendation!" />

                <ValidationProvider rules="required|min:200" name="content" v-slot="{ errors }">
                  <vue-simplemde class="mt-2" id="content" name="content" v-model="recommendation.content" :configs="editorConfig" ref="markdownEditor" />
                  <span class="text-sm text-red-700">{{ errors[0] }}</span>
                </ValidationProvider>

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
import { recommendationService } from '@/services';

export default {
  name: 'CreateRecommendation',
  mixins: [iconsMixin, markdownEditorMixin],
  components: {
    Hero, Container, Message, VueSimplemde, SelectGame, SelectRelease
  },
  data () {
    return {
      recommendation: {
        game: null,
        release: null,
        recommended_game: null,
        recommended_release: null,
        content: '',
      },
    }
  },
  methods: {
    validate() {
      if (this.recommendation.game.id == this.recommendation.recommended_game.id) {
        this.recommendation.recommended_game = null;
        this.$store.dispatch('alert/error', "Games cannot be the same", { root: true });
      } else {
        this.post();
      }
    },
    post () {
      const { dispatch } = this.$store;
      const game = { id: this.recommendation.game.id };
      const recommended_game = { id: this.recommendation.recommended_game.id };

      let resource = JSON.parse(JSON.stringify(this.recommendation));
      resource.game = game;
      resource.recommended_game = recommended_game;

      recommendationService.post(resource).then(
        response => {
          this.$router.push({ name: 'Recommendations' });
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
