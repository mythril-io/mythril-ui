import { axios } from '../utilities';

export const homeService = {
    get
};

const rootURL = '/home/';

function get() {
  return axios.get(rootURL)
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}
