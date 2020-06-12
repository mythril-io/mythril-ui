<template>
  <div>
    <div class="grid md:grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-7">
        <Title title="About Me" />
        <div class="bg-gray-50 p-4 rounded-md">
          <span v-if="user && user.about_me" class="markdown" v-html="compiledMarkdown"></span>
          <span v-else>This user hasn't written anything about themselves.</span>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-5">
        <Title title="Favourite Games" />
        <Loading v-if="loading" :simple="true" />
        <div class="grid grid-cols-4 lg:gap-2" v-if="favourites.length > 0 && !loading">
          <div class="flex items-center justify-center mb-3" v-for="favourite in favourites" :key="favourite.id">
            <Tooltip :content="favourite.favoriteable.game.title">
              <router-link :to="{ name: 'Game', params: { id: favourite.favoriteable.game.id, slug: favourite.favoriteable.game.slug }}" class="overflow-hidden inline-block h-16 w-16 sm:h-32 sm:w-32 lg:h-24 lg:w-24 rounded-md border border-gray-100">
                <img class="opacity-75 hover:opacity-100 cursor-pointer transition hover:scale-105 transform duration-150 ease-in-out" :src="$store.state.cdnURL + 'games/icons/' + favourite.favoriteable.game.icon" :alt="favourite.favoriteable.game.title" />
              </router-link>
            </Tooltip>
          </div>
        </div>
        <Message v-if="favourites.length == 0 && !loading" content="No favourites :(" />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Tooltip from '@/components/Tooltip.vue'
import Title from '@/components/Title.vue'
import Message from '@/components/Message.vue'
var md = require("markdown-it")();
import { userService } from '@/services';

export default {
  name: 'UserOverview',
  props: ['user'],
  components: {
    Loading, Tooltip, Title, Message
  },
  data () {
    return {
      loading: false,
      favourites: []
    }
  },
  computed: {
    compiledMarkdown: function() {
      return md.render(this.user.about_me);
    },
  },
  methods: {
    getFavourites () {
      this.loading = true;
      const { dispatch } = this.$store;
      userService.getFavourites(this.user.username).then(
        response => {
          this.favourites = response.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          dispatch('alert/error', error, { root: true });
        }
      );
    }
  },
  watch: {
      'user': {
          handler() {
              this.user != null ? this.getFavourites() : '';
          },
          immediate: true,
      }
  },
}
</script>
