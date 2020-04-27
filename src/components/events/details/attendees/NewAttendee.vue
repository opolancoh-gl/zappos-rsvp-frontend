<template>
  <div class="row">
    <div
      :class="{
        'col-12': isEditing,
        'col-8': !isEditing,
        'mx-auto': !isEditing,
      }"
    >
      <div class="card">
        <div class="card-header" v-if="!isEditing">
          New Attendee
        </div>
        <div class="card-header" v-if="isEditing">
          Edit {{ attendeeName }}
        </div>
        <div class="card-body">
          <form
            class="simple_form new_attendee"
            id="new_attendee"
            novalidate="novalidate"
            accept-charset="UTF-8"
            @submit.prevent="onSubmit"
          >
            <div class="row">
              <div class="col">
                <div
                  class="form-group string required attendee_person_name"
                >
                  <label
                    class="form-control-label string required"
                    for="attendee_person_attributes_name"
                    >Name
                    <abbr title="required">*</abbr></label
                  ><input
                    class="form-control string required"
                    :class="{
                      'is-invalid':
                        $v.currentAttendee.name.$error,
                    }"
                    type="text"
                    v-model="currentAttendee.name"
                    name="attendee[person_attributes][name]"
                    id="attendee_person_attributes_name"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="form-group email optional attendee_person_email_address"
                >
                  <label
                    class="form-control-label email optional"
                    for="attendee_person_attributes_email_address"
                    >Email address</label
                  ><input
                    class="form-control string email optional"
                    type="email"
                    :class="{
                      'is-invalid':
                        $v.currentAttendee.email.$error,
                    }"
                    v-model="currentAttendee.email"
                    name="attendee[person_attributes][email_address]"
                    id="attendee_person_attributes_email_address"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="form-group tel optional attendee_person_phone_number"
                >
                  <label
                    class="form-control-label tel optional"
                    for="attendee_person_attributes_phone_number"
                    >Phone number</label
                  ><input
                    class="form-control string tel optional"
                    type="tel"
                    v-model="currentAttendee.phone"
                    name="attendee[person_attributes][phone_number]"
                    id="attendee_person_attributes_phone_number"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="form-group select optional attendee_person_organization"
                >
                  <label
                    class="form-control-label select optional"
                    for="organizationId"
                    >Brand</label
                  ><select
                    class="form-control select optional"
                    v-model="currentAttendee.organizationId"
                    name="attendee[person_attributes][organizationId]"
                    id="organizationId"
                    ><option
                      value=""
                      selected
                      :disabled="!isEditing"
                    > {{ isEditing ? 'Create a new brand':'' }} </option>
                    <option
                      v-for="org in organizations"
                      :key="org.id"
                      :value="org.id"
                      >{{ org.name }}</option
                    >
                  </select>
                </div>
              </div>
              <div class="col">
                <div
                  class="form-group string optional attendee_person_organization_name"
                >
                  <label
                    class="form-control-label string optional"
                    for="attendee_person_attributes_organization_attributes_name"
                    >Or Add New Brand</label
                  ><input
                    class="form-control string optional"
                    type="text"
                    :disabled="!!currentAttendee.organizationId"
                    v-model="
                      currentAttendee.organization_name
                    "
                    name="attendee[person_attributes][organization_attributes][name]"
                    id="attendee_person_attributes_organization_attributes_name"
                  />
                </div>
                <div
                  class="form-group hidden attendee_person_organization_account_id"
                >
                  <input
                    class="form-control hidden"
                    value="1"
                    type="hidden"
                    v-model="currentAttendee.organizationId"
                    name="attendee[person_attributes][organization_attributes][account_id]"
                    id="attendee_person_attributes_organization_attributes_account_id"
                  />
                </div>
              </div>
            </div>
            <div
              class="form-group select optional attendee_status form-group-valid"
            >
              <label
                class="form-control-label select optional"
                for="attendee_status"
                >Status</label
              ><select
                class="form-control select optional"
                v-model="currentAttendee.status"
                name="attendee[status]"
                id="attendee_status"
              >
                <option
                  selected="selected"
                  disabled
                  value="invite_not_sent"
                  >Select a status</option
                >
                <option
                  v-for="(text,
                  property) in invitationStatusValues"
                  :key="property"
                  :value="property"
                >
                  {{ text }}
                </option>
              </select>
            </div>
            <input
              v-if="!isEditing"
              type="submit"
              name="commit"
              value="Create Attendee"
              class="btn btn-primary btn-lg"
              data-disable-with="Create Attendee"
            />
            <input
              v-if="isEditing"
              type="submit"
              name="commit"
              value="Update Attendee"
              class="btn btn-primary btn-lg"
              data-disable-with="Update Attendee"
            />
          </form>
        </div>
      </div>
      <div class="card mt-4" v-if="isEditing">
        <div class="card-header">Edit Guests</div>
        <div class="card-body">
          <form
            class="simple_form new_opt_in"
            id="new_opt_in"
            novalidate="novalidate"
            accept-charset="UTF-8"
            method="post"
            @submit.prevent="updateGuests"
          >
            <div class="row">
              <div class="col-6">
                <div
                  class="form-group string optional opt_in_guest_first_name"
                >
                  <label
                    class="form-control-label string optional"
                    for="opt_in_guest_first_name"
                    >Guest First Name</label
                  ><input
                    class="form-control string optional"
                    type="text"
                    name="opt_in[guest_first_name]"
                    v-model="attendeeGuestInfo.firstName"
                    id="opt_in_guest_first_name"
                  />
                </div>
              </div>
              <div class="col-6">
                <div
                  class="form-group string optional opt_in_guest_last_name"
                >
                  <label
                    class="form-control-label string optional"
                    for="opt_in_guest_last_name"
                    >Guest Last Name</label
                  ><input
                    class="form-control string optional"
                    type="text"
                    name="opt_in[guest_last_name]"
                    v-model="attendeeGuestInfo.lastName"
                    id="opt_in_guest_last_name"
                  />
                </div>
              </div>
            </div>
            <fieldset
              class="form-group boolean optional opt_in_remove_guest"
            >
              <div class="form-check">
                <input
                  class="form-check-input boolean optional"
                  type="checkbox"
                  value="1"
                  name="opt_in[remove_guest]"
                  id="opt_in_remove_guest"
                  v-model="attendeeGuestInfo.noGuest"
                /><label
                  class="form-check-label boolean optional"
                  for="opt_in_remove_guest"
                  >I will not be inviting a guest</label
                >
              </div>
            </fieldset>
            <input
              type="submit"
              name="commit"
              value="Update Guests"
              class="btn btn-primary btn btn-primary"
              data-disable-with="Update Guests"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  email,
} from 'vuelidate/lib/validators';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'NewAttendee',
  data() {
    return {
      isEditing: false,
      currentAttendee: {},
      attendeeGuestInfo: {},
      attendeeName: '',
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
  validations: {
    currentAttendee: {
      name: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
    },
  },
  created() {
    this.loadData();
  },
  computed: {
    ...mapGetters({
      organizations: 'organization/getOrganizations',
    }),
    ...mapState({
      event: ({ event }) => event.currentItem,
      currentUser: (state) => state.me,
    }),
  },
  methods: {
    async loadData() {
      this.isEditing = this.$route.params.isEditing;
      try {
        await this.fetchEvent(this.$route.params.id);
        this.fetchOrganiaztions();
        this.updateCurrentUser();
        if (this.isEditing) {
          this.currentAttendee = await this.fetchAttendee(this.$route.params.attendeeID);
          this.attendeeName = this.currentAttendee.name;
        }
      } catch (error) {
        console.log('[Exception-EventDetails]', error);
      }
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (!this.isEditing) {
          this.saveAttendee().then(() => {
            this.$router.push({ name: 'EventAttendees' });
          });
        } else {
          this.modifyAttendee().then(() => {
            this.$router.push({ name: 'EventAttendees' });
          });
        }
      }
      // */
    },
    async updateGuests(){
      if (this.attendeeGuestInfo.noGuest) {
        // REMOVE ATTENDEE GUESTS
      }
      // SAVE GUESTS INFO
    },
    async prepareAttendeeInfo() {
      if (!this.currentAttendee.organizationId) {
        const org = await this.createOrganization({
          name: this.currentAttendee.organization_name,
          accountId: this.event.accountId,
        });
        this.currentAttendee.organizationId = org.id;
      }
      this.currentAttendee.added_by = this.currentUser.id;
      this.currentAttendee.event_id = this.event.id;
    },
    async saveAttendee() {
      try {
        await this.prepareAttendeeInfo();
        await this.createAttendee(this.currentAttendee);
      } catch (error) {
        console.log(error);
      }
    },
    async modifyAttendee() {
      try {
        await this.prepareAttendeeInfo();
        await this.updateAttendee(this.currentAttendee);
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions({
      fetchEvent: 'event/fetchItem',
      fetchAttendee: 'attendee/getItemFromAPI',
      fetchOrganiaztions: 'organization/getItemsFromAPI',
      createOrganization: 'organization/createItem',
      createAttendee: 'attendee/createItem',
      updateAttendee: 'attendee/updateItem',
      updateCurrentUser: 'me',
    }),
  },
};
</script>
