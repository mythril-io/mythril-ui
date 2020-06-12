<template>
  <Overlap :coverPhoto="data ? getUserBannerStyle(data.banner) : ''">
    <template #header>

      <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between" v-if="data">
        <div>
          <div class="flex items-center">
            <div class="flex-shrink-0" v-bind:class="[data.avatar ? '' : 'shadow']">
              <img class="inline-block h-32 w-32 rounded-md object-cover" :src="getUserAvatar(data)" :alt="data.username" />
            </div>
            <div class="flex-1 ml-4">
              <h2 class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
                {{ data.username }}
              </h2>
              <div class="mt-0 text-sm leading-5 truncate" v-if="data" v-bind:class="[data.banner ? 'text-gray-400' : 'text-gray-200']">
                <!-- <span v-if="data.rolenames" class="tag mr-1">Admin</span> -->
                Joined on {{ data.created_at | dateFormat }}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-0 sm:h-32 flex items-end" v-if="!currentUserEquals(data)">
          <div>
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
      </div>

    </template>
    <template #content>

      <div class="bg-gray-50">
        <div>
          <div class="sm:hidden">
            <select class="form-select block w-full" @change="changeTab($event.target.value)">
              <option value="UserProfile">Overview</option>
              <option value="UserLibrary">Library</option>
              <option value="UserReviews">Reviews</option>
              <option value="UserRecommendations">Recommendations</option>
              <option value="UserFollowers">Followers</option>
              <option value="UserFollowing">Following</option>
            </select>
          </div>
          <div class="hidden sm:block">
            <div class="border-b border-gray-200">
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
      </div>
      <div class="px-4 py-5 sm:p-6">
        <Loading v-show="loading" :simple="true"/>
        <div v-show="!loading">
          <transition name="fade" mode="out-in">
            <router-view :user="data" />
          </transition>
        </div>
      </div>

    </template>
  </Overlap>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Overlap from '@/components/pages/Overlap.vue'
import { userService } from '@/services';
import { iconsMixin, getResourceMixin, authMixin } from '@/mixins';

export default {
  name: 'UserProfile',
  mixins: [iconsMixin, getResourceMixin, authMixin],
  components: {
    Loading, Overlap
  },
  data () {
    return {
      following: false,
      followLoading: true,
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
