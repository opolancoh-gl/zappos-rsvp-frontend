const RESOURCE_NAME = 'attendees';

export default {
  resource: RESOURCE_NAME,
  sendInvite(attendee, event) {
    return this.post('invites', {
      attendee_id: attendee.id,
      event_id: event.id,
    });
  },
};
