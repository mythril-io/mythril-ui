const ax = require('axios');
import config from 'config';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { userService } from '@/services';

import router from '../router'
import store from '../store'


/**
 * axios instantiation and default headers
 * Request/Response interceptor configuration
 */

const instance = ax.create({
  baseURL: `${config.apiUrl}`
});

// Set default axios headers
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Set Request interceptors
instance.interceptors.request.use(function (config) {
  let access_token = JSON.parse(localStorage.getItem('access_token'));
  if (access_token != null) {
    config.headers.Authorization = 'Bearer ' + access_token;
  }
  return config;
});

// Set Response interceptors
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const error_code = error.response.status;
    const error_message = error.response.data.error;
    let access_token = JSON.parse(localStorage.getItem('access_token'));

    if (router.currentRoute.name != 'Login') {
      // 401 & expired/invalid/missing access_token
      if (error_code == 401 && (error_message == 'ExpiredRefreshError' || error_message == 'InvalidTokenHeader' || error_message == 'MissingTokenHeader')) {
        router.push({ name: 'Login' });
      }
    }

    return Promise.reject(error);
  });


/**
 * axios-auth-refresh library
 * Implements automatic refresh of authorization
 * via axios interceptors
 */

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axios.get(`${config.apiUrl}/users/refresh`).then(response => {
    localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
    return Promise.resolve();
});

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(instance, refreshAuthLogic);

export const axios = instance
