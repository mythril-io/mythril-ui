<template>
  <BaseCard :padding="false">
    <template #body>

      <router-link :to="{ name: 'Game', params: { id: game.id }}" class="group lg:flex h-auto lg:h-64 hover:opacity-100">
        <div
          class="h-48 lg:h-auto lg:w-1/2 image-clip-path flex-none bg-cover text-center overflow-hidden group-hover:scale-105 transform duration-200 ease-out "
          v-bind:style="gameIcon" :title="game.title"
        >
        </div>
        <div class="flex flex-col p-4 leading-normal group-hover:opacity-75">
          <div class="w-full">
            <div class="text-gray-900 font-bold text-xl mb-1">{{ game.title }}</div>
            <div class="mb-6">
              <span class="tag bg-gray-100 rounded-r-none text-red-600">
                <svg class="fill-current inline-block h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path class="heroicon-ui" d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"/>
                </svg>
              </span>
              <span class="tag bg-primary text-white rounded-l-none mr-2 mb-1">
                <span v-if="game.score">{{ game.score | percentageFormat }}</span>
                <span v-else>-</span>
              </span>
              <span class="tag bg-gray-100 mr-2">{{ game.developer.name }}</span>
              <span class="tag bg-gray-100">{{ game.library_count }} Users</span>
            </div>
          </div>
          <div class="w-full  text-gray-700 text-sm synopsis">
            {{ game.synopsis }}
          </div>
        </div>
      </router-link>
    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/cards/Base.vue'

export default {
    name: 'GameCard',
    components: {
      BaseCard
    },
    props: {
      game: {
        type: Object,
        required: true
      },
    },
    computed: {
      gameIconURL () {
        return (this.$store.state.gameIconURL + this.game.icon);
      },
      gameIcon () {
        return {
          backgroundImage: 'url(' + this.gameIconURL + ')',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }
      }

    },
};
</script>

<style scoped>
@media only screen and (min-width: 1024px) {
  .image-clip-path {
    clip-path: polygon(0 0, 90% 0, 100% 100%, 0 100%);
  }
}
.synopsis {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}
</style>
