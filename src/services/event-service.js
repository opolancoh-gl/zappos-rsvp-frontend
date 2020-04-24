import http from './http-service';

const resourceName = 'events';

export default {
  get() {
    return http.get(`/${resourceName}`);
  },
  getById(id) {
    return http.get(`/${resourceName}/${id}?metadata=__details`);
  },
  create(item) {
    return http.post(`/${resourceName}`, item);
  },
  update(item) {
    return http.put(`/${resourceName}/${item.id}?metadata=__details`, item);
  },
  remove(id) {
    return http.delete(`/${resourceName}/${id}?metadata=__details`, id);
  },
  getUsers(id) {
    return http.get(`/${resourceName}/${id}/users`);
  },
  getRemainingUsers(id) {
    return http.get(`/${resourceName}/${id}/remaining-users`);
  },
  getUser(id, userId) {
    return http.get(`/${resourceName}/${id}/users/${userId}`);
  },
  createUser(id, item) {
    return http.post(`/${resourceName}/${id}/users/new`, item);
  },
};
