import store from '@/store'

export const authMixin = {
  methods: {
    getCurrentUser() {
      const currentUser = store.state.authentication.user ? store.state.authentication.user : null
      return currentUser;
    },
    currentUserIsAdmin() {
      // const currentUser = store.state.authentication.user ? store.state.authentication.user : null
      // return currentUser;
    },
    currentUserEquals(user) {
      const currentUser = store.state.authentication.user
      if (!currentUser) {
        return false;
      }
      if (currentUser.id == user.id) {
        return true;
      }
    }
  }
}
