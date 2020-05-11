// import { roles } from '@/utilities'
const roles = {
    Admin: 'admin'
};

export const routes = [
  {
    path: '/', name: 'Home', component: () => import('@/views/Home.vue'), meta: { plainLayout: true },
    beforeEnter: (to, from, next) => {
      // If user is logged in redirect them to the Dashboard
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser) {
        return next({ name: 'Games' });
      }
      next();
    }
  },
  { path: '/dashboard', name: 'Dashboard', component: () => import('@/views/Dashboard.vue'), meta: { authorize: [] } },
  { path: '/login', name: 'Login', component: () => import('@/views/auth/Login.vue'), meta: { requiresGuest: true } },
  { path: '/register', name: 'Register', component: () => import('@/views/auth/Register.vue'), meta: { requiresGuest: true } },
  { path: '/verify', name: 'SendVerifyEmail', component: () => import('@/views/auth/SendVerifyEmail.vue'), meta: { authorize: [] } },
  { path: '/email/verify/:id/:token', name: 'VerifyEmail', component: () => import('@/views/auth/VerifyEmail.vue') },

  { path: '/forgot-password', name: 'ForgotPassword', component: () => import('@/views/auth/ForgotPassword.vue'), meta: { requiresGuest: true } },
  { path: '/password/reset/:token', name: 'ResetPassword', component: () => import('@/views/auth/ResetPassword.vue'), meta: { requiresGuest: true } },
  { path: '/games', name: 'Games', component: () => import('@/views/games/Main.vue') },
  {
    path: '/games/:id(\\d+)/:slug', component: () => import('@/views/games/View.vue'),
    children: [
      { path: '', name: 'Game', component: () => import('@/views/games/view/Overview.vue') },
      { path: 'reviews', name: 'GameReviews', component: () => import('@/views/games/view/Reviews.vue') },
      { path: 'recommendations', name: 'GameRecommendations', component: () => import('@/views/games/view/Recommendations.vue') },
      { path: 'releases', name: 'GameReleases', component: () => import('@/views/games/view/Releases.vue') },
    ]
  },
  {
    path: '/user/:username', component: () => import('@/views/user/Profile.vue'),
    children: [
      { path: '', name: 'UserProfile', component: () => import('@/views/user/profile/Overview.vue') },
      {
        path: 'library', component: () => import('@/views/user/profile/Library.vue'),
        children: [
          { path: '', name: 'UserLibrary', component: () => import('@/views/user/profile/library/All.vue') },
          { path: 'playing', name: 'UserLibraryPlaying', component: () => import('@/views/user/profile/library/Playing.vue') },
          { path: 'completed', name: 'UserLibraryCompleted', component: () => import('@/views/user/profile/library/Completed.vue') },
          { path: 'planning', name: 'UserLibraryPlanning', component: () => import('@/views/user/profile/library/Planning.vue') },
          { path: 'hold', name: 'UserLibraryOnHold', component: () => import('@/views/user/profile/library/OnHold.vue') },
          { path: 'dropped', name: 'UserLibraryDropped', component: () => import('@/views/user/profile/library/Dropped.vue') },
        ]
      },
      { path: 'reviews', name: 'UserReviews', component: () => import('@/views/user/profile/Reviews.vue') },
      { path: 'recommendations', name: 'UserRecommendations', component: () => import('@/views/user/profile/Recommendations.vue') },
      { path: 'followers', name: 'UserFollowers', component: () => import('@/views/user/profile/Followers.vue') },
      { path: 'following', name: 'UserFollowing', component: () => import('@/views/user/profile/Following.vue') },
      // { path: 'stats', name: 'UserStats', component: () => import('@/views/user/profile/Stats.vue') },
    ]
  },
  {
    path: '/settings', component: () => import('@/views/user/Settings.vue'), meta: { authorize: [] },
    children: [
      { path: '', name: 'UserSettings', component: () => import('@/views/user/settings/Details.vue'), meta: { authorize: [] } },
      { path: 'images', name: 'SettingsImages', component: () => import('@/views/user/settings/Images.vue'), meta: { authorize: [] } },
      { path: 'social', name: 'SettingsSocial', component: () => import('@/views/user/settings/Social.vue'), meta: { authorize: [] } },
      { path: 'password', name: 'SettingsPassword', component: () => import('@/views/user/settings/Password.vue'), meta: { authorize: [] } },
    ]
  },
  { path: '/reviews', name: 'Reviews', component: () => import('@/views/reviews/Main.vue') },
  { path: '/reviews/:id(\\d+)', name: 'Review', component: () => import('@/views/reviews/View.vue') },
  { path: '/reviews/create', name: 'CreateReview', component: () => import('@/views/reviews/Create.vue'), meta: { authorize: [] } },

  { path: '/recommendations', name: 'Recommendations', component: () => import('@/views/recommendations/Main.vue') },
  { path: '/recommendations/:id(\\d+)', name: 'Recommendation', component: () => import('@/views/recommendations/View.vue') },
  { path: '/recommendations/create', name: 'CreateRecommendation', component: () => import('@/views/recommendations/Create.vue'), meta: { authorize: [] } },

  { path: '/forums', name: 'Forums', component: () => import('@/views/forums/Main.vue') },
  {
    path: '/admin', component: () => import('@/views/admin/Main.vue'),
    meta: { authorize: ['roles.Admin'], plainLayout: true},
    children: [
      {
        path: '', name: 'AdminDashboard', component: () => import('@/views/admin/Dashboard.vue'),
        meta: { authorize: [roles.Admin], plainLayout: true }
      },
      {
        path: 'games', name: 'AdminGames', component: () => import('@/views/admin/Games.vue'),
        meta: { authorize: [roles.Admin], plainLayout: true }
      },
      {
        path: 'games/:id/edit', name: 'AdminGameEdit', component: () => import('@/views/admin/forms/Game.vue'),
        meta: { authorize: [roles.Admin], plainLayout: true }
      },
      {
        path: 'games/create', name: 'AdminGameCreate', component: () => import('@/views/admin/forms/Game.vue'),
        meta: { authorize: [roles.Admin], plainLayout: true }
      },
      {
        path: 'platforms', name: 'AdminPlatforms', component: () => import('@/views/admin/Platforms.vue'),
        meta: { authorize: [roles.Admin], plainLayout: true }
      },
      {
        path: 'platforms/:id/edit', name: 'AdminPlatformEdit', component: () => import('@/views/admin/forms/Platform.vue'),
        meta: { authorize: [roles.Admin], plainLayout: true }
      },
      {
        path: 'platforms/create', name: 'AdminPlatformCreate', component: () => import('@/views/admin/forms/Platform.vue'),
        meta: { authorize: [roles.Admin], plainLayout: true }
      },
      {
        path: 'genres', name: 'AdminGenres', component: () => import('@/views/admin/Genres.vue'),
        meta: { authorize: [roles.Admin], plainLayout: true }
      },
      {
        path: 'developers', name: 'AdminDevelopers', component: () => import('@/views/admin/Developers.vue'),
        meta: { authorize: [roles.Admin], plainLayout: true }
      },
      {
        path: 'publishers', name: 'AdminPublishers', component: () => import('@/views/admin/Publishers.vue'),
        meta: { authorize: [roles.Admin], plainLayout: true }
      },
    ]
  },
  { path: '/privacy-policy', name: 'PrivacyPolicy', component: () => import('@/views/PrivacyPolicy.vue') },
  { path: '/faq', name: 'FAQ', component: () => import('@/views/FAQ.vue') },
  { path: '/terms-of-service', name: 'TermsOfService',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/TermsOfService.vue') },
  // otherwise redirect to home
  { path: '*', redirect: '/' }
]
