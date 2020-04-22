<template>
  <div>
    <div class="card-group">
      <div class="card mb-4 bg-success text-white">
        <div class="card-body text-center">
          <h4 class="mb-0 d-block">0</h4>
          <div class="d-block">Yes</div>
        </div>
      </div>
      <div class="card mb-4 bg-danger text-white">
        <div class="card-body text-center">
          <h4 class="mb-0 d-block">0</h4>
          <div class="d-block">No</div>
        </div>
      </div>
      <div class="card mb-4 bg-warning text-white">
        <div class="card-body text-center">
          <h4 class="mb-0 d-block">0</h4>
          <div class="d-block">Snooze</div>
        </div>
      </div>
      <div class="card mb-4 bg-secondary text-white">
        <div class="card-body text-center">
          <h4 class="mb-0 d-block">0</h4>
          <div class="d-block">No Response</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header d-flex">
            <div class="align-self-center flex-grow-1">
              Attendees
            </div>
            <router-link
              class="btn btn-sm btn-primary mr-2"
              :to="{ name: 'NewAttendee' }"
            >
              <i class="fas fa-plus mr-2"></i> Add
            </router-link>
            <a
              class="btn btn-sm btn-primary"
              href="/events/1/attendees.xlsx"
            >
              <i class="fas fa-file-download mr-2"></i>
              <!-- <i class="far fa-file-download mr-2"></i> -->Download</a
            >
          </div>
          <div class="list-group list-group-flush">
            <div
              class="list-group-item"
              v-for="attendee in attendees"
              :key="attendee.id"
            >
              <div class="row">
                <div class="col-3 align-self-center">
                  <div class="media">
                    <div
                      class="fa-fw ml-2 mr-4 fa-2x align-self-center"
                    >
                      <i
                        class="fas fa-user-circle"
                        :class="[getPersonStatus(attendee)]"
                      ></i>
                    </div>
                    <div
                      class="media-body align-self-center"
                    >
                      <router-link
                        :to="{
                          name: 'ViewAttendee',
                          id: attendee.id,
                        }"
                        :data-link="
                          `/viewattendee/${attendee.organization.id}`
                        "
                      >
                        {{ attendee.name }}
                      </router-link>
                      <small class="d-block">
                        <router-link
                          :to="{
                            name: 'Organisations',
                            id: attendee.organization.id,
                          }"
                          :data-link="
                            `/organisations/${attendee.organization.id}`
                          "
                        >
                          {{ attendee.organization.name }}
                        </router-link>
                      </small>
                    </div>
                  </div>
                </div>
                <div class="col align-self-center"></div>
                <div class="col-1 align-self-center">
                  <div class="fa-2x text-muted">
                    <i class="fas fa-sms"></i>
                  </div>
                </div>
                <div class="col align-self-center">
                  <small class="d-block"
                    >Invite Status</small
                  >
                  {{
                    invitationStatusValues[attendee.status]
                  }}
                  ,
                  {{
                    attendee.response || 'No Response Yet'
                  }}
                </div>
                <div
                  class="col align-self-center text-right"
                >
                  <div class="btn-group">
                    <a
                      class="btn btn-sm btn-outline-primary"
                      href="#"
                      @click.prevent="sendInvite(attendee)"
                    >
                      <i
                        class="far fa-share-square mr-2"
                      ></i>
                      Send Invite
                    </a>
                    <a
                      class="btn btn-sm btn-outline-primary"
                      href="#"
                      @click.prevent="
                        askDeleteAttendee(attendee)
                      "
                    >
                      <i class="fas fa-times"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card mb-4">
          <div class="card-header">
            Import List from Excel
          </div>
          <div class="card-body">
            <form
              class="simple_form new_attendee_import"
              id="new_attendee_import"
            >
              <div
                class="form-group file optional attendee_import_upload form-group-valid"
              >
                <input
                  class="form-control-file is-valid file optional"
                  type="file"
                  id="attendee_import_upload"
                />
              </div>
              <input
                type="submit"
                value="Save"
                class="btn btn-primary btn-block"
                data-confirm="Are you sure?"
                data-disable-with="Save"
              />
            </form>
          </div>
        </div>
        <AttendeeSearchFilter />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';

import AttendeeSearchFilter from './attendees/AttendeeSearchFilter.vue';

export default {
  data() {
    return {
      invitationStatusValues: {
        invite_not_sent: 'Invite Not Sent',
        invite_sent: 'Invite Sent',
        confirmed: 'Confirmed',
        denied: 'Denied',
        snoozed: 'Snoozed',
        unknown_response: 'Unknown Response',
        stopped: 'Stopped',
        attended: 'Attended',
      },
    };
  },
  components: {
    AttendeeSearchFilter,
  },
  computed: {
    ...mapState({
      attendees: ({ attendee }) => attendee.items,
      currentEvent: ({ event }) => event.currentItem,
    }),
  },
  mounted() {
    /* axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response)); */
    this.fetchAttendees();
  },
  methods: {
    getPersonStatus(attendee) {
      let res = 'person-complete';
      switch (attendee.status) {
        case 'invite_not_sent':
          res = 'person-incomplete';
          break;
        default:
          break;
      }
      return res;
    },
    async askDeleteAttendee(attendee) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0062cc',
        cancelButtonColor: '#b2b3b3',
        confirmButtonText: 'Yes, delete it!',
      });
      if (result.value) {
        console.log('yes');
        await this.deleteAttendee(attendee);
        await this.fetchAttendees();
        Swal.fire(
          'Deleted!',
          'The element has been deleted.',
          'success',
        );
      }
    },
    async sendInvite(attendee) {
      const result = await Swal.fire({
        title: `Send Invite to ${attendee.name} for ${this.currentEvent.name}`,
        text:
          'Are you sure? This will actually send a text message!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0062cc',
        cancelButtonColor: '#b2b3b3',
        confirmButtonText: 'Yes, send it!',
      });
      if (result.value) {
        console.log('yes');
        await this.deleteAttendee(attendee);
        await this.fetchAttendees();
        Swal.fire(
          'Deleted!',
          'The element has been deleted.',
          'success',
        );
      }
    },
    ...mapActions({
      fetchAttendees: 'attendee/getItemsFromAPI',
      deleteAttendee: 'attendee/deleteItem',
    }),
  },
};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';

.person-complete {
  color: $secondary;
}

.person-incomplete {
  color: $warning;
}

.person-missing-phone {
  color: $danger;
}

.text-muted {
  color: $text-muted;
}
</style>
