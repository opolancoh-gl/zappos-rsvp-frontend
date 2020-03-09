<template>
  <div>
    <SubHeader :title="title" :subTitle="subTitle" />
    <div class="container my-4">
      <div class="card">
        <div class="card-header">New Device</div>
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
            <button class="btn btn-primary">Save</button>
            <router-link class="btn" to="/devices">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/_ui/sub-header/SubHeader.vue';

export default {
  name: 'DeviceCreateEdit',
  data() {
    return {
      title: 'Devices',
      subTitle: 'Total: 3',
      events: [{ name: 'No Event', value: null }],
    };
  },
  components: {
    SubHeader,
  },
  mounted() {
    /* axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response)); */
    this.events.push({ name: 'Event #1', value: 1 });
  },
};
</script>

<style scoped></style>
