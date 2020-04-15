import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3004',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const resourceName = 'events';

export default {
  get() {
    return apiClient.get(`/${resourceName}`);
  },
  getById(id) {
    return apiClient.get(`/${resourceName}/${id}`);
  },
  create(item) {
    return apiClient.post(`/${resourceName}`, item);
  },
  update(item) {
    return apiClient.put(`/${resourceName}`, item);
  },
  remove(id) {
    return apiClient.delete(`/${resourceName}`, id);
  },
};
