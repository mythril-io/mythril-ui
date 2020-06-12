<template>
  <div>
    <Hero title="Recommendations" />
    <Container>

      <Loading v-if="loading" :simple="true" />
      <div v-else>
        <Message class="mt-2">
          Currently, there are {{ data.total }} recommendations in the database. <router-link class="is-link" :to="{ name: 'CreateRecommendation' }">Write a Recommendation</router-link>
        </Message>
        <RecommendationsList v-if="data.data.length" :data="data" :loading="loading" v-on:get-data="getData($event)"/>
      </div>

    </Container>

  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Container from '@/components/layout/Container.vue'
import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'
import RecommendationsList from '@/components/lists/Recommendations.vue'
import { recommendationService } from '@/services';

export default {
  name: 'Recommendations',
  components: {
    Hero, Container, Loading, Message, RecommendationsList
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
      return recommendationService.getByPage(page).then(
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
