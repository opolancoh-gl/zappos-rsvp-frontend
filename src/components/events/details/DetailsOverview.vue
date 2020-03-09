<template>
  <div>
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between">
        <div class="align-self-center">Event Details</div>
        <div>
          <a class="btn btn-sm btn-primary" href="/events/1/edit">
            <i class="far fa-edit mr-1"></i>
            <!-- <i class="far fa-edit mr-1"></i> -->
            Edit
          </a>
          <a
            class="btn btn-primary btn-sm ml-2"
            target="_blank"
            href="http://localhost:3000/opt/eKxLUg"
            >View Opt-In Page</a
          >
        </div>
      </div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col"><strong class="d-block">Start Time</strong>02/25/20 at 2:00pm</div>
          <div class="col"><strong class="d-block">End Time</strong>02/27/20 at 2:50pm</div>
          <div class="col"><strong class="d-block">Location:</strong>San Francisco</div>
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
export default {
  name: 'EventDetailsOverview',
  data() {
    return {};
  },
  components: {},
  mounted() {
    /* axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response)); */
  },
};
</script>

<style scoped></style>
