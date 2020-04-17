export default {
  getAccounts() {
    return this.get('accounts');
  },

  createAccount() {
    return this.post('accounts');
  },

  updateAccount(account) {
    return this.put('accounts', account);
  },

  deleteAccount(account) {
    return this.delete('accounts', account);
  },
};
