<template>
  <div class="card">
    <div class="card-header">{{ this.formTitle }}</div>
    <div class="card-body">
      <form @submit.prevent="submitForm" novalidate>
        <div class="alert alert-danger" v-if="$v.$error">
          Please correct the following error(s):
        </div>
        <!-- Name -->
        <div class="form-group">
          <label for="name">
            Event Name *
          </label>
          <input
            class="form-control"
            type="text"
            id="name"
            v-model="name"
            :class="{ 'is-invalid': $v.name.$error }"
          />
          <div class="invalid-feedback">
            {{ validationMessage.requiredField }}
          </div>
          <!-- v-if="$v.name.$error" -->
        </div>
        <!-- Contact Email -->
        <div class="form-group">
          <label for="contactEmail">
            Contact Email
          </label>
          <input
            class="form-control"
            type="email"
            id="contactEmail"
            v-model="contactEmail"
            :class="{ 'is-invalid': $v.contactEmail.$error }"
          />
          <div class="invalid-feedback">
            {{ validationMessage.email }}
          </div>
          <small class="form-text text-muted">
            This will appear in places like the opt-in page, invite messages, RSVP pages, etc.
          </small>
        </div>
        <!-- Start Time -->
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="startTime">Start Time *</label>
              <input
                class="form-control mx-1"
                type="datetime-local"
                id="startTime"
                v-model="startTime"
                :class="{ 'is-invalid': $v.startTime.$error }"
              />
              <div class="invalid-feedback">
                {{ validationMessage.requiredField }}
              </div>
            </div>
          </div>
          <!-- End Time -->
          <div class="col">
            <div class="form-group">
              <label for="endTime">End Time *</label>
              <input
                class="form-control mx-1"
                type="datetime-local"
                id="endTime"
                v-model="endTime"
                :class="{ 'is-invalid': $v.endTime.$error }"
              />
              <div class="invalid-feedback">
                {{ validationMessage.requiredField }}
              </div>
            </div>
          </div>
          <!-- Location -->
          <div class="col">
            <div class="form-group">
              <label for="location">Location *</label>
              <input
                class="form-control"
                type="text"
                id="location"
                v-model="location"
                :class="{ 'is-invalid': $v.location.$error }"
              />
              <div class="invalid-feedback">
                {{ validationMessage.requiredField }}
              </div>
            </div>
          </div>
        </div>
        <!-- Image -->
        <label>Event Image</label>
        <div><input type="file" /></div>
        <div class="mt-4">
          <div class="form-group">
            <div class="form-check">
              <label for="optInConfig">
                <input class="form-check-input" type="checkbox" id="optInConfig" />
                Close Opt In Page
              </label>
            </div>
          </div>
        </div>
        <div class="mt-5 mb-3">
          <h5>Advanced Options</h5>
          <div class="card card-body bg-light">
            <div class="row">
              <div class="col">
                <!-- Account -->
                <div class="form-group">
                  <label for="account"> Account * </label>
                  <select
                    class="form-control"
                    id="account"
                    v-model="account"
                    :class="{ 'is-invalid': $v.account.$error }"
                  >
                    <option value="" selected>Choose ...</option>
                  </select>
                  <div class="invalid-feedback">
                    {{ validationMessage.requiredField }}
                  </div>
                </div>
              </div>
              <!-- Attendee Limit -->
              <div class="col">
                <div class="form-group">
                  <label for="attendeeLimit">
                    Event-Wide Attendee Limit
                  </label>
                  <input
                    class="form-control"
                    type="number"
                    step="1"
                    value="1000"
                    id="attendeeLimit"
                    v-model="inputAttendeeLimit"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <!-- Event API Key -->
              <div class="col">
                <div class="form-group">
                  <label for="eventApiKey">
                    Event API Key
                  </label>
                  <input
                    class="form-control"
                    disabled="disabled"
                    type="text"
                    id="eventApiKey"
                    v-model="inputEventApiKey"
                  />
                </div>
              </div>
              <!-- PhotoTap API Key -->
              <div class="col">
                <div class="form-group">
                  <label for="phototapApiKey">
                    PhotoTap API Key
                  </label>
                  <input
                    class="form-control"
                    type="text"
                    id="phototapApiKey"
                    v-model="inputPhototapApiKey"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- actions -->
        <button type="submit" class="btn btn-primary">{{ confirmButtonText }}</button>
        <router-link class="btn" :to="{ name: 'EventList' }">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'EventCreateUpdate',
  props: {
    id: { type: [String, Number] },
  },
  data() {
    return {
      formTitle: '',
      confirmButtonText: '',
      name: 'My Event XX',
      contactEmail: '',
      startTime: '2020-04-19T12:00:00',
      endTime: '2020-04-19T18:30:00',
      location: 'XXX',
      inputOptInPage: '',
      account: '',
      inputAttendeeLimit: '',
      inputEventApiKey: '',
      inputPhototapApiKey: '',
      item: null,
    };
  },
  validations: {
    name: { required },
    contactEmail: { email },
    startTime: { required },
    endTime: { required },
    location: { required },
    account: {},
  },
  mounted() {
    if (this.isEditMode) {
      this.formTitle = 'Edit Event';
      this.confirmButtonText = 'Update';

      (async () => {
        try {
          // [_review_] Define what to do when id is invalid or not exists
          this.item = await this.fetchItem(this.id);

          this.formTitle = `Edit ${this.item.name}`;
          this.name = this.item.name;
          this.contactEmail = this.item.contactEmail;
          this.startTime = this.$options.filters.toDatetimeLocal(this.item.startTime);
          this.endTime = this.$options.filters.toDatetimeLocal(this.item.endTime);
          this.location = this.item.location;
        } catch (error) {
          console.log('[UpdateItem - mounted()] There was a problem processing your item.', error);
        }
      })();
    } else {
      this.formTitle = 'New Event';
      this.confirmButtonText = 'Create';
      // [_review_] Improve the way to set itemsTotal
      this.$store
        .dispatch('event/fetchItems')
        .then(() => {
          this.setCurrentHeader(`Total: ${this.itemsTotal}`);
        })
        .catch((error) => {
          console.log('[CreateItem - mounted()] There was a problem processing your item.', error);
        });
    }
  },
  computed: {
    isEditMode() {
      return typeof this.id !== 'undefined';
    },
    validationMessage() {
      return {
        requiredField: 'This field is required.',
        email: 'Please enter a valid email address.',
      };
    },
    ...mapState('event', {
      itemsTotal: (state) => state.itemsTotal,
      resourceName: (state) => state.resourceName,
    }),
    /* ...mapState('event', {
      events: (state) => state.items,
    }), */
  },
  methods: {
    setCurrentHeader(subtitle, title = this.resourceName) {
      this.setHeader({
        name: 'HeaderDefault',
        data: { title, subtitle },
      });
    },
    submitForm() {
      this.$v.$touch();

      // submit if valid
      if (!this.$v.$invalid) {
        if (!this.item) this.item = {};

        const startTimeParsed = new Date(this.startTime);
        const endTimeParsed = new Date(this.endTime);

        this.item.metadata = '__details';
        this.item.name = this.name;
        this.item.contactEmail = this.contactEmail;
        this.item.startTime = startTimeParsed.toISOString();
        this.item.endTime = endTimeParsed.toISOString();
        this.item.location = this.location;

        this.createOrUpdateItem(this.item);
      }
    },
    createOrUpdateItem(item) {
      const keyMessage = item.id ? 'updated' : 'added';
      this.$store
        .dispatch('event/createOrUpdateItem', item)
        .then((data) => {
          this.$router.push({
            name: 'EventDetails',
            params: { id: data.id, actionMessage: `Event successfully ${keyMessage}!` },
          });
        })
        .catch((error) => {
          console.log('[createOrUpdateItem] There was a problem processing your item.', error);
        });
    },
    ...mapActions({
      setHeader: 'setHeader',
      fetchItem: 'event/fetchItem',
      /* fetchAccounts: 'account/fetchItems', */
    }),
  },
};
</script>
