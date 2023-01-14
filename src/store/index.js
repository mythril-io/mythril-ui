import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';
import { games } from './games.module';

Vue.use(Vuex)

const cdnURL = process.env.VUE_APP_STORAGE;

// export const store = new Vuex.Store
export default new Vuex.Store({
  state: {
    cdnURL: cdnURL,
    userAvatarURL: cdnURL + 'users/avatars/',
    userBannerURL: cdnURL + 'users/banners/',
    gameIconURL: cdnURL + 'games/icons/',
    gameBannerURL: cdnURL + 'games/banners/'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alert,
    authentication,
    users,
    games
  }
})
