import { axios } from '../utilities';

export const reviewService = {
    getByPage,
    getByGameAndPage,
    getByUserAndPage,
    like,
    dislike,
    getUserSentiment,
    get,
    post,
    put,
    patch,
    deleteResource
};

const rootURL = '/reviews/';

function getByPage(page=1) {
  return axios.get(rootURL + '?page=' + page)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function getByGameAndPage(id, page=1) {
  return axios.get(rootURL + 'game/' + id + '?page=' + page)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function getByUserAndPage(username, page=1) {
  return axios.get(rootURL + 'user/' + username + '?page=' + page)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function like(id) {
  return axios.post(rootURL + id + '/like')
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function dislike(id) {
  return axios.post(rootURL + id + '/dislike')
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function getUserSentiment(id) {
  return axios.get(rootURL + id + '/user-sentiment')
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

function patch(resource) {
  return axios.patch(rootURL + resource.id, resource)
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
