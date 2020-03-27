<template>
  <div>
    <Hero title="Reviews" />
    <Container>

      <Loading v-if="loading" :simple="true" />
      <div v-else>
        <Message class="mt-2">
          Currently, there are {{ data.total }} reviews in the database. <router-link class="is-link" :to="{ name: 'CreateReview' }">Write a Review</router-link>
        </Message>
        <ReviewsList v-if="data.items.length" :data="data" :loading="loading" v-on:get-data="getData($event)"/>
      </div>

    </Container>

  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Container from '@/components/layout/Container.vue'
import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'
import ReviewsList from '@/components/lists/Reviews.vue'
import { reviewService } from '@/services';

export default {
  name: 'Reviews',
  components: {
    Hero, Container, Loading, Message, ReviewsList
  },
  data () {
    return {
      data: null,
      loading: true,
    }
  },
  methods: {
    getData (page=1) {
      const { dispatch } = this.$store;
      this.loading = true;
      return reviewService.getByPage(page).then(
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
    this.getData();
  },
}
</script>
