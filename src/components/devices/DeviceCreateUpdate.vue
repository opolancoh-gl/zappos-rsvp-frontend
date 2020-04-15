<template>
  <div class="card">
    <div class="card-header">{{ formTitle }}</div>
    <div class="card-body">
      <form @submit.prevent="submitForm" class="needs-validation" novalidate>
        <div class="alert alert-danger" v-if="!isValidForm">
          Please correct the following error(s):
        </div>
        <!-- device event -->
        <div class="form-group">
          <label for="deviceEvent">Event</label>
          <select
            id="deviceEvent"
            class="form-control"
            v-model="inputEvent"
            :class="{ 'is-invalid': !isValidFormProperty('event') }"
          >
            <option value="" selected>No Event</option>
            <option v-for="event in events" :value="event.id" :key="event.id">
              {{ event.name }}
            </option>
          </select>
          <div class="invalid-feedback">
            {{ formErrors.account }}
          </div>
        </div>
        <!-- device label -->
        <div class="form-group">
          <label for="deviceLabel">Label *</label>
          <input
            type="text"
            class="form-control"
            id="deviceLabel"
            placeholder=""
            v-model="inputLabel"
            :class="{ 'is-invalid': !isValidFormProperty('label') }"
          />
          <div class="invalid-feedback">
            {{ formErrors.label }}
          </div>
        </div>
        <!-- actions -->
        <button type="submit" class="btn btn-primary">{{ confirmButtonText }}</button>
        <router-link class="btn" :to="{ name: 'DeviceList' }">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { formValidationMixin } from '@/mixins/form-validation-mixin';

export default {
  name: 'DeviceCreateUpdate',
  mixins: [formValidationMixin],
  props: {
    id: { type: [String, Number] },
  },
  data() {
    return {
      formTitle: '',
      confirmButtonText: '',
      inputLabel: '',
      inputEvent: '',
      item: null,
    };
  },
  components: {},
  created() {
    this.setCurrentHeader('...');
    this.fetchEvents();
    if (this.isEditMode) {
      this.formTitle = 'Edit Device';
      this.confirmButtonText = 'Update';
      // [_review_] // Define what to do id is invalid or not exists
      this.fetchItem(this.id).then(() => {
        this.setCurrentHeader(`Total: ${this.itemsTotal}`);

        this.item = this.$store.state.device.currentItem;
        this.inputLabel = this.item.label;
        this.inputEvent = this.item.event ? this.item.event.id : '';
      });
    } else {
      this.formTitle = 'New Device';
      this.confirmButtonText = 'Create';
    }
  },
  computed: {
    isEditMode() {
      return typeof this.id !== 'undefined';
    },
    ...mapState('device', {
      itemsTotal: (state) => state.itemsTotal,
      resourceName: (state) => state.resourceName,
    }),
    ...mapState('event', {
      events: (state) => state.items,
    }),
  },
  methods: {
    setCurrentHeader(subtitle, title = this.resourceName) {
      this.setHeader({
        name: 'HeaderDefault',
        data: { title, subtitle },
      });
    },
    submitForm() {
      this.formErrors = {};
      // validate label
      this.inputLabel = this.inputLabel.trim();
      if (this.inputLabel === '') this.formErrors.label = 'Label is required.';

      // submit if valid
      if (this.isValidForm) {
        if (!this.item) this.item = {};

        this.item.label = this.inputLabel;
        this.item.event = this.events.find((element) => element.id === this.inputEvent);

        if (this.item.id) this.updateItem(this.item);
        else this.createItem(this.item);
      }
    },
    createItem(item) {
      this.$store
        .dispatch('device/createItem', item)
        .then(() => {
          console.log('Device created!!', item);
          this.$router.push({ name: 'DeviceList' });
        })
        .catch((error) => {
          console.log('There was a problem creating your item', error);
        });
    },
    updateItem(item) {
      this.$store
        .dispatch('device/updateItem', item)
        .then(() => {
          console.log('Device updated!!', item);
          this.$router.push({ name: 'DeviceList' });
        })
        .catch((error) => {
          console.log('There was a problem updating your item', error);
        });
    },
    ...mapActions({
      setHeader: 'setHeader',
      fetchItem: 'device/fetchItem',
      fetchEvents: 'event/fetchItems',
    }),
  },
};
</script>

<style scoped></style>
