<template>
  <div>
    <Hero title="Forums" />
    <Container class="min-h-1/2">
      <Message class="mt-2">
        <div class="text-center">
          The forums are currently being upgraded, they'll be back soon!
        </div>
      </Message>
    </Container>

  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Container from '@/components/layout/Container.vue'
import Message from '@/components/Message.vue'

export default {
  name: 'Recommendations',
  components: {
    Hero, Container, Message
  }
}
</script>
