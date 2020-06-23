<template>
  <div>
    <Hero title="Forums" />
    <Container class="min-h-3/4">

      <div class="flex mt-6">
        <div class="flex-none w-64 hidden lg:inline">
          <router-link :to="{name: 'CreateDiscussion'}" tag="button" class="button button-primary w-full">Start a Discussion</router-link>
          <hr class="my-6 border-0" style="height: 2px; background-color: whitesmoke">
          <div class="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Tags
          </div>
          <Loading v-if="loadingTags" :simple="true" />
          <div v-else>
            <router-link :to="{name: 'Forums'}" class="forum-tag" :class="{ 'is-active': !this.$route.params.tag }" exact>All</router-link>
            <router-link :to="{name: 'Forums', params: { tag: tag.slug }}" class="forum-tag" v-for="tag in tags" :key="tag.id">
              {{ tag.name }}
            </router-link>
          </div>
        </div>
        <div class="flex-1 lg:ml-8">
          <div class="flex items-center justify-between space-x-3 lg:hidden mb-5">
            <router-link :to="{name: 'CreateDiscussion'}" tag="button" class="button button-primary w-full">Start a Discussion</router-link>
            <button type="button" class="button button-danger" @click="showTags=!showTags">
              <svg class="-mx-1 h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </button>
          </div>
          <Message v-if="showTags" class="mb-5 lg:hidden" background="bg-gray-50">
            <Loading v-if="loadingTags" :simple="true" />
            <div v-else @click="showTags=false">
              <router-link :to="{name: 'Forums'}" class="forum-tag" :class="{ 'is-active': !this.$route.params.tag }" exact>All</router-link>
              <router-link :to="{name: 'Forums', params: { tag: tag.slug }}" class="forum-tag" v-for="tag in tags" :key="tag.id">
                {{ tag.name }}
              </router-link>
            </div>
          </Message>
          <div class="flex justify-between">
            <nav class="flex">
              <a @click="updateSort('recent')" class="is-pill-tab ml-0 cursor-pointer" :class="{ 'is-active': this.$route.query.sort=='recent' || !this.$route.query.sort }">
                Recent
              </a>
              <a @click="updateSort('popular')" class="is-pill-tab cursor-pointer" :class="{ 'is-active': this.$route.query.sort=='popular' }">
                Popular
              </a>
              <a @click="updateSort('likes')" class="is-pill-tab cursor-pointer" :class="{ 'is-active': this.$route.query.sort=='likes' }">
                Likes
              </a>
              <a @click="updateSort('views')" class="is-pill-tab cursor-pointer" :class="{ 'is-active': this.$route.query.sort=='views' }">
                Views
              </a>
              <a @click="updateSort('users')" class="is-pill-tab cursor-pointer" :class="{ 'is-active': this.$route.query.sort=='users' }">
                Users
              </a>
            </nav>
            <!-- <div class="hidden lg:inline">
              <button class="button button-gray">Show Subscribed</button>
            </div> -->
          </div>

          <Loading v-if="loading" :simple="true" />
          <div v-else>
            <Threads v-if="data.data && data.data.length" :data="data" :loading="loading" v-on:get-data="getData($event)"/>
            <Message v-else class="mt-5" content='No discussions found :(' />
          </div>

        </div>
      </div>

    </Container>

  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Container from '@/components/layout/Container.vue'
import Threads from '@/components/lists/Threads.vue'
import Message from '@/components/Message.vue'
import Loading from '@/components/Loading.vue'
import { tagService, discussionService } from '@/services';

export default {
  name: 'Forums',
  components: {
    Hero, Container, Threads, Message, Loading
  },
  data () {
    return {
      tags: [],
      loading: true,
      loadingTags:true,
      data: [],
      showTags: false,
    }
  },
  methods: {
    getTags() {
      const { dispatch } = this.$store;
      this.loadingTags = true;
      tagService.getAll().then(
        response => {
          this.tags = response.data;
          this.loadingTags = false;
        },
        error => {
          dispatch('alert/error', error, { root: true });
          this.loadingTags = false;
        }
      );
    },
    getData(page) {
      const { dispatch } = this.$store;
      this.loading = true;
      return discussionService.getByPage(page, this.$route.params.tag, this.$route.query.sort).then(
        response => {
          this.data = response.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    updateSort(sort) {
      this.$router.push({params: { tag: this.$route.params.tag }, query: { sort: sort }});
    },
  },
  watch: {
      '$route.query': {
          handler() {
              this.getData()
          },
          immediate: true,
      },
      '$route.params': {
          handler() {
              this.getData()
          },
          immediate: true,
      },
  },
  created () {
    // this.$route.query.sort ? '' : this.$router.push({query: {sort: 'recent'}})
    this.getTags()
    this.getData()
  }
}
</script>
