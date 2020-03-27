<template>
  <div id="app">
    <div v-if="!$route.meta.plainLayout">
      <transition name="fade">
        <Notification v-if="alert.message" :type="alert.type">{{alert.message}}</Notification>
      </transition>
      <Header />
        <router-view/>
      <Footer />
    </div>

    <div v-if="$route.meta.plainLayout">
      <transition name="fade">
        <Notification v-if="alert.message" :type="alert.type">{{alert.message}}</Notification>
      </transition>
      <router-view/>
    </div>

  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Notification from '@/components/Notification.vue'

export default {
    name: 'app',
    components: {
      Header, Footer, Notification
    },
    computed: {
        alert () {
            return this.$store.state.alert
        }
    },
    watch:{
        $route (to, from){
            // clear alert on location change
            this.$store.dispatch('alert/clear');
        }
    }
};
</script>
