import { axios } from '../utilities';

export const adminService = {
    getDashboard,
};

const rootURL = '/admin/';

function getDashboard() {
  return axios.get(rootURL + 'dashboard')
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}