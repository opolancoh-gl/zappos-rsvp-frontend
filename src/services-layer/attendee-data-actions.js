const RESOURCE_NAME = 'attendees';

export default {
  getAttendees(query) {
    return this.get(RESOURCE_NAME, query);
  },

  createAttendee(item) {
    return this.post(RESOURCE_NAME, item);
  },

  updateAttendee(item) {
    return this.put(RESOURCE_NAME, item);
  },

  deleteAttendee(item) {
    return this.delete(RESOURCE_NAME, item);
  },
};
