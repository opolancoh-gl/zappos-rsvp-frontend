import http from './http-api-service';

const resourceName = 'events';

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
  remove(id) {
    return http.delete(`/${resourceName}/${id}`, id);
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
  getMessage(id) {
    return http.get(`/${resourceName}/${id}/message-center`);
  },
  updateMessage(id, item) {
    return http.put(`/${resourceName}/${id}/message-center`, item);
  },
};
