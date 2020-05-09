<template>
  <div>
    <Hero title="Forums" />
    <Container class="min-h-1/2">

      <div class="flex mt-6">
        <div class="flex-none w-64">
          <button type="button" @click="createDiscussion" class="button button-primary w-full">Start a Discussion</button>
          <hr class="my-6 border-0" style="height: 2px; background-color: whitesmoke">
          <div class="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Tags
          </div>
          <router-link :to="{name: 'Forums'}" class="forum-tag" exact>All</router-link>
          <router-link :to="{name: 'Forums', params: { tag: tag.slug }}" class="forum-tag" v-for="tag in tags" :key="tag.id" exact>
            {{ tag.name }}
          </router-link>
        </div>
        <div class="flex-1 ml-8">
          <Threads :data="data" :loading="loading" v-on:get-data="getData($event)"/>
        </div>
      </div>

    </Container>

  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Container from '@/components/layout/Container.vue'
import Threads from '@/components/lists/Threads.vue'
import { tagService, discussionService } from '@/services';

export default {
  name: 'Forums',
  components: {
    Hero, Container, Threads
  },
  data () {
    return {
      tags: [],
      loading: false,
      data: []
    }
  },
  methods: {
    getTags() {
      const { dispatch } = this.$store;
      tagService.getAll().then(
        response => this.tags = response.data,
        error => dispatch('alert/error', error, { root: true })
      );
    },
    getData (page=1) {
      const { dispatch } = this.$store;
      this.loading = true;
      return discussionService.getByPage(page).then(
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
    createDiscussion() {

    }
  },
  created () {
    this.getTags()
    this.getData()
  }
}
</script>
