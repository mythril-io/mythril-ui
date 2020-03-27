import store from '@/store'


export const iconsMixin = {
  methods: {
    getUserAvatar (user) {
      if (user && user.avatar) {
        return (store.state.userAvatarURL + user.avatar);
      } else {
        return store.state.userAvatarURL + "default.jpg";
      }
    },
    getUserBanner (user) {
      if (user && user.banner) {
        return (store.state.userBannerURL + user.banner);
      } else {
        return '';
      }
    },
    getCurrentUserAvatar() {
      const currentUser = store.state.authentication.user ? store.state.authentication.user : null
      return this.getUserAvatar(currentUser);
    },
    getCurrentUserBanner() {
      const currentUser = store.state.authentication.user ? store.state.authentication.user : null
      return this.getUserBanner(currentUser);
    },
    getUserBannerStyle(banner) {
      if (banner) {
        return {
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + store.state.userBannerURL + banner + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        };
      }
      return {}
    },
    getGameIcon (game) {
      if (game && game.icon) {
        return (store.state.gameIconURL + game.icon);
      } else {
        return '';
      }
    },
    getGameBanner (game) {
      if (game && game.banner) {
        return (store.state.gameBannerURL + game.banner);
      } else {
        return '';
      }
    },
    getGameBannerStyle(banner) {
      return {
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + store.state.gameBannerURL + banner + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      };
    }
  }
}
