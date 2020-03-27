import { axios } from '../utilities';

export const playStatusService = {
    getAll,
    get,
    post,
    put,
    deleteResource
};

const rootURL = '/playstatuses/';

function getAll() {
  return axios.get(rootURL)
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
