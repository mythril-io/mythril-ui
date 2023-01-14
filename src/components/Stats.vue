<template>

  <div class="bg-primary">
    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
      <div class="mt-10 text-center sm:max-w-7xl sm:mx-auto sm:grid sm:grid-cols-5 sm:gap-8">
        <div>
          <p class="text-5xl leading-none font-extrabold text-white">
            <router-link :to="{ name: 'Games' }">{{ data.games }}</router-link>
          </p>
          <p class="mt-2 text-lg leading-6 font-medium text-white">
            Games
          </p>
        </div>
        <div class="mt-10 sm:mt-0">
          <p class="text-5xl leading-none font-extrabold text-white">
            <router-link :to="{ name: 'Games' }">{{ data.releases }}</router-link>
          </p>
          <p class="mt-2 text-lg leading-6 font-medium text-white">
            Releases
          </p>
        </div>
        <div class="mt-10 sm:mt-0">
          <p class="text-5xl leading-none font-extrabold text-white">
            {{ data.users }}
          </p>
          <p class="mt-2 text-lg leading-6 font-medium text-white">
            Users
          </p>
        </div>
        <div class="mt-10 sm:mt-0">
          <p class="text-5xl leading-none font-extrabold text-white">
            <router-link :to="{ name: 'Reviews' }">{{ data.reviews }}</router-link>
          </p>
          <p class="mt-2 text-lg leading-6 font-medium text-white">
            Reviews
          </p>
        </div>
        <div class="mt-10 sm:mt-0">
          <p class="text-5xl leading-none font-extrabold text-white">
            <router-link :to="{ name: 'Recommendations' }">{{ data.recommendations }}</router-link>
          </p>
          <p class="mt-2 text-lg leading-6 font-medium text-white">
            Recommendations
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
    name: 'Stats',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
};
</script>
