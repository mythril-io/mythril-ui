<template>
  <BaseCard :padding="false">
    <template #body>

      <router-link :to="{ name: 'Recommendation', params: { id: data.id }}" class="group lg:flex h-auto lg:h-64 hover:opacity-100 recommendation">

        <div class="left-icon bg-center bg-no-repeat bg-cover lg:bg-auto" v-bind:style="gameIcon(data.game)" ></div>
        <div class="flex items-center p-4 group-hover:opacity-75 middle">
          <div>
            <div class="text-gray-900 text-md mb-1">
              "If you liked <span class="text-primary">{{ getTitle(data) }}</span>, you may also like <span class="text-primary">{{ getRecommendedTitle(data) }}</span>"
            </div>
            <span class="tag bg-primary text-white mr-2">{{ data.user.username }}</span>
            <span class="tag bg-gray-100">{{ data.created_at | dateFormat }}</span>
          </div>
        </div>
        <div class="right-icon bg-center bg-no-repeat bg-cover lg:bg-auto h-24 lg:h-auto" v-bind:style="gameIcon(data.recommended_game)" ></div>

      </router-link>

    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/cards/Base.vue'
import { iconsMixin, gameTitleMixin } from '@/mixins';

export default {
    name: 'RecommendationCard',
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
    methods: {
      gameIcon (game) {
        return {
          backgroundImage: 'url(' + this.getGameIcon(game) + ')',
        }
      }

    },
};
</script>

<style scoped>
@media only screen and (min-width: 1024px) {

  .left-icon {
    width: 50%;
    clip-path: polygon(0 0, 90% 0, 100% 100%, 0 100%);
    transition: width 0.5s, clip-path 0.5s;
  }
  .middle {
    width: 37.5%;
  }
  .right-icon {
    width: 12.5%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transition: width 0.5s, clip-path 0.5s;
  }

  .recommendation:hover .left-icon {
    width: 12.5%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  .recommendation:hover .right-icon {
    width: 50%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
  }

}

</style>
