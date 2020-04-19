export default {
  getUsers() {
    return this.get('users');
  },

  createUser(user) {
    return this.post('users', user);
  },

  updateUser(user) {
    return this.put('users', user);
  },

  deleteUser(user) {
    return this.delete('users', user);
  },
};
