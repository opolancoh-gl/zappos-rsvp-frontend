import axios from 'axios';

export class DataProvider {
  http = null;

  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:3001/api/v1/',
      withCredentials: false, // This is the default
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async get(resource, _query) {
    const resp = await this.http.get(resource);
    return resp;
  }

  async post(resource, body) {
    const resp = await this.http.post(resource, body);
    return resp;
  }

  static getInstance() {
    if (!DataProvider.instance) {
      DataProvider.instance = new DataProvider();
      window.apiAccess = DataProvider.instance;
    }
    return DataProvider.instance;
  }
}
