<template>
  <div>

    <div class="wave-container">
      <Header :background="''" :searchEnabled="false" />

      <div class="container mx-auto">
        <div class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-32 mb-24 lg:mb-0">
            <div class="sm:text-center lg:text-left">
              <h2 class="text-4xl leading-10 font-bold text-gray-200 sm:text-5xl sm:leading-none md:text-5xl">
                Welcome to <span class="mako-shadow px-1">Mythril</span>!
              </h2>
              <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg  sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Track, discover, review, recommend and discuss video games.
              </p>
              <div class="flex justify-center lg:justify-start w-full mt-5 hidden lg:inline-flex">
                <div class="w-1/2 lg:w-7/12 xl:w-1/2 h-auto xl:h-48">
                  <transition name="fade">
                    <GameCard v-if="game" :game="game" />
                  </transition>
                </div>
              </div>
            </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFF" fill-opacity="1" d="M0,192L48,192C96,192,192,192,288,208C384,224,480,256,576,250.7C672,245,768,203,864,181.3C960,160,1056,160,1152,170.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </div>

    <Container class="z-50 relative xl:-mt-20">
      <h3 class="text-4xl leading-8 font-extrabold tracking-tight text-gray-700 sm:text-5xl sm:leading-10">
        Trending
      </h3>
    </Container>

    <div v-if="trendingGames" class="px-4 sm:px-6 md:px-8">
      <carousel-3d
        :border="0"
        :height="256"
        :width="608"
        :perspective="25"
        :controlsVisible="true"
        :autoplay="false"
        :autoplay-timeout="5000"
        :autoplayHoverPause="true">
        <slide v-for="(game, i) in trendingGames" :index="i" :key="i">
          <GameCard :game="game" />
        </slide>
      </carousel-3d>
    </div>

    <div class="overflow-hidden py-8 lg:py-12 mt-10">
      <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
        <svg class="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4" width="404" height="784" fill="none" viewBox="0 0 404 784">
          <defs>
            <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
        </svg>

        <div class="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div class="relative">
            <h3 class="text-4xl leading-8 font-extrabold tracking-tight text-gray-700 sm:text-5xl sm:leading-10">
              Reviews
            </h3>
            <p class="mt-4 text-lg leading-7 text-gray-500">
              Share your thoughts and opinions for games you really enjoyed playing or for ones you thought were mediocre! Read up on what other people have to say for games that interest you.
            </p>

            <ul class="mt-10">
              <li>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-gray-900">User Feedback</h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      Share your feedback for reviews you've read.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0">
            <svg class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden" width="784" height="404" fill="none" viewBox="0 0 784 404">
              <defs>
                <pattern id="ca9667ae-9f92-4be7-abcb-9e3d727f2941" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="784" height="404" fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
            </svg>
            <transition name="fade">
              <div v-if="review" class="relative px-6 md:px-0">
                <ReviewCard :data="review" />
              </div>
            </transition>
          </div>
        </div>

        <svg class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12" width="404" height="784" fill="none" viewBox="0 0 404 784">
          <defs>
            <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
        </svg>

        <div class="relative mt-12 sm:mt-16 lg:mt-24">
          <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div class="lg:ml-5 lg:col-start-2">
              <h3 class="text-4xl leading-8 font-extrabold tracking-tight text-gray-700 sm:text-5xl sm:leading-10">
                Recommendations
              </h3>
              <p class="mt-4 text-lg leading-7 text-gray-500">
                Looking for games that are similar to what you've played? Or have a suggestion? Then, check out or write a recommendation!
              </p>

              <ul class="mt-10">
                <li>
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                        <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-gray-900">Choose Specific Releases</h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        Recommend the PC version of Final Fantasy XII: The Zodiac Age instead of the original PS2 version.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <svg class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden" width="784" height="404" fill="none" viewBox="0 0 784 404">
                <defs>
                  <pattern id="e80155a9-dfde-425a-b5ea-1f6fadd20131" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="784" height="404" fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
              </svg>
              <transition name="fade">
                <div v-if="recommendation" class="relative px-6 md:px-0">
                  <RecommendationCard :data="recommendation" />
                </div>
              </transition>
              <!-- <img class="relative mx-auto" width="490" src="" alt="" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <Stats v-if="stats" class="my-15" :data="stats" />

    <div class="overflow-hidden py-8 lg:py-12">
      <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
        <svg class="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4" width="404" height="784" fill="none" viewBox="0 0 404 784">
          <defs>
            <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
        </svg>

        <div class="relative lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
          <div class="relative col-span-1">
            <h3 class="text-4xl leading-8 font-extrabold tracking-tight text-gray-700 sm:text-5xl sm:leading-10">
              Forums
            </h3>
            <p class="mt-4 text-lg leading-7 text-gray-500">
              Discuss games, news, events, hardware, strategies or anything else with the community!
            </p>

            <!-- <ul class="mt-10">
              <li>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-gray-900">Competitive exchange rates</h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                    </p>
                  </div>
                </div>
              </li>
            </ul> -->
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0 col-span-2">
            <svg class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden" width="784" height="404" fill="none" viewBox="0 0 784 404">
              <defs>
                <pattern id="ca9667ae-9f92-4be7-abcb-9e3d727f2941" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="784" height="404" fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
            </svg>
            <transition name="fade">
              <div class="relative px-6 md:px-0">
                <BaseCard>
                  <template #body>
                    <div class="flex">
                        <div class="flex-none">
                          <img class="inline-block h-24 w-24 rounded-full" src="@/assets/sample_avatar.jpg" alt="sample_avatar" />
                        </div>
                        <div class="text-gray-700 ml-7">
                          <div class="flex items-baseline">
                            <div class="font-bold">Sephiroth</div>
                            <div class="text-xs ml-1">15m ago</div>
                          </div>
                          <div class="mt-4 leading-relaxed">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p class="mt-3">
                              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                          </div>
                        </div>
                    </div>
                  </template>
                </BaseCard>
              </div>
            </transition>
          </div>
        </div>

        <svg class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12" width="404" height="784" fill="none" viewBox="0 0 404 784">
          <defs>
            <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
        </svg>

      </div>
    </div>


    <Container class="mt-10">
      <h3 class="text-4xl leading-8 font-extrabold tracking-tight text-gray-700 sm:text-5xl sm:leading-10">
        Recent User Activity
      </h3>
    </Container>

    <div v-if="recentActivity">
      <carousel-3d
        :border="0"
        :height="175"
        :width="500"
        :display="5"
        :controlsVisible="false"
        :perspective="0"
        :space="630"
        :disable3d="false"
        :autoplay="true"
        :autoplay-timeout="5000"
        :autoplayHoverPause="true">
        <slide v-for="(activity, i) in recentActivity" :index="i" :key="i">
          <UserActivityCard :data="activity" />
        </slide>
      </carousel-3d>
    </div>

    <Footer class="mt-15" />

  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import GameCard from '@/components/cards/Game.vue'
import BaseCard from '@/components/cards/Base.vue'
import ReviewCard from '@/components/cards/Review.vue'
import RecommendationCard from '@/components/cards/Recommendation.vue'
import UserActivityCard from '@/components/cards/UserActivity.vue'
import Container from '@/components/layout/Container.vue'
import Stats from '@/components/home/Stats.vue'
import Footer from '@/components/layout/Footer.vue'
import { homeService, gameService, reviewService, recommendationService, libraryService } from '@/services';

export default {
    name: 'Home',
    components: {
      Header, GameCard, Container, ReviewCard, RecommendationCard, Stats, BaseCard, UserActivityCard, Footer
    },
    data () {
      return {
        game: null,
        trendingGames: null,
        review: null,
        recommendation: null,
        stats: null,
        recentActivity: null
      }
    },
    methods: {
      getGame () {
        const { dispatch } = this.$store;
        gameService.get(295).then(
          response => {
            this.game = response.data;
          },
          error => {
            dispatch('alert/error', "Unable to retrieve game", { root: true });
          }
        );
      },
      getTrendingGames () {
        const { dispatch } = this.$store;
        gameService.getTrending().then(
          response => {
            this.trendingGames = response.data;
          },
          error => {
            dispatch('alert/error', "Unable to retrieve trending games", { root: true });
          }
        );
      },
      getReview () {
        const { dispatch } = this.$store;
        reviewService.getRecent().then(
          response => {
            this.review = response.data;
          },
          error => {
            dispatch('alert/error', "Unable to retrieve review", { root: true });
          }
        );
      },
      getRecommendation () {
        const { dispatch } = this.$store;
        recommendationService.getRecent().then(
          response => {
            this.recommendation = response.data;
          },
          error => {
            dispatch('alert/error', "Unable to retrieve recommendation", { root: true });
          }
        );
      },
      getUserActivity () {
        const { dispatch } = this.$store;
        libraryService.getRecent().then(
          response => {
            this.recentActivity = response.data;
          },
          error => {
            dispatch('alert/error', "Unable to retrieve recent user activity", { root: true });
          }
        );
      },
      getStats () {
        const { dispatch } = this.$store;
        homeService.get().then(
          response => {
            this.stats = response.data.stats;
          },
          error => {
            dispatch('alert/error', "Unable to retrieve stats", { root: true });
          }
        );
      }
    },
    created () {
        this.getGame();
        this.getTrendingGames();
        this.getReview();
        this.getRecommendation();
        this.getStats();
        this.getUserActivity();
    }
};
</script>

<style lang="scss">
.wave-container {
  background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("https://mythril.nyc3.cdn.digitaloceanspaces.com/games/banners/295.jpeg");
  background-size: cover; background-position: center;
  position: relative;
  color: #FFF;
  text-align: center;
  overflow: hidden;
}
.wave-container > svg {
  display: block !important;
  margin-top: -100px;
}
.carousel-3d-slide {
  @apply bg-white overflow-hidden shadow rounded-lg bg-transparent my-2 #{!important}
}
.carousel-3d-container {
  @apply h-auto pb-4 #{!important}
}
</style>
