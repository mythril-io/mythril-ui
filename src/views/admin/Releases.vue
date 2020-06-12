<template>
<div>

  <Title title="Releases" />

  <Message class="mt-2 text-white" background="bg-primary">
    <div class="mb-4">Select a Game</div>
    <SelectGame v-model="game" />
  </Message>

  <ReleasesList v-if="game" class="mt-5" :gameId="game.id"/>

</div>
</template>

<script>
import Title from '@/components/admin/Title.vue'
import Message from '@/components/Message.vue'
import SelectGame from '@/components/forms/SelectGame.vue'
import ReleasesList from '@/components/lists/Releases.vue'

export default {
    name: 'AdminGenres',
    components: {
      Title, Message, SelectGame, ReleasesList
    },
    data () {
      return {
        game: null,
      }
    },
};
</script>
