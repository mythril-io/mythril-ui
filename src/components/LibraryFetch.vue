<template>
  <div>
    <Loading v-if="!user || !libraries" :simple="true" />
    <div v-else>
      <Title :title="title" />
      <Message v-if="!libraries.data || libraries.data.length == 0" content="No entries found." />
      <div v-else>
        <LibraryList :data="libraries.data" />
        <infinite-loading @infinite="getMoreData">
          <div slot="spinner">
            <Loading :simple="true"/>
          </div>
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'
import LibraryList from '@/components/lists/Library.vue'
import { libraryService } from '@/services';

export default {
  name: 'LibraryFetch',
  props: ['statusId', "title", "user"],
  components: {
    Loading, Message, LibraryList, Title
  },
  data () {
    return {
      loading: false,
      libraries: null,
      page: 1,
      fetching: false
    }
  },
  methods: {
    getData () {
      const { dispatch } = this.$store;
      return libraryService.getByUserAndStatus(this.user.username, this.statusId, this.page).then(
        response => {
          this.page += 1;
          if (!this.libraries) {
            this.libraries = response.data;
          } else if (response.data.data.length) {
            this.libraries.data.push(...response.data.data);
          }
          return response;
        },
        error => {
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    getMoreData ($state) {
      this.getData().then(
        response => {
          if (response.data.data.length) {
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      );
    }
  },
  watch: {
    'user': {
      handler(user) {
        if (user != null && !this.fetching) {
          this.fetching = true;
          this.getData();
        }
      },
      immediate: true,
    }
  },
}
</script>
