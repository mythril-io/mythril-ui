<template>
  <div>

    <transition name="fade">
      <div v-if="!loading && data.data && data.data.length">
        <div class="bg-white border-t border-gray-200 first:border-t-0 md:px-5 py-8" v-for="post in data.data" :key="post.id" :id="'post-'+post.id">
          <Post 
            :post="post" 
            v-on:reply="$emit('reply', $event)"
            v-on:find="$emit('find', $event)"
          />
        </div>

        <Pagination
          class="mt-2"
          :currentPage="data.current_page"
          :totalPages="data.last_page"
          :totalItems="data.total"
          :itemsPerPage="data.per_page"
          :disabled="loading"
          v-on:goto-page="getData($event)"
        />
      </div>
    </transition>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import Post from '@/components/ForumPost.vue'
var md = require("markdown-it")();

export default {
  name: 'PostsList',
  props: {
    data: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
  },
  components: {
    Pagination, Post
  },
  methods: {
    getData(page) {
      this.$emit('get-data', page)
    },
  },
}
</script>
