export const auth = {
    authHeader,
    authHeaderValue,
    getAccessToken
};

const access_token = JSON.parse(localStorage.getItem('access_token'));

// Get the authorization header with jwt token
function authHeader() {
    if (access_token) {
        return { 'Authorization': 'Bearer ' + access_token };
    } else {
        return {};
    }
}

// Get the authorization header value with jwt token
function authHeaderValue() {
    if (access_token) {
        return 'Bearer ' + access_token;
    } else {
        return null;
    }
}

// Get the user JWT token
function getAccessToken() {
    if (access_token) {
        return access_token;
    } else {
        return null;
    }
}
