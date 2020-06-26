import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'is-active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const { requiresGuest } = to.meta;
  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (currentUser && requiresGuest) {
    return next({ path: '/' });
  }

  if (currentUser && !currentUser.email_verified_at && to.name != 'SendVerifyEmail' && to.name != 'VerifyEmail') {
      return next({ name: 'SendVerifyEmail' });
  }

  if (authorize) {
      if (!currentUser) {
          return next({ path: '/login', query: { returnUrl: to.path } });
      }

      // Allow access if no specific role is required
      if (authorize.length == 0) {
          return next();
      }

      // If user doesn't have the required role, redirect to homepage
      const hasRole = currentUser.rolenames.some(item => authorize.includes(item))
      if (!hasRole) {
          return next({ path: '/' });
      }
  }

  next();
})

router.afterEach((to, from) => {
  from.name == 'Games' ? store.dispatch('games/clearFilters') : '';
})

export default router
