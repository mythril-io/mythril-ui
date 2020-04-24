<template>
  <div>
      <div class="mb-7">
        <div class="sm:hidden">
          <select class="form-select block w-full" @change="changeTab($event.target.value)">
            <option value="UserLibrary">All</option>
            <option value="UserLibraryPlaying">Currently Playing</option>
            <option value="UserLibraryCompleted">Completed</option>
            <option value="UserLibraryPlanning">Planning</option>
            <option value="UserLibraryOnHold">On Hold</option>
            <option value="UserLibraryDropped">Dropped</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav class="flex ">
            <router-link tag="a" :to="{ name: 'UserLibrary' }" exact class="is-pill-tab">
              All
            </router-link>
            <router-link tag="a" :to="{ name: 'UserLibraryPlaying' }" class="is-pill-tab">
              Currently Playing
            </router-link>
            <router-link tag="a" :to="{ name: 'UserLibraryCompleted' }" class="is-pill-tab">
              Completed
            </router-link>
            <router-link tag="a" :to="{ name: 'UserLibraryPlanning' }" class="is-pill-tab">
              Planning
            </router-link>
            <router-link tag="a" :to="{ name: 'UserLibraryOnHold' }" class="is-pill-tab">
              On Hold
            </router-link>
            <router-link tag="a" :to="{ name: 'UserLibraryDropped' }" class="is-pill-tab">
              Dropped
            </router-link>
          </nav>
        </div>
      </div>

      <div>
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath" :user="user" />
        </transition>
      </div>

  </div>
</template>

<script>

export default {
  name: 'UserLibrary',
  props: ['user'],
  methods: {
    changeTab(routeName) {
      this.$router.push({ name: routeName });
    }
  }
}
</script>
