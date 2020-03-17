<template>
  <div>
    <Header :title="title" :subTitle="subTitle" />
    <div class="container my-4">
      <div class="card">
        <div class="card-header">{{ formTitle }}</div>
        <div class="card-body">
          <form class="simple_form new_device">
            <div class="form-group select optional device_event">
              <label class="form-control-label select optional" for="device-event-id">Event</label>
              <select class="form-control select optional" id="device-event-id">
                <option v-for="item in events" :value="item.value" :key="item.value">{{
                  item.name
                }}</option>
              </select>
            </div>
            <div class="form-group string optional device_label">
              <label class="form-control-label string optional" for="device-label">Label</label>
              <input class="form-control string optional" type="text" id="device-label" />
            </div>
            <button class="btn btn-primary">{{ confirmButtonName }}</button>
            <router-link class="btn" :to="{ name: 'DeviceList' }">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/_ui/Header.vue';
import store from '@/store/data';

export default {
  props: {
    id: { type: [String, Number] },
  },
  data() {
    return {
      title: null,
      subTitle: null,
      formTitle: null,
      item: null,
      confirmButtonName: null,
      events: [],
    };
  },
  components: {
    Header,
  },
  created() {
    if (this.isEditMode) {
      this.item = store.getUser(this.id);

      this.title = this.item.name;
      this.subTitle = 'Connected to ...';
      this.formTitle = 'Edit Device';
      this.confirmButtonName = 'Update';
    } else {
      this.title = 'Devices';
      this.subTitle = `Total: ${store.devices.length}`;
      this.formTitle = 'New Device';
      this.confirmButtonName = 'Create';
    }
    this.events = store.events;
    this.events.unshift({ name: 'No Event', id: 0 });
  },
  computed: {
    isEditMode() {
      return Object.prototype.hasOwnProperty.call(this.$route.params, 'id');
    },
  },
};
</script>
