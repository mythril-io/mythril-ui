import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';

Vue.use(Vuex)

const cdnURL = 'https://mythril.nyc3.cdn.digitaloceanspaces.com/';

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
    users
  }
})
