<template>
  <div>
    <Title title="Following" />
    <Loading v-if="loading" :simple="true" />
    <div class="flex flex-wrap justify-center content-center items-center" v-else>
      <div class="flex items-center justify-center w-24" v-for="user in users.data" :key="user.id">
        <UserAvatar :user="user"/>
      </div>
      <Message v-if="users.data && users.data.length == 0" content="No users found." />
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import Message from '@/components/Message.vue'
import Title from '@/components/Title.vue'

import { userService } from '@/services';

export default {
  name: 'UserFollowing',
  props: ['user'],
  components: {
    UserAvatar, Loading, Title, Message
  },
  data () {
    return {
      loading: false,
      users: []
    }
  },
  methods: {
    getData () {
      this.loading = true;
      const { dispatch } = this.$store;
      userService.getFollowing(this.user.username).then(
        response => {
          this.users = response.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          dispatch('alert/error', error, { root: true });
        }
      );
    }
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
