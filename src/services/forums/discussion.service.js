import { axios } from '../../utilities';

export const discussionService = {
    getByPage,
    get,
    post,
    patch,
    deleteResource, 
    getPostsByPage,
    addPost,
    toggleLike,
    toggleSubscribe,
};

const rootURL = '/forums';

function getByPage(page=1, tag=null, sort='recent') {
    var param = ''
    var query = `?page=${page}&sort=${sort}`
    tag ? param = `/${tag}` : ''

    return axios.get(rootURL + param + query)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function get(id) {
    return axios.get(rootURL + '/discussions/' + id)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function post(resource) {
    return axios.post(rootURL + '/discussions', resource)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function patch(resource) {
    return axios.patch(rootURL + '/discussions/' + resource.id, resource)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function deleteResource(id) {
    return axios.delete(rootURL + '/discussions/' + id)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function getPostsByPage(id, page=1) {
    return axios.get(rootURL + `/discussions/${id}/posts?page=${page}`)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function addPost(id, resource) {
    return axios.post(rootURL + '/discussions/' + id, resource)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function toggleLike(resource) {
    return axios.post(rootURL + `/discussions/${resource.id}/like`)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function toggleSubscribe(resource) {
    return axios.post(rootURL + `/discussions/${resource.id}/subscribe`)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}
