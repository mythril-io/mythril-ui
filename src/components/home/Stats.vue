<template>

  <div class="bg-primary">
    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
      <!-- <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
          Trusted by developers from over 80 planets
        </h2>
        <p class="mt-3 text-xl leading-7 text-indigo-200 sm:mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus repellat laudantium.
        </p>
      </div> -->
      <div class="mt-10 text-center sm:max-w-7xl sm:mx-auto sm:grid sm:grid-cols-5 sm:gap-8">
        <div>
          <p class="text-5xl leading-none font-extrabold text-white">
            {{ data.games | numberAverage }}
          </p>
          <p class="mt-2 text-lg leading-6 font-medium text-white">
            Games
          </p>
        </div>
        <div class="mt-10 sm:mt-0">
          <p class="text-5xl leading-none font-extrabold text-white">
            {{ data.releases | numberAverage }}
          </p>
          <p class="mt-2 text-lg leading-6 font-medium text-white">
            Releases
          </p>
        </div>
        <div class="mt-10 sm:mt-0">
          <p class="text-5xl leading-none font-extrabold text-white">
            {{ data.users | numberAverage }}
          </p>
          <p class="mt-2 text-lg leading-6 font-medium text-white">
            Users
          </p>
        </div>
        <div class="mt-10 sm:mt-0">
          <p class="text-5xl leading-none font-extrabold text-white">
            {{ data.reviews | numberAverage }}
          </p>
          <p class="mt-2 text-lg leading-6 font-medium text-white">
            Reviews
          </p>
        </div>
        <div class="mt-10 sm:mt-0">
          <p class="text-5xl leading-none font-extrabold text-white">
            {{ data.recommendations | numberAverage }}
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
