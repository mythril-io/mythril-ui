import { axios } from '../utilities';

export const favouriteService = {
    getByUser,
    getByGameAndUser,
    post,
    put,
    deleteResource
};

const rootURL = '/favourites/';

function getByUser(id) {
  return axios.get(rootURL + 'user/' + id)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

// User ID is obtained from access_token
function getByGameAndUser(id) {
  return axios.get(rootURL + 'game/' + id)
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
