<template>
  <BaseCard :padding="false" class="review-card">
    <template #body>

      <router-link :to="{ name: 'Review', params: { id: data.id }}" class="group lg:flex h-auto lg:h-64 hover:opacity-100">
        <div
          class="h-48 lg:h-auto lg:w-1/2 image-clip-path flex-none bg-cover text-center overflow-hidden group-hover:scale-105 transform duration-200 ease-out "
          v-bind:style="gameIcon" :title="getTitle(data)"
        >
        </div>
        <div class="flex flex-col p-4 leading-normal group-hover:opacity-75 transition duration-150 ease-in-out">
          <div class="w-full mb-4">
            <div class="text-gray-900 font-bold text-xl mb-1">{{ getTitle(data) }}</div>
            <div>
              <span class="tag bg-gray-100 rounded-r-none text-red-600">
                <svg class="fill-current inline-block h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path class="heroicon-ui" d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"/>
                </svg>
              </span>
              <span class="tag bg-primary text-white rounded-l-none mr-2 mb-1">{{ data.score | percentageFormat }}</span>
              <span class="tag bg-gray-100 mr-2" :aria-label="data.release.platform.name" data-balloon-pos="up">{{ data.release.platform.acronym }}</span>
              <span class="tag bg-gray-100" :aria-label="userSentiment" data-balloon-pos="up">
                <svg class="fill-current inline-block h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div class="w-full text-gray-700 text-sm synopsis">
            {{ data.summary }}
          </div>
          <div class="w-full mt-3 text-gray-400 text-xs">
            {{ data.user.username }} &#183; {{ data.created_at | dateFormat }}
          </div>
        </div>
      </router-link>
    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/cards/Base.vue'
import { iconsMixin, gameTitleMixin } from '@/mixins';

export default {
    name: 'ReviewCard',
    mixins: [iconsMixin, gameTitleMixin],
    components: {
      BaseCard
    },
    props: {
      data: {
        type: Object,
        required: true
      },
    },
    computed: {
      gameIcon () {
        return {
          backgroundImage: 'url(' + this.getGameIcon(this.data.release.game) + ')',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }
      },
      userSentiment () {
        const total = this.data.likes + this.data.dislikes;
        const userString = (total == 1 ? 'user' : 'users')

        if (total > 0) {
          return `${this.data.likes} out of ${total} ${userString} liked this review`
        }
        return '0 users liked this review'
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
