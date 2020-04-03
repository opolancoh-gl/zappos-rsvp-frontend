import axios from 'axios';

export class DataProvider {
  http = null;

  lastSessionCheck = null;

  lastSessionValue = false;

  constructor() {
    this.http = axios.create({
      baseURL: window.$app.getApiURL(),
      withCredentials: false, // This is the default
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  login(tokn) {
    this.http.defaults.headers.common.Authorization = tokn;
  }

  verifySession() {
    const now = new Date();
    if (this.lastSessionCheck && now - this.lastSessionCheck < 1000) {
      return this.lastSessionValue;
    }
    const sessionChecker = new Promise((resolve, reject) => {
      this.lastSessionCheck = new Date();
      const tokn = window.localStorage.getItem('tkn');
      this.http.defaults.headers.common.Authorization = tokn;
      this.http
        .head('/auth/verify')
        .then((resp) => {
          if (resp.status !== 200) {
            window.localStorage.setItem('tkn', null);
            resolve(resp.status === 200);
          }
          resolve(resp.status === 200);
        })
        .catch((err) => {
          window.localStorage.setItem('tkn', null);
          if (err.response && err.response.status === 401) {
            resolve(false);
          } else {
            reject(err);
          }
        });
    });
    this.lastSessionValue = sessionChecker;
    return sessionChecker;
  }

  async getUsers() {
    const resp = await this.get('users');
    return resp;
  }

  async get(resource, _query) {
    const resp = await this.http.get(resource);
    if (resp.status === 200) {
      return resp.data.data;
    }
    return [];
  }

  async post(resource, body) {
    const resp = await this.http.post(resource, body);
    return resp;
  }

  /**
   * @returns {DataProvider} data provider instance.
   */
  static getInstance() {
    if (!DataProvider.instance || window.$app.renew) {
      DataProvider.instance = new DataProvider();
      if (window.$app.renew) {
        window.$app.api = DataProvider.instance;
      }
    }
    return DataProvider.instance;
  }
}
