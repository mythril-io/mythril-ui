import { axios } from '../../utilities';

export const postService = {
    post,
    patch,
    deleteResource,
    toggleLike,
    find
};

const rootURL = 'forums';

function post(resource, id) {
    return axios.post(rootURL + '/discussions/' + id, resource)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function patch(resource) {
    return axios.patch(rootURL + '/posts/' + resource.id, resource)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function deleteResource(id) {
    return axios.delete(rootURL + '/' + id)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function toggleLike(resource) {
    return axios.post(rootURL + `/posts/${resource.id}/like`)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function find(resource) {
    return axios.get(rootURL + `/posts/${resource.id}/find`)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}
