import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'is-active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/login', '/register', '/verify', '/reverify', '/about'];
  // const authRequired = !publicPages.includes(to.path);
  // const currentUser = localStorage.getItem('user');

  // if (authRequired && !loggedIn) {
  //   return next('/login');
  // }

  const { authorize } = to.meta;
  const { requiresGuest } = to.meta;
  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (currentUser && requiresGuest) {
    return next({ path: '/' });
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

export default router
