<template>
  <BaseCard :padding="false">
    <template #body>

      <div class="group flex justify-between items-center h-full hover:opacity-100" style="height: 175px;">
        <div class="flex-none pl-5 hidden lg:inline-flex">
          <router-link :to="{ name: 'UserProfile', params: { id: data.user.id }}">
            <img class="inline-block h-24 w-24 rounded-full" :src="getUserAvatar(data.user)" :alt="data.user.username" />
          </router-link>
        </div>
        <div class="w-7/12 md:w-1/2 px-5 -mt-3 md:mt-0">
          <p class="text-gray-700 font-medium text-xl ">
            <router-link :to="{ name: 'UserProfile', params: { id: data.user.id }}">
              {{ data.user.username }}
            </router-link>
          </p>
          <p class="text-sm antialiased">
            {{ data.play_status.name }}: <router-link :to="{ name: 'Game', params: { id: data.game.id }}" class="text-primary hover:underline">{{ data.game.title }}</router-link>.
          </p>
          <p><small class="mt-2 md:mt-5 tag">{{ data.created_at | ago }}</small></p>
        </div>
        <div
          class="h-full w-5/12 md:w-1/3 image-clip-path flex-none bg-cover bg-no-repeat bg-center text-center overflow-hidden group-hover:scale-105 transform duration-200 ease-out "
          v-bind:style="gameIcon" :title="data.game.title"
        >
        </div>
      </div>

    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/cards/Base.vue'
import { iconsMixin, gameTitleMixin } from '@/mixins';

export default {
    name: 'UserActivityCard',
    mixins: [iconsMixin, gameTitleMixin],
    components: {
      BaseCard
    },
    props: {
      data: {
        required: true
      },
    },
    computed: {
      gameIcon () {
        return {
          backgroundImage: 'url(' + this.getGameIcon(this.data.game) + ')',
        }
      }
    },
};
</script>

<style scoped>
/* @media only screen and (min-width: 1024px) { */
  .image-clip-path {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
  }
/* } */
</style>
