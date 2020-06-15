<template>
<div>

  <div class="bg-primary border-t py-10 border-gray-700" v-bind:style="data ? getUserBannerStyle(data.banner) : ''">
    <Container :padding="false">

      <div class="min-w-0 flex-1 sm:flex sm:items-end sm:justify-between" v-if="data">
        <div class="flex-1 sm:flex items-center">
          <div class="flex-shrink-0 mb-4 sm:mb-0 h-48" v-bind:class="[data.avatar ? '' : 'shadow']">
            <transition name="fade">
              <img v-show="iconLoaded" class="inline-block h-48 w-48 rounded-md" :src="getUserAvatar(data)" @load="iconLoaded=true" :alt="data.username" />
            </transition>
          </div>
          <div class="flex-1 sm:ml-4">
            <h2 class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
              {{ data.username }}
            </h2>
            <div class="mt-0 text-sm leading-5 truncate" v-if="data" v-bind:class="[data.banner ? 'text-gray-300' : 'text-gray-200']">
              <!-- <span v-if="data.rolenames" class="tag mr-1">Admin</span> -->
              Joined on {{ data.created_at | dateFormat }}
            </div>
          </div>
        </div>
        <div class="mt-2 sm:mt-0" v-if="!currentUserEquals(data)">
          <transition name="fade" mode="out-in">
            <button v-if="!followLoading" type="button" key="follow" class="leading-5 button" @click="follow" v-bind:class="[data.banner ? 'button-primary' : 'button-white']">
                {{ following ? 'Unfollow' : 'Follow' }}
            </button>
            <button v-else type="button" key="loading" class="leading-5 button" v-bind:class="[data.banner ? 'button-primary' : 'button-white']">
              ...
            </button>
          </transition>
        </div>
      </div>

    </Container>
  </div>

  <main class="pb-12 bg-white min-h-1/2">
    <div class="bg-gray-50 border-b border-gray-200">
      <Container :padding="false">
        <div>
          <div class="sm:hidden">
            <select class="form-select block w-full my-2" @change="changeTab($event.target.value)">
              <option value="UserProfile">Overview</option>
              <option value="UserLibrary">Library</option>
              <option value="UserReviews">Reviews</option>
              <option value="UserRecommendations">Recommendations</option>
              <option value="UserFollowers">Followers</option>
              <option value="UserFollowing">Following</option>
            </select>
          </div>
          <div class="hidden sm:block">
            <div class="">
              <nav class="-mb-px flex ">
                <router-link tag="a" :to="{ name: 'UserProfile' }" exact class="is-tab">
                  Overview
                </router-link>
                <router-link tag="a" :to="{ name: 'UserLibrary' }" class="is-tab">
                  Library
                </router-link>
                <router-link tag="a" :to="{ name: 'UserReviews' }" class="is-tab">
                  Reviews
                </router-link>
                <router-link tag="a" :to="{ name: 'UserRecommendations' }" class="is-tab">
                  Recommendations
                </router-link>
                <router-link tag="a" :to="{ name: 'UserFollowers' }" class="is-tab">
                  Followers
                </router-link>
                <router-link tag="a" :to="{ name: 'UserFollowing' }" class="is-tab">
                  Following
                </router-link>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </div>

    <Container class="py-5">
      <Loading v-show="loading" :simple="true"/>
      <div v-show="!loading">
        <transition name="fade" mode="out-in">
          <router-view :user="data" />
        </transition>
      </div>
    </Container>

  </main>

</div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Container from '@/components/layout/Container.vue'
import { userService } from '@/services';
import { iconsMixin, getResourceMixin, authMixin } from '@/mixins';

export default {
  name: 'UserProfile',
  mixins: [iconsMixin, getResourceMixin, authMixin],
  components: {
    Loading, Container
  },
  data () {
    return {
      following: false,
      followLoading: true,
      iconLoaded: false
    }
  },
  methods: {
    follow() {
      if (!this.getCurrentUser()) {
        return this.$router.push({ name: 'Login' })
      }
      const { dispatch } = this.$store;
      this.followLoading = true;
      userService.follow(this.$route.params.username).then(
        response => {
          this.followLoading = false;
          this.following = response.data;
        },
        error => {
          this.followLoading = false;
          dispatch('alert/error', 'Unable to follow/unfollow user', { root: true });
        }
      );
    },
    changeTab(routeName) {
      this.$router.push({ name: routeName });
    },
    getData() {
      const { dispatch } = this.$store;
      const _this = this;
      userService.get(this.$route.params.username).then(
        response => {
          this.data = response.data;
          this.loading = false;
          this.getCurrentUser() ? this.getFollowStatus() : this.followLoading = false;
        },
        error => {
          this.loading = false;
          dispatch('alert/error', error, { root: true });
          this.$router.push({ name: 'Home' });
        }
      );
    },
    getFollowStatus() {
      const { dispatch } = this.$store;
      userService.getFollowStatus(this.$route.params.username).then(
        response => {
          this.following = response.data;
          this.followLoading = false;
        },
        error => { this.followLoading = false }
      );
    }
  },
}
</script>
