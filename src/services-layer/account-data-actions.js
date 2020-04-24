const RESOURCE_NAME = 'accounts';

export default {
  getAccounts(query) {
    return this.get(RESOURCE_NAME, query);
  },

  createAccount() {
    return this.post(RESOURCE_NAME);
  },

  updateAccount(item) {
    return this.put(RESOURCE_NAME, item);
  },

  deleteAccount(item) {
    return this.delete(RESOURCE_NAME, item);
  },
};
