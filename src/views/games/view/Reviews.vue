<template>
  <div>
    <Title title="Reviews" />
    <Loading v-if="loading" :simple="true" />
    <div v-else>
      <Message>
        {{ data.data.length }} reviews found.
      </Message>
      <ReviewsList v-if="data.data.length" :data="data" :loading="loading" v-on:get-data="getData($event)"/>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'
import Title from '@/components/Title.vue'
import ReviewsList from '@/components/lists/Reviews.vue'
import { reviewService } from '@/services';

export default {
  name: 'GameReviews',
  components: {
    Loading, Title, Message, ReviewsList
  },
  data () {
    return {
      loading: false,
      data: []
    }
  },
  methods: {
    getData (page=1) {
      const { dispatch } = this.$store;
      this.loading = true;
      return reviewService.getByGameAndPage(this.$route.params.id, page).then(
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
  },
  created () {
      if (this.$route.params.id) {
        this.getData()
      }
  },
}
</script>
