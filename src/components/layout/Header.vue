<template>
<nav v-bind:class="[background, open ? 'bg-gray-800' : '']" class="py-0.5">
  <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="flex items-center px-2 lg:px-0">
        <div class="flex-shrink-0">
          <router-link :to="{ name: 'Home' }" class="focus:outline-none">
            <img class="block h-8 w-auto" src="@/assets/logo.svg" alt="Mythril.io" />
          </router-link>
        </div>
        <div class="hidden lg:block lg:ml-5">
          <div @keydown.escape="gamesDropdown = false" v-on-clickaway="closeGamesDropdown" class="relative inline-block text-left">
            <div>
              <span class="rounded-md shadow-sm">
                <button @click="gamesDropdown = !gamesDropdown" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-sm leading-5 font-medium text-gray-300 hover:text-white focus:outline-none transition ease-in-out duration-150">
                  Games
                  <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </span>
            </div>
            <transition name="fade">
              <div v-show="gamesDropdown" class="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg">
                <div class="rounded-md bg-white shadow-xs">
                  <div class="py-1">
                    <router-link tag="a" :to="{ name: 'Games' }" @click.native="closeGamesDropdown" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Browse Games</router-link>
                  </div>
                  <div class="border-t border-gray-100"></div>
                  <div class="py-1">
                    <router-link tag="a" :to="{ name: 'Reviews' }" @click.native="closeGamesDropdown" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Reviews</router-link>
                    <router-link tag="a" :to="{ name: 'Recommendations' }" @click.native="closeGamesDropdown" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Recommendations</router-link>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div @keydown.escape="communityDropdown = false" v-on-clickaway="closeCommunityDropdown" class="relative inline-block text-left">
            <div>
              <span class="rounded-md shadow-sm">
                <button @click="communityDropdown = !communityDropdown" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-sm leading-5 font-medium text-gray-300 hover:text-white focus:outline-none transition ease-in-out duration-150">
                  Community
                  <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </span>
            </div>
            <transition name="fade">
              <div v-show="communityDropdown" class="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg">
                <div class="rounded-md bg-white shadow-xs">
                  <div class="py-1">
                    <router-link tag="a" :to="{ name: 'Forums' }" @click.native="closeCommunityDropdown" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Forums</router-link>
                  </div>
                  <!-- <div class="border-t border-gray-100"></div>
                  <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Users</a>
                  </div> -->
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end" v-if="searchEnabled">
        <div class="max-w-lg w-full lg:max-w-xs">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input id="search" v-model="search" v-on:keyup.enter="submitSearch" class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white sm:text-sm transition duration-150 ease-in-out" placeholder="Search" />
          </div>
        </div>
      </div>
      <div class="flex lg:hidden">
        <button @click="open = !open" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out">
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path :class="{'hidden': open, 'inline-flex': !open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path :class="{'hidden': !open, 'inline-flex': open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:block lg:ml-4">
        <div class="flex items-center">
          <div v-if="!loggedIn && !user" class="flex-shrink-0">
            <span>
              <router-link tag="button" :to="{ name: 'Login' }" type="button" class="relative inline-flex items-center leading-5 button button-white">
                Login
              </router-link>
            </span>
          </div>
          <div v-if="!loggedIn && !user" class="flex-shrink-0 ml-4">
            <span>
              <router-link tag="button" :to="{ name: 'Register' }" type="button" class="relative inline-flex items-center leading-5 button button-primary">
                Register
              </router-link>
            </span>
          </div>
          <!-- <button v-if="loggedIn && user" class="flex-shrink-0 p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button> -->
          <div v-if="loggedIn && user" class="relative flex-shrink-0" v-on-clickaway="closeUserDropdown">
            <div>
              <button @click="userDropdown = !userDropdown" class="flex text-sm rounded-full text-white focus:outline-none focus:shadow-solid transition duration-150 ease-in-out">
                <img class="h-8 w-8 rounded-full" :src="getUserAvatar(user)" :alt="user.username" />
              </button>
            </div>
            <transition name="fade">
              <div v-show="userDropdown" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                <div class="py-1 rounded-md bg-white shadow-xs">
                  <router-link tag="a" :to="{ name: 'UserProfile', params: { username: user.username } }" @click.native="closeUserDropdown" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Your Profile</router-link>
                  <router-link tag="a" :to="{ name: 'UserSettings' }" @click.native="closeUserDropdown" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Settings</router-link>
                  <router-link tag="a" :to="{ name: 'Login' }" @click.native="closeUserDropdown" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Sign out</router-link>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div :class="{ block: open, hidden: !open}" class="lg:hidden text-left">
    <div class="px-2 pt-2 pb-3">
      <router-link tag="a" :to="{ name: 'Games' }" @click.native="open=!open" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Browse Games</router-link>
      <router-link tag="a" :to="{ name: 'Reviews' }" @click.native="open=!open" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Reviews</router-link>
      <router-link tag="a" :to="{ name: 'Recommendations' }" @click.native="open=!open" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Recommendations</router-link>
      <router-link tag="a" :to="{ name: 'Forums' }" @click.native="open=!open" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Forums</router-link>
      <!-- <router-link tag="a" :to="{ name: 'Users' }" @click.native="open=!open" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Users</router-link> -->
    </div>
    <div class="pt-4 pb-3 border-t border-gray-700">
      <div class="flex items-center px-5" v-if="getCurrentUser()">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" :src="getUserAvatar(user)" :alt="user.username" />
        </div>
        <div class="ml-3">
          <div class="text-base font-medium leading-6 text-white">{{ user.username }}</div>
          <!-- <div class="text-sm font-medium leading-5 text-gray-400"></div> -->
        </div>
      </div>
      <div class="mt-3 px-2" v-if="getCurrentUser()">
        <router-link tag="a" :to="{ name: 'UserProfile', params: { username: user.username } }" @click.native="open=!open" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Your Profile</router-link>
        <router-link tag="a" :to="{ name: 'UserSettings' }" @click.native="open=!open" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Settings</router-link>
        <router-link tag="a" :to="{ name: 'Login' }" @click.native="open=!open" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Sign out</router-link>
      </div>
      <div class="mt-3 px-2" v-if="!getCurrentUser()">
        <router-link tag="a" :to="{ name: 'Login' }" @click.native="open=!open" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Login</router-link>
        <router-link tag="a" :to="{ name: 'Register' }" @click.native="open=!open" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Register</router-link>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { iconsMixin, authMixin } from '@/mixins';
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: 'Header',
  mixins: [iconsMixin, authMixin],
  directives: {
    onClickaway: onClickaway,
  },
  props: {
    background: {
      type: String,
      required: false,
      default: 'bg-gray-800'
    },
    searchEnabled: {
      type: Boolean,
      required: false,
      default: true
    },
  },
  data() {
      return {
          userDropdown: false,
          gamesDropdown: false,
          communityDropdown: false,
          open: false,
          search: ''
      }
  },
  computed: {
      user () {
          return this.$store.state.authentication.user;
      },
      loggedIn () {
          return this.$store.state.authentication.status.loggedIn;
      }
  },
  methods: {
    closeUserDropdown: function() {
      this.userDropdown = false;
    },
    closeGamesDropdown: function() {
      this.gamesDropdown = false;
    },
    closeCommunityDropdown: function() {
      this.communityDropdown = false;
    },
    submitSearch(){
      // if (this.$route.name == 'Games') {
      //   this.$router.push({ name: 'Games', query: { search: this.search } })
      //   this.$router.go()
      // } else {
      //   this.$router.push({ name: 'Games', query: { search: this.search } })
      // }
      this.$router.push({ name: 'Games', query: { search: this.search } })
    }
  }
}
</script>
<!--
<style lang="scss" scoped>
.is-active {
  @apply text-white bg-gray-900
}
</style> -->
