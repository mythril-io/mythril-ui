<template>
  <div>
    <Hero :title="data.title" :center="true" character="">
      <template #subtitle>
        <div class="mt-2 flex items-center">
          <router-link :to="{name: 'Forums', params: { tag: tag.slug }}" :class="'tag shadow-xs first:ml-0 ml-2 ' + tag.colour" v-for="tag in data.tags" :key="tag.id">
            {{ tag.name }}
          </router-link>
          <span class="tag ml-2" v-for="tag in data.games" :key="tag.id">
            {{ tag.name }}
          </span>
          <span class="tag ml-2 bg-primary text-white shadow-xs">
            Final Fantasy VII
          </span>
        </div>
      </template>
    </Hero>
    <div class="bg-gray-50 py-7" style="border-bottom: 2px #f5f5f5 solid;">
      <Container>
        <div class="md:flex bounce-enter-active md:space-x-5">
          <div class="flex-shrink-0 mb-5 md:mb-0">
            <router-link :to="{ name: 'UserProfile', params: { username: data.user.username }}" :aria-label="data.user.username" data-balloon-pos="up">
              <img class="h-32 w-32 rounded-full object-cover" :src="getUserAvatar(data.user)" :alt="data.user.username" />
            </router-link>
          </div>
          <div class="flex-grow">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <span class="font-semibold">{{ data.user.username }}</span>
                <span class="ml-2 text-xs text-gray-400">{{ data.created_at | ago }}</span>
              </div>
              <div class="text-xs text-gray-400" v-if="data.edited_at">
                <span :aria-label="data.edited_at | ago" data-balloon-pos="up">Edited</span>
              </div>
            </div>
            <div class="markdown" style="color:#363636;" v-html="compiledMarkdown(data.body)"></div>
          </div>
        </div>
        <!-- <transition name="fade"> -->
        <!-- </transition> -->
      </Container>
    </div>
    <Container>
      Posts go here.
    </Container>

  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Hero from '@/components/Hero.vue'
import Container from '@/components/layout/Container.vue'
import { getResourceMixin, iconsMixin } from '@/mixins';
import { discussionService } from '@/services';

export default {
  name: 'Discussion',
  mixins: [getResourceMixin, iconsMixin],
  components: {
    Container, Hero
  },
  data () {
    return {
    }
  },
  methods: {
    getData (id) {
      const { dispatch } = this.$store;
      discussionService.get(id).then(
        response => {
          this.data = response.data;
          this.loading = false;
          this.$route.params.slug != response.data.slug ? this.$router.push({params: {slug: response.data.slug}}) : ''
        },
        error => {
          this.loading = false;
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    getPosts(page) {

    }
  },
}
</script>

<style type="sass">
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
