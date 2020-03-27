<template>

  <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div v-for="review in data.items" :key="review.id">
      <ReviewCard :data="review" />
    </div>

    <Pagination
      class="sm:col-span-2"
      :currentPage="data.page"
      :totalPages="data.pages"
      :totalItems="data.total"
      :itemsPerPage="data.per_page"
      :disabled="loading"
      v-on:goto-page="getData($event)"
    />
  </div>

</template>

<script>
import ReviewCard from '@/components/cards/Review.vue'
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'ReviewsList',
  props: {
    data: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  components: {
    ReviewCard, Pagination
  },
  methods: {
    getData (page) {
      this.$emit('get-data', page)
    },
  },
}
</script>
