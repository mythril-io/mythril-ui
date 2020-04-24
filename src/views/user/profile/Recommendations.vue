<template>
  <div>
    <Title title="Recommendations" />
    <Loading v-if="loading" :simple="true" />
    <div v-else>
      <Message v-if="data.items">
        {{ data.items.length }} recommendations found.
      </Message>
      <RecommendationsList v-if="data.items && data.items.length" :data="data" :loading="loading" v-on:get-data="getData($event)"/>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'
import Title from '@/components/Title.vue'
import RecommendationsList from '@/components/lists/Recommendations.vue'
import { recommendationService } from '@/services';

export default {
  name: 'UserRecommendations',
  props: ['user'],
  components: {
    Loading, Title, Message, RecommendationsList
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
      return recommendationService.getByUserAndPage(this.user.id, page).then(
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
  watch: {
    'user': {
      handler(user) {
          user != null ? this.getData() : ''
      },
      immediate: true,
    }
  },
}
</script>
