<template>
  <Overlap>
    <template #header>

      <div class="min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
          User Settings
        </h2>
      </div>

    </template>
    <template #content>

      <div class="bg-gray-50">
        <div>
          <div class="sm:hidden">
            <select class="form-select block w-full">
              <option selected>Profile</option>
              <option>Avatar and Cover Photo</option>
              <option>Password</option>
            </select>
          </div>
          <div class="hidden sm:block">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex">
                <router-link tag="a" :to="{ name: 'UserSettings' }" exact class="is-tab">
                  Profile
                </router-link>
                <router-link tag="a" :to="{ name: 'SettingsImages' }" class="is-tab">
                  Avatar and Cover Photo
                </router-link>
                <router-link tag="a" :to="{ name: 'SettingsPassword' }" class="is-tab">
                  Password
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
            <router-view :key="$route.fullPath" />
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

export default {
  name: 'UserSettings',
  components: {
    Loading, Overlap
  },
  data () {
    return {
      loading: false,
    }
  },
}
</script>
