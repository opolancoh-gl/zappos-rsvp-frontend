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
            <div class="align-self-center flex-grow-1">Attendees</div>
            <a class="btn btn-sm btn-primary mr-2" href="/events/1/attendees/new">
              <i class="fas fa-plus mr-2"></i>
              <!-- <i class="far fa-plus mr-2"></i> -->Add</a
            >
            <a class="btn btn-sm btn-primary" href="/events/1/attendees.xlsx">
              <i class="fas fa-file-download mr-2"></i>
              <!-- <i class="far fa-file-download mr-2"></i> -->Download</a
            >
          </div>
          <div class="list-group list-group-flush"><div class="list-group-item"></div></div>
        </div>
      </div>
      <div class="col-3">
        <div class="card mb-4">
          <div class="card-header">Import List from Excel</div>
          <div class="card-body">
            <form class="simple_form new_attendee_import" id="new_attendee_import">
              <div class="form-group file optional attendee_import_upload form-group-valid">
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
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <div class="align-self-center">Search &amp; Filter</div>
          </div>
          <div class="card-body">
            <form class="simple_form ">
              <div class="form-group string optional _search">
                <label class="form-control-label string optional" for="search">Search</label
                ><input
                  class="form-control string optional"
                  placeholder="Name or email"
                  type="text"
                  id="search"
                />
              </div>
              <div class="form-group select optional _sort_by">
                <label class="form-control-label select optional" for="sort_by">Sort By</label
                ><select class="form-control select optional" id="sort_by"
                  ><option value="name">Name</option>
                  <option value="organization">Brand</option></select
                >
              </div>
              <div class="form-group select optional _with_status">
                <label class="form-control-label select optional" for="with_status">Status</label
                ><select class="form-control select optional" id="with_status"
                  ><option value=""></option>
                  <option value="invite_not_sent">Invite Not Sent</option>
                  <option value="invite_sent">Invite Sent</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="denied">Denied</option>
                  <option value="snoozed">Snoozed</option>
                  <option value="unknown_response">Unknown Response</option>
                  <option value="stopped">Stopped</option>
                  <option value="attended">Attended</option></select
                >
              </div>
              <div class="form-group select optional _added_by">
                <label class="form-control-label select optional" for="added_by">Added By</label
                ><select class="form-control select optional" id="added_by"
                  ><option value=""></option>
                  <option value="2">User 1</option>
                  <option value="1">Adam Admin</option></select
                >
              </div>
              <div class="form-group select optional _from_list">
                <label class="form-control-label select optional" for="from_list">List</label
                ><select class="form-control select optional" id="from_list"
                  ><option value=""></option>
                  <option value="1">Added List</option></select
                >
              </div>
              <div class="form-group select optional _from_organization">
                <label class="form-control-label select optional" for="from_organization"
                  >Brand</label
                ><select class="form-control select optional" id="from_organization"
                  ><option value=""></option>
                </select>
              </div>
              <input
                type="submit"
                value="Search"
                class="btn btn-primary btn-block"
                data-disable-with="Search"
              />
            </form>

            <a class="btn btn-block" href="/events/1/attendees">Clear Filters</a>
          </div>
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
