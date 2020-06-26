export const games = {
    namespaced: true,
    state: {
        filters: {
            genres: [],
            platforms: [],
            developers: [],
            publishers: [],
            score: 0,
            search: ''
        }
    },
    actions: {
        updateFilters({ commit }, filters) {
            commit('updateFilters', filters);
        },
        clearFilters({ commit }) {
            commit('clearFilters');
        },
        updateSearch({ commit }, { search }) {
            commit('updateSearch', search);
        },
        updateScore({ commit }, { score }) {
            commit('updateScore', score);
        },
        updateGenres({ commit }, { genres }) {
            commit('updateGenres', genres);
        },
        updatePlatforms({ commit }, { platforms }) {
            commit('updatePlatforms', platforms);
        },
        updateDevelopers({ commit }, { developers }) {
            commit('updateDevelopers', developers);
        },
        updatePublishers({ commit }, { publishers }) {
            commit('updatePublishers', publishers);
        },
    },
    mutations: {
        updateFilters(state, filters) {
            state.filters = filters;
        },
        clearFilters(state) {
            state.filters = {
                genres: [],
                platforms: [],
                developers: [],
                publishers: [],
                score: 0,
                search: ''
            };
        },
        updateSearch(state, search) {
            state.filters.search = search;
        },
        updateScore(state, score) {
            state.filters.score = score;
        },
        updateGenres(state, genres) {
            state.filters.genres = genres;
        },
        updatePlatforms(state, platforms) {
            state.filters.platforms = platforms;
        },
        updateDevelopers(state, developers) {
            state.filters.developers = developers;
        },
        updatePublishers(state, publishers) {
            state.filters.publishers = publishers;
        },
    }
}
