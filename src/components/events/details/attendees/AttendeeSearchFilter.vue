<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">
        Search &amp; Filter
      </div>
    </div>
    <div class="card-body">
      <form class="simple_form ">
        <div class="form-group string optional _search">
          <label
            class="form-control-label string optional"
            for="search"
            >Search</label
          ><input
            class="form-control string optional"
            placeholder="Name or email"
            type="text"
            id="search"
          />
        </div>
        <div class="form-group select optional _sort_by">
          <label
            class="form-control-label select optional"
            for="sort_by"
            >Sort By</label
          ><select
            class="form-control select optional"
            id="sort_by"
            ><option value="name">Name</option>
            <option value="organization"
              >Brand</option
            ></select
          >
        </div>
        <div
          class="form-group select optional _with_status"
        >
          <label
            class="form-control-label select optional"
            for="with_status"
            >Status</label
          ><select
            class="form-control select optional"
            id="with_status"
            ><option value=""></option>
            <option value="invite_not_sent"
              >Invite Not Sent</option
            >
            <option value="invite_sent">Invite Sent</option>
            <option value="confirmed">Confirmed</option>
            <option value="denied">Denied</option>
            <option value="snoozed">Snoozed</option>
            <option value="unknown_response"
              >Unknown Response</option
            >
            <option value="stopped">Stopped</option>
            <option value="attended"
              >Attended</option
            ></select
          >
        </div>
        <div class="form-group select optional _added_by">
          <label
            class="form-control-label select optional"
            for="added_by"
            >Added By</label
          ><select
            class="form-control select optional"
            id="added_by"
            ><option value=""></option>
            <option value="2">User 1</option>
            <option value="1">Adam Admin</option></select
          >
        </div>
        <div class="form-group select optional _from_list">
          <label
            class="form-control-label select optional"
            for="from_list"
            >List</label
          ><select
            class="form-control select optional"
            id="from_list"
            ><option value=""></option>
            <option value="1">Added List</option></select
          >
        </div>
        <div
          class="form-group select optional _from_organization"
        >
          <label
            class="form-control-label select optional"
            for="from_organization"
            >Brand</label
          ><select
            class="form-control select optional"
            id="from_organization"
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

      <a class="btn btn-block" href="/events/1/attendees"
        >Clear Filters</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendeeSearchFilter',
};
</script>
