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
        login({ dispatch, commit }, { username, password }) {
            commit('loginRequest', { username });

            userService.login(username, password)
                .then(
                    response => {
                        commit('loginSuccess', response.data.user);
                        router.push('/');
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        logout({ commit }) {
            userService.logout();
            commit('logout');
        },
        refreshToken({ dispatch, commit }) {
            userService.refreshToken()
            .then(
                response => { return response },
                error => {
                    dispatch('alert/error', error, { root: true });
                }
            );
        },
        verify({ dispatch, commit }, { token }) {
            userService.verify(token)
                .then(
                    response => {
                        commit('verifySuccess', response.data.user);
                        router.push('/');
                        dispatch('alert/success', "Your account has been verified!", { root: true });
                    },
                    error => {
                        commit('loginFailure', error);
                        router.push('/');
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        updateUser({ commit }, user) {
            commit('updateUser', user);
        },
    },
    mutations: {
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
        verifySuccess(state, user) {
            state.status = { loggingIn: false };
            state.status = { loggedIn: true };
            state.user = user;
        },
        updateUser(state, user) {
            state.user = user;
        },
    }
}
