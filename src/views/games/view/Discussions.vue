<template>
  <div>
    <Title title="Discussions" />
    <Loading v-if="loading" :simple="true" />
    <div v-else>
      <Message>
        {{ data.data.length }} {{ data.data.length==1 ? 'discussion' : 'discussions' }} found.
      </Message>
      <Threads v-if="data.data.length" :data="data" :loading="loading" v-on:get-data="getData($event)"/>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import Threads from '@/components/lists/Threads.vue'
import Message from '@/components/Message.vue'
import Loading from '@/components/Loading.vue'
import { discussionService } from '@/services';

export default {
  name: 'GameDiscussions',
  components: {
    Title, Threads, Message, Loading
  },
  data () {
    return {
      loading: true,
      data: [],
    }
  },
  methods: {
    getData(page) {
      const { dispatch } = this.$store;
      this.loading = true;
      return discussionService.getByGameAndPage(this.$route.params.id, page).then(
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
    this.getData()
  }
}
</script>