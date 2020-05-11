const ax = require('axios');
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { userService } from '@/services';

import router from '../router'
import store from '../store'


/**
 * axios instantiation and default headers
 * Request/Response interceptor configuration
 */

const instance = ax.create({
  baseURL: `${process.env.VUE_APP_ROOT_API}`
});

// Set default axios headers
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.withCredentials = true;

// Set Request interceptors
// instance.interceptors.request.use(function (config) {
//   let access_token = JSON.parse(localStorage.getItem('access_token'));
//   if (access_token != null) {
//     config.headers.Authorization = 'Bearer ' + access_token;
//   }
//   return config;
// });

// Set Response interceptors
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const error_code = error.response.status;
    const route_name = router.currentRoute.name;

    if (route_name != 'Login') {
      if (error_code == 401) {
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
// const refreshAuthLogic = failedRequest => axios.get(`${process.env.VUE_APP_ROOT_API}/users/refresh`).then(response => {
//     localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
//     failedRequest.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
//     return Promise.resolve();
// });

// Instantiate the interceptor (you can chain it as it returns the axios instance)
// createAuthRefreshInterceptor(instance, refreshAuthLogic);

export const axios = instance
