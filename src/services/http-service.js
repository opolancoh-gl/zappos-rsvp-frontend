import axios from 'axios';

const http = axios.create({
  baseURL: window.$app.getApiURL(),
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to set the Authorization Token
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tkn');
    if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// [_review_] Create the functionality exposed below
// Add a response interceptor to handle :
// 403
// 401
// refresh token
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // 403 Forbidden
    if (error.response.status === 403) {
      /* Do something */
      // force logout
    }
    // 401 Unauthorized
    if (error.response.status === 401) {
      /* Do something */
    }

    // Handle refresh token
    try {
      const isRefreshTokenExpired = false; // refreshToken.exp < Date.now() ...

      if (isRefreshTokenExpired) {
        /* Do something */
        // force logout
        // return forceLogout();
      }
    } catch (e) {
      /* Do something */
      // force logout
      // return forceLogout();
    }

    Promise.reject(error);
  },
);

export default http;
