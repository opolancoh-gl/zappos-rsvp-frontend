import axios from 'axios';
import { singular } from 'pluralize';
import { titleCase } from '@/utils/text-utils';

// Two Seconds to verify the code.
const VERIFICATION_DELAY = 2000;

const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;

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
    if (this.lastSessionCheck && now - this.lastSessionCheck < VERIFICATION_DELAY) {
      return this.lastSessionValue;
    }
    const sessionChecker = new Promise((resolve, reject) => {
      this.lastSessionCheck = new Date();
      const tokn = window.localStorage.getItem('tkn');
      this.http.defaults.headers.common.Authorization = tokn;
      this.http
        .head('/auth/verify')
        .then((resp) => {
          if (resp.status !== STATUS_OK) {
            window.localStorage.setItem('tkn', null);
            resolve(resp.status === STATUS_OK);
          }
          resolve(resp.status === STATUS_OK);
        })
        .catch((err) => {
          window.localStorage.setItem('tkn', null);
          if (err.response && err.response.status === STATUS_UNAUTHORIZED) {
            resolve(false);
          } else {
            reject(err);
          }
        });
    });
    this.lastSessionValue = sessionChecker;
    return sessionChecker;
  }

  async get(resource, params) {
    const resp = await this.http.get(resource, { params });
    if (resp.status === STATUS_OK) {
      return resp.data.data;
    }
    return [];
  }

  async post(resource, body) {
    const resp = await this.http.post(resource, body);
    return resp;
  }

  async put(resource, body, field = 'id') {
    const resp = await this.http.put(`${resource}/${body[field]}`, body);
    return resp;
  }

  async delete(resource, body, field = 'id') {
    const resp = await this.http.delete(`${resource}/${body[field]}`, body);
    return resp;
  }

  me() {
    return this.get('/auth/me');
  }

  /**
   * @returns {DataProvider} data provider instance.
   */
  static getInstance() {
    if (!DataProvider.instance || window.$app.renew) {
      DataProvider.instance = new DataProvider();
      window.$app.api = DataProvider.instance;
    }
    return DataProvider.instance;
  }
}

export function baseCrudGenerator(dataActionsContainer) {
  const RESOURCE_NAME = dataActionsContainer.resource;
  const S_RESOURCE_NAME = singular(RESOURCE_NAME);
  const T_RESOURCE_NAME = titleCase(RESOURCE_NAME);
  const T_S_RESOURCE_NAME = titleCase(S_RESOURCE_NAME);
  const baseCrud = {
    [`get${T_S_RESOURCE_NAME}`]: function getOne(id, query) {
      return this.get(`${RESOURCE_NAME}/${id}`, query);
    },

    [`get${T_S_RESOURCE_NAME}ById`]: function getById(id, query) {
      return this.get(`${RESOURCE_NAME}/${id}`, query);
    },

    [`get${T_RESOURCE_NAME}`]: function getMany(query) {
      return this.get(RESOURCE_NAME, query);
    },

    [`create${T_S_RESOURCE_NAME}`]: function create(item) {
      return this.post(RESOURCE_NAME, item);
    },

    [`update${T_S_RESOURCE_NAME}`]: function update(item) {
      return this.put(RESOURCE_NAME, item);
    },

    [`delete${T_S_RESOURCE_NAME}`]: function remove(item) {
      return this.delete(RESOURCE_NAME, item);
    },
  };
  return {
    ...baseCrud,
    ...dataActionsContainer,
  };
}
