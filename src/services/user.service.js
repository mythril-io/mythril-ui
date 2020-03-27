import { axios } from '../utilities';

export const userService = {
    login,
    logout,
    register,
    verify,
    resendVerification,
    refreshToken,
    get,
    getUserFollowers,
    getUserFollowing,
    patchDetails,
    patchAvatar,
    patchBanner,
    patchPassword,
    getFollowStatus,
    follow,
    unfollow,
};

const user = JSON.parse(localStorage.getItem('user'));
const rootURL = '/users/';

function login(username, password) {
    return axios.post(rootURL + 'login', { username, password })
        .then(response => {
            if (response.data.access_token) {
                // store user details and jwt token in local storage
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
            }
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function logout() {
    // remove user access_token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
}

function register(email, username, password) {
    return axios.post(rootURL + 'register', { email, username, password })
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function verify(token) {
  const options = {
    headers: { 'Authorization': 'Bearer ' + token },
  };
  return axios.get(rootURL + 'register', options)
      .then(response => {
          if (response.data.access_token) {
              localStorage.setItem('user', JSON.stringify(response.data.user));
              localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
          }
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function resendVerification(email) {
  return axios.post(rootURL + 'refresh', { email })
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function refreshToken() {
    return axios.get(rootURL + 'refresh')
        .then(response => {
            if (response.data.access_token) {
                localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
            }
            return response;
        }).catch(function (error) {
            // handle error
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

function getUserFollowers(id) {
  return axios.get(rootURL + id + '/followers')
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function getUserFollowing(id) {
  return axios.get(rootURL + id + '/following')
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function patchDetails(about_me, location, gender, timezone, birthday) {
    const data = {
      about_me: about_me,
      location: location,
      gender: gender,
      timezone: timezone,
      birthday: birthday,
    }
    return axios.patch(rootURL + user.id + '/details', data)
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function patchAvatar(image) {
    return axios.patch(rootURL + 'avatar', { image })
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function patchBanner(image) {
    return axios.patch(rootURL + 'banner', { image })
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function patchPassword(password) {
    return axios.patch(rootURL + 'password', { password })
        .then(response => {
            return response;
        }).catch(function (error) {
            const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
            return Promise.reject(errorMessage)
        });
}

function getFollowStatus(id) {
  return axios.get(rootURL + id + '/follow-status')
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function follow(id) {
  return axios.post(rootURL + 'follow/' + id )
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}

function unfollow(id) {
  return axios.delete(rootURL + 'follow/' + id )
      .then(response => {
          return response;
      }).catch(function (error) {
          const errorMessage = (error.response.data && error.response.data.message) || error.response.statusText;
          return Promise.reject(errorMessage)
      });
}
