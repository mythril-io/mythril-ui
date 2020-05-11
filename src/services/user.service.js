import { axios } from '../utilities';

export const userService = {
    login,
    logout,
    register,
    resendVerification,
    forgotPassword,
    resetPassword,
    verifyEmail,
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

async function login(email, password) {
    try {
      await axios.get(`${process.env.VUE_APP_ROOT}/sanctum/csrf-cookie`)
      await axios.post(`${process.env.VUE_APP_ROOT}/login`, { email, password })
      let response = await axios.get(rootURL + 'session-user');

      localStorage.setItem('user', JSON.stringify(response.data));
      return response;
    } catch(error) {
      return Promise.reject({'message': 'Login failed'})
    }
}

async function logout() {
    try {
      await axios.get(`${process.env.VUE_APP_ROOT}/sanctum/csrf-cookie`);
      await axios.post(`${process.env.VUE_APP_ROOT}/logout`)
      localStorage.removeItem('user');
    } catch(error) {
      return Promise.reject({'message': 'Logout failed'})
    }
}

async function register(email, username, password, password_confirmation, recaptchaToken) {
    try {
      await axios.get(`${process.env.VUE_APP_ROOT}/sanctum/csrf-cookie`);
      await axios.post(`${process.env.VUE_APP_ROOT}/register`, { email, username, password, password_confirmation, recaptchaToken })
      let response = await axios.get(rootURL + 'session-user');

      localStorage.setItem('user', JSON.stringify(response.data));
      return {'data': response.data, 'message': 'Successfully registered! Please check your email for a verification link'};
    } catch(error) {
      return Promise.reject({'message': 'Registration failed', 'errors': error.response.data.errors})
    }
}

async function resendVerification() {
    try {
      await axios.get(`${process.env.VUE_APP_ROOT}/sanctum/csrf-cookie`);
      let response = await axios.post(`${process.env.VUE_APP_ROOT}/email/resend`);
      return {'message': 'Verification email has been resent!'};
    } catch(error) {
      return Promise.reject({'message': 'Unable to resend verification email'})
    }
}

async function forgotPassword(email) {
    try {
      await axios.get(`${process.env.VUE_APP_ROOT}/sanctum/csrf-cookie`);
      let response = await axios.post(`${process.env.VUE_APP_ROOT}/password/email`, { email });
      return {'message': 'We have emailed your password reset link!'};
    } catch(error) {
      return Promise.reject({'message': 'Unable to send password reset link'})
    }
}

async function resetPassword(token, email, password, password_confirmation) {
    try {
      await axios.get(`${process.env.VUE_APP_ROOT}/sanctum/csrf-cookie`);
      await axios.post(`${process.env.VUE_APP_ROOT}/password/reset`, { token, email, password, password_confirmation });
      let response = await axios.get(rootURL + 'session-user');

      localStorage.setItem('user', JSON.stringify(response.data));
      return response;
    } catch(error) {
      return Promise.reject({'message': 'Unable to reset your password'})
    }
}

async function verifyEmail(id, token, expires, signature) {
    try {
      await axios.get(`${process.env.VUE_APP_ROOT}/sanctum/csrf-cookie`);
      await axios.get(`${process.env.VUE_APP_ROOT}/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`);

      let response = await axios.get(rootURL + 'session-user');

      localStorage.setItem('user', JSON.stringify(response.data));
      return response;
    } catch(error) {
      return Promise.reject({'message': 'Unable to verify your email'})
    }
}

function get(username) {
  return axios.get(rootURL + username)
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
