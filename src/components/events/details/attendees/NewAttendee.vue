<template>
  <div class="row">
    <div class="col-8 mx-auto">
      <div class="card">
        <div class="card-header">New Attendee</div>
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
                    :class="{ 'is-invalid': $v.newAttendee.name.$error }"
                    type="text"
                    v-model="newAttendee.name"
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
                    v-model="newAttendee.email"
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
                    v-model="newAttendee.phone"
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
                    v-model="newAttendee.organizationId"
                    name="attendee[person_attributes][organizationId]"
                    id="organizationId"
                    ><option
                      value=""
                      selected
                      disabled
                    ></option>
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
                    v-model="newAttendee.organization_name"
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
                    v-model="newAttendee.organizationId"
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
                v-model="newAttendee.status"
                name="attendee[status]"
                id="attendee_status">
                <option
                  selected="selected"
                  disabled
                  value="invite_not_sent">Select a status</option>
                <option
                  v-for="(text, property) in invitationStatusValues" :key="property"
                  :value="property">
                  {{ text }}
                </option>
              </select>
            </div>
            <input
              type="submit"
              name="commit"
              value="Create Attendee"
              class="btn btn-primary btn-lg"
              data-disable-with="Create Attendee"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'NewAttendee',
  data() {
    return {
      newAttendee: {},
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
    newAttendee: {
      name: {
        required,
        minLength: minLength(4)
      },
    },
  },
  async mounted() {
    try {
      await this.fetchEvent(this.$route.params.id);
      this.fetchOrganiaztions();
      this.updateCurrentUser();
    } catch (error) {
      console.log('[Exception-EventDetails]', error);
    }
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
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveAttendee();
      }
      // */
    },
    async saveAttendee() {
      try {
        if (!this.newAttendee.organizationId) {
          const org = await this.createOrganization({
            name: this.newAttendee.organization_name,
            accountId: this.event.accountId,
          });
          this.newAttendee.organizationId = org.id;
        }
        this.newAttendee.added_by = this.currentUser.id;
        await this.createAttendee(this.newAttendee);
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions({
      fetchEvent: 'event/fetchItem',
      fetchOrganiaztions: 'organization/getItemsFromAPI',
      createOrganization: 'organization/createItem',
      createAttendee: 'attendee/createItem',
      updateCurrentUser: 'me',
    }),
  },
};
</script>
