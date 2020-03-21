<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="align-self-center">Event Users</div>
          <a class="btn btn-sm btn-primary" href="/events/1/users/new">
            <i class="fas fa-plus mr-2"></i>
            <!-- <i class="far fa-plus mr-2"></i> -->
            Add
          </a>
        </div>
        <div class="list-group list-group-flush">
          <div class="list-group-item">
            <div class="row">
              <div class="col-2 align-self-center">
                <a href="/events/1/users/1">Adam Admin</a>
              </div>
              <div class="col align-self-center text-center">
                <i class="fas fa-check text-success"></i>
                <!-- <i class="far fa-check text-success"></i> -->
                <small class="ml-2">View Event</small>
              </div>
              <div class="col align-self-center text-center">
                <i class="fas fa-check text-success"></i>
                <!-- <i class="far fa-check text-success"></i> -->
                <small class="ml-2">Own Attendees</small>
              </div>
              <div class="col align-self-center text-center">
                <i class="fas fa-check text-success"></i>
                <!-- <i class="far fa-check text-success"></i> -->
                <small class="ml-2">Other Attendees</small>
              </div>
              <div class="col align-self-center text-center">
                <i class="fas fa-check text-success"></i>
                <!-- <i class="far fa-check text-success"></i> -->
                <small class="ml-2">Blast Center</small>
              </div>
              <div class="col align-self-center text-center">
                <i class="fas fa-check text-success"></i>
                <!-- <i class="far fa-check text-success"></i> -->
                <small class="ml-2">Individual Invites</small>
              </div>
            </div>
          </div>
          <div class="list-group-item">
            <div class="row">
              <div class="col-2 align-self-center">
                <a href="/events/1/users/2">User 1</a>
              </div>
              <div class="col align-self-center text-center">
                <i class="fas fa-check text-success"></i>
                <!-- <i class="far fa-check text-success"></i> -->
                <small class="ml-2">View Event</small>
              </div>
              <div class="col align-self-center text-center"></div>
              <div class="col align-self-center text-center"></div>
              <div class="col align-self-center text-center"></div>
              <div class="col align-self-center text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="card">
        <div class="card-header">Import List from Excel</div>
        <div class="card-body">
          <form
            class="simple_form new_event_user_import"
            id="new_event_user_import"
            novalidate="novalidate"
            enctype="multipart/form-data"
            action="/events/1/users/imports"
            accept-charset="UTF-8"
            method="post"
          >
            <div class="form-group file optional event_user_import_upload form-group-valid">
              <input
                class="form-control-file is-valid file optional"
                type="file"
                name="event_user_import[upload]"
                id="event_user_import_upload"
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
    </div>
  </div>
</template>

<script>
export default {

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
