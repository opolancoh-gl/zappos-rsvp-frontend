const RESOURCE_NAME = 'organizations';

export default {
  getOrganizations(query) {
    return this.get(RESOURCE_NAME, query);
  },

  createOrganization(item) {
    return this.post(RESOURCE_NAME, item);
  },

  updateOrganization(item) {
    return this.put(RESOURCE_NAME, item);
  },

  deleteOrganization(item) {
    return this.delete(RESOURCE_NAME, item);
  },
};
