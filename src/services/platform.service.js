import { axios } from '../utilities';

export const platformService = {
    getByPage,
    getAll,
    get,
    post,
    put,
    deleteResource
};

const rootURL = '/platforms';

function getByPage(page=1, search='') {
    return axios.get(`${rootURL}?page=${page}&search=${search}`)
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
  }

function getAll() {
  return axios.get(`/all-platforms`)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function get(id) {
  return axios.get(`${rootURL}/${id}`)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function post(resource) {
  return axios.post(rootURL, resource)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function put(resource) {
  return axios.put(`${rootURL}/${resource.id}`, resource)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function deleteResource(id) {
  return axios.delete(`${rootURL}/${id}`)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}
