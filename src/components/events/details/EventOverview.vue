<template>
  <div>
    <div v-if="actionMessage" class="alert alert-success ">{{ actionMessage }}</div>
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between">
        <div class="align-self-center">Event Details</div>
        <div>
          <router-link
            v-if="item.id"
            class="btn btn-sm btn-primary"
            :to="{ name: 'EventUpdate', params: { id: item.id } }"
          >
            <i class="far fa-edit mr-1"></i>
            Edit
          </router-link>
          <router-link
            class="btn btn-primary btn-sm ml-2"
            target="_blank"
            to="http://localhost:3000/opt/eKxLUg"
            >View Opt-In Page</router-link
          >
        </div>
      </div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col">
            <strong class="d-block">Start Time</strong>{{ item.startTime | datetimeAtShort }}
          </div>
          <div class="col">
            <strong class="d-block">End Time</strong>{{ item.endTime | datetimeAtShort }}
          </div>
          <div class="col"><strong class="d-block">Location:</strong>{{ item.location }}</div>
        </div>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-header text-center">Total Potential Attendees</div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">PRIMARY ATTENDEES</small>
          </div>
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">GUESTS</small>
          </div>
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">TOTAL ATTENDEES</small>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-header text-center">Invites Sent to Primary Attendees</div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">INVITES SENT</small>
          </div>
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">FAILED</small>
          </div>
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">OPTED IN</small>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-header text-center">RSVP Method</div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">TEXT</small>
          </div>
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">EMAIL</small>
          </div>
        </div>
      </div>
    </div>
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
    <div class="card mb-4">
      <div class="card-header text-center">Tickets Sent</div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">TEXT</small>
          </div>
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">EMAIL</small>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-header text-center">Attendees Checked-In</div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col">
            <h4 class="mb-0 d-block">0</h4>
            <small class="d-block">TOTAL</small>
          </div>
          <div class="col">
            <h4 class="mb-0 d-block">NaN%</h4>
            <small class="d-block">PERCENT</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'EventOverview',
  props: {
    actionMessage: { type: String },
  },
  created() {
    console.log('EventOverview created');
  },
  mounted() {
    console.log('EventOverview mounted');
    (async () => {
      try {
        // [_review_] // Define what to do id is invalid or not exists
        this.fetchItem(this.$route.params.id);
      } catch (error) {
        console.log('[Exception-EventDetails]', error);
      }
    })();
  },
  computed: {
    ...mapState('event', {
      item: (state) => state.currentItem,
    }),
  },
  methods: {
    ...mapActions({ fetchItem: 'event/fetchItem' }),
  },
};
</script>
