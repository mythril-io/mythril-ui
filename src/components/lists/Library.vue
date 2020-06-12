<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md -mx-4 sm:-mx-7">
    <ul>
      <li class="border-t border-gray-200 even:bg-gray-50" v-for="entry in data" :key="entry.id">
        <router-link :to="{ name: 'Game', params: { id: entry.release.game.id, slug: entry.release.game.slug }}" class="group block hover:bg-gray-100 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out sm:px-2">
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="min-w-0 flex-1 flex items-center">
              <div class="flex-shrink-0">
                <div class="overflow-hidden inline-block h-12 w-12 rounded-md border border-gray-100">
                  <img class="group-hover:scale-105 transform duration-150 ease-in-out" :src="$store.state.gameIconURL + entry.release.game.icon" :alt="entry.release.game.title" />
                </div>
              </div>
              <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4 items-center">
                <div>
                  <div class="text-sm md:text-md leading-5 font-bold text-primary truncate">{{ entry.release.game.title }}</div>
                  <div class="block md:hidden mt-2 flex items-center text-sm leading-5 text-gray-500">
                    <span class="truncate">{{ entry.release.platform.name }}</span>
                    <span v-if="entry.own" class="ml-2 bg-primary text-white tag">Own</span>
                    <span v-if="entry.digital" class="ml-2 bg-gray-200 tag">Digital</span>
                  </div>
                </div>
                <div class="hidden md:block">
                  <div>
                    <div class="text-sm leading-5 text-gray-500">
                      <span class="bg-info tag text-white">{{ entry.release.platform.name }}</span>
                      <span v-if="entry.own" class="ml-2 bg-primary text-white tag">Own</span>
                      <span v-if="entry.digital" class="ml-2 bg-gray-200 tag">Digital</span>
                    </div>
                    <div class="mt-2 text-sm leading-5 text-gray-500">
                      {{ 'Region: ' + entry.release.region.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-col items-end">
              <div>
                <span class="tag bg-gray-100 rounded-r-none">
                  Score
                </span>
                <span class="tag bg-primary text-white rounded-l-none">
                  {{ entry.score ? entry.score : '-' }}
                </span>
              </div>
              <div v-if="entry.hours" class="bg-warning tag mt-2">
                {{ entry.hours }} hrs
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'LibraryList',
	props: ['data'],
};
</script>
