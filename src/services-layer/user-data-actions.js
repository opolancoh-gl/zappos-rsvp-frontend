const RESOURCE_NAME = 'users';
export default {
  getUsers(query) {
    return this.get(RESOURCE_NAME, query);
  },

  createUser(item) {
    return this.post(RESOURCE_NAME, item);
  },

  updateUser(item) {
    return this.put(RESOURCE_NAME, item);
  },

  deleteUser(item) {
    return this.delete(RESOURCE_NAME, item);
  },
};
