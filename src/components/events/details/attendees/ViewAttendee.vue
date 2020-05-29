<template>
  <div class="container my-4">
    <div class="card">
      <div
        class="card-header d-flex justify-content-between"
      >
        <div class="align-self-center"> {{ attendee.name }} </div>
        <router-link :to="{
          name: 'EditAttendee',
          params: {
            attendeeID: attendee.id,
            isEditing: true,
          },
        }"><i class="fas fa-edit mr-2"></i>Edit</a></router-link>
      </div>
      <div class="card-body text-center">
        <img
          class="img-fluid"
          style="border: 1px solid grey"
          :src="attendee.qr"
        />
        <div class="mt-2 d-flex justify-content-center">
          Ticket Information
        </div>
      </div>
    </div>
    <div class="card mt-4">
      <div
        class="card-header d-flex justify-content-between"
      >
        <div class="align-self-center">Invites</div>
        <a
          class="btn btn-sm btn-primary"
          href="#"
          @click.prevent="sendEmail"
          ><i class="fas fa-plus mr-2"></i>Add</a
        >
      </div>
      <div class="list-group list-group-flush"></div>
    </div>
    <div class="card mt-4">
      <div
        class="card-header d-flex justify-content-between"
      >
        <div class="align-self-center">Status Changes</div>
      </div>
      <div class="list-group list-group-flush">
        <div class="list-group-item">
          <div class="row">
            <div class="col align-self-center">
              <div class="media">
                <i
                  class="fas fa-2x fa-clock ml-2 mr-4 text-muted align-self-center"
                ></i>
                <div class="media-body align-self-center">
                  Invite Not Sent<small class="d-block"
                    >Changed at 04/21/20 at 6:43pm</small
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-4">
      <div
        class="card-header d-flex justify-content-between"
      >
        <div class="align-self-center">Fingerprints</div>
      </div>
      <div class="list-group list-group-flush"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
  name: 'ViewAttendee',
  data() {
    return {
      attendee: {},
      attendeeID: null,
    };
  },
  computed: {
    ...mapState({
      attendees: ({ attendee }) => attendee.items,
      currentEvent: ({ event }) => event.currentItem,
    }),
  },
  mounted() {
    this.attendeeID = this.$route.params.attendeeID;
    if (this.attendees.length) {
      this.updateAttendee();
    } else {
      this.fetchAttendees().then(this.updateAttendee);
    }
  },
  methods: {
    updateAttendee() {
      const elms = this.attendees.filter((attendee) => {
        return attendee.id === this.attendeeID;
      });
      if (elms.length) {
        this.attendee = elms.pop();
      }
    },
    async sendEmail() {
      const message = this.attendee.phone
        ? 'This will actually send a text message!'
        : 'This will actually send an email!';
      const result = await Swal.fire({
        title: `Send Invite to ${this.attendee.name} for ${this.currentEvent.name}`,
        text: `Are you sure? ${message}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0062cc',
        cancelButtonColor: '#b2b3b3',
        confirmButtonText: 'Yes, send it!',
      });
      if (result.value) {
        console.log('TODO: SEND EMAIL');
        Swal.fire(
          'Sent!',
          'The invitation have been sent.',
          'success',
        );
      }
    },
    ...mapActions({
      fetchAttendees: 'attendee/getItemsFromAPI',
    }),
  },
};
</script>
