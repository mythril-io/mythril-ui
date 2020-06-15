import { userService } from '@/services';
import router from '@/router';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user: user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, { email, password }) {
            commit('loginRequest', { email });
            userService.login(email, password)
                .then(
                    response => {
                        commit('loginSuccess', response.data);
                        router.push('/');
                    },
                    error => {
                        commit('loginFailure');
                        dispatch('alert/error', error.message, { root: true });
                    }
                );
        },
        logout({ dispatch, commit }) {
            userService.logout()
                .then(
                    response => commit('logout'),
                    error => dispatch('alert/error', error.message, { root: true })
                );
        },
        register({ dispatch, commit }, { email, username, password, password_confirmation, recaptchaToken }) {
            return new Promise((resolve, reject) => {
              userService.register(email, username, password, password_confirmation, recaptchaToken)
                  .then(
                      response => {
                          commit('registrationSuccess', response.data);
                          dispatch('alert/success', response.message, { root: true });
                          router.push('/');
                          resolve(response);
                      },
                      error => {
                          commit('registrationFailure');
                          dispatch('alert/error', error.message, { root: true });
                          reject(error);
                      }
                  );
            });
        },
        forgotPassword({ dispatch }, { email }) {
            userService.forgotPassword(email)
                .then(
                    response => dispatch('alert/success', response.message, { root: true }),
                    error => dispatch('alert/error', error.message, { root: true })
                );
        },
        resetPassword({ dispatch, commit }, { token, email, password, password_confirmation }) {
            userService.resetPassword(token, email, password, password_confirmation)
                .then(
                    response => {
                        commit('loginSuccess', response.data);
                        dispatch('alert/success', 'Your password has been reset!', { root: true });
                        router.push('/');
                    },
                    error => {
                        commit('loginFailure');
                        dispatch('alert/error', error.message, { root: true });
                    }
                );
        },
        verifyEmail({ dispatch, commit }, { id, token, expires, signature }) {
            userService.verifyEmail(id, token, expires, signature)
                .then(
                    response => {
                        commit('loginSuccess', response.data);
                        dispatch('alert/success', 'Your email has been verified!', { root: true });
                        router.push('/');
                    },
                    error => {
                        commit('loginFailure');
                        dispatch('alert/error', error.message, { root: true });
                    }
                );
        },
        updateUser({ commit }, user) {
            commit('updateUser', user);
        },
    },
    mutations: {
        registrationSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        registrationFailure(state) {
            state.status = {};
            state.user = null;
        },
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.status = { loggedIn: false };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggingIn: false };
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        },
        updateUser(state, user) {
            state.user = user;
        },
    }
}
