import { axios } from '../utilities';

export const gameService = {
    getByPage,
    search,
    getTrending,
    get,
    post,
    put,
    deleteResource
};

const rootURL = '/games/';

function getByPage(page=1, filters=null) {
  let query = '';
  if (filters) {
    // query = new URLSearchParams(filters).toString();
    query = Object.entries(filters).map(([key, val]) => `${key}=${val}`).join('&')
  }
  return axios.get(rootURL + 'page/' + page + '?' + query)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function search(query='') {
  return axios.get(rootURL + 'search?query=' + query)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function getTrending() {
  return axios.get(rootURL + 'trending')
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function get(id) {
  return axios.get(rootURL + id)
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
  return axios.put(rootURL + resource.id, resource)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function deleteResource(id) {
  return axios.delete(rootURL + id)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}
