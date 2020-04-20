<template>
  <div>
    <div class="container my-4">
      <div class="card">
        <div class="card-header">New Event</div>
        <div class="card-body">
          <form
            class="simple_form new_event"
            novalidate
            @submit.prevent="onSubmit"
          >
            <div
              class="form-group string required event_name"
            >
              <label
                class="form-control-label string required"
                for="event_name"
                >Event Name
                <abbr title="required">*</abbr></label
              ><input
                class="form-control string required"
                type="text"
                name="name"
                v-model="event.name"
                id="event_name"
              />
            </div>
            <div
              class="form-group email optional event_contact_email"
            >
              <label
                class="form-control-label email optional"
                for="event_contact_email"
                >Contact Email</label
              ><input
                class="form-control string email optional"
                type="email"
                mane="email"
                v-model="event.email"
                id="event_contact_email"
              /><small class="form-text text-muted"
                >This will appear in places like the opt-in
                page, invite messages, RSVP pages,
                etc.</small
              >
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="form-group datetime required event_start_time"
                >
                  <label
                    class="form-control-label datetime required"
                    for="event_start_time"
                    >Start Time
                    <abbr title="required">*</abbr></label
                  >
                  <div
                    class="d-flex flex-row justify-content-between align-items-center"
                  >
                    <input
                      class="form-control mx-1 datetime required"
                      type="datetime-local"
                      name="event[start_time]"
                      v-model="event.startTime"
                      id="event_start_time"
                    />
                  </div>
                </div>
              </div>
              <div class="col">
                <div
                  class="form-group datetime required event_end_time"
                >
                  <label
                    class="form-control-label datetime required"
                    for="event_end_time"
                    >End Time
                    <abbr title="required">*</abbr></label
                  >
                  <div
                    class="d-flex flex-row justify-content-between align-items-center"
                  >
                    <input
                      class="form-control mx-1 datetime required"
                      type="datetime-local"
                      name="event[end_time]"
                      v-model="event.endTime"
                      id="event_end_time"
                    />
                  </div>
                </div>
              </div>
              <div class="col">
                <div
                  class="form-group string required event_location"
                >
                  <label
                    class="form-control-label string required"
                    for="event_location"
                    >Location
                    <abbr title="required">*</abbr></label
                  ><input
                    class="form-control string required"
                    type="text"
                    v-model="event.location"
                    id="event_location"
                  />
                </div>
              </div>
            </div>
            <label>Event Image</label>
            <div class="dz-message"></div>
            <div class="fallback">
              <input
                type="file"
                id="event_image"
              />
            </div>
            <div class="mt-4">
              <fieldset
                class="form-group boolean optional event_opt_in_config"
              >
                <div class="form-check">
                  <input
                    class="form-check-input boolean optional"
                    type="checkbox"
                    v-model="event.closeOptInPage"
                    id="event_opt_in_config"
                  />
                  <label
                    class="form-check-label boolean optional"
                    for="event_opt_in_config"
                    >Close Opt In Page</label
                  >
                </div>
              </fieldset>
            </div>
            <div class="mt-5 mb-3">
              <h5>Advanced Options</h5>
              <div class="card card-body bg-light">
                <div class="row">
                  <div class="col">
                    <div
                      class="form-group select required event_account"
                    >
                      <label
                        class="form-control-label select required"
                        for="event_account_id"
                        >Account
                        <abbr title="required"
                          >*</abbr
                        ></label
                      ><select
                        class="form-control select required"
                        id="event_account_id"
                        ><option value="1"
                          >Kuhn Inc</option
                        ></select
                      >
                    </div>
                  </div>
                  <div class="col">
                    <div
                      class="form-group integer optional event_attendee_limit form-group-valid"
                    >
                      <label
                        class="form-control-label integer optional"
                        for="event_attendee_limit"
                        >Event-Wide Attendee Limit</label
                      ><input
                        class="form-control is-valid numeric integer optional"
                        type="number"
                        v-model="event.attendeeLimit"
                        step="1"
                        value="1000"
                        id="event_attendee_limit"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div
                      class="form-group string optional disabled event_api_key"
                    >
                      <label
                        class="form-control-label string optional disabled"
                        for="event_api_key"
                        >Event API Key</label
                      ><input
                        class="form-control string optional disabled"
                        disabled="disabled"
                        type="text"
                        v-model="event.eventAPIKey"
                        id="event_api_key"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div
                      class="form-group string optional event_phototap_api_key"
                    >
                      <label
                        class="form-control-label string optional"
                        for="event_phototap_api_key"
                        >PhotoTap API Key</label
                      ><input
                        class="form-control string optional"
                        v-model="event.photoAPIKey"
                        type="text"
                        id="event_phototap_api_key"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-primary">
              {{ confirmButtonName }}
            </button>
            <router-link
              class="btn"
              :to="{ name: 'EventList' }"
              >Cancel</router-link
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./event-create-update.js"></script>
