import http from './http-service';

const resourceName = 'devices';

export default {
  get() {
    return http.get(`/${resourceName}`);
  },
  getById(id) {
    return http.get(`/${resourceName}/${id}`);
  },
  create(item) {
    return http.post(`/${resourceName}`, item);
  },
  update(item) {
    return http.put(`/${resourceName}/${item.id}`, item);
  },
};
