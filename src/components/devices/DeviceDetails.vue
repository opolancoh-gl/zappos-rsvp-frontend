<template>
  <div>
    <SubHeader :title="title" :subTitle="subTitle" />
    <div class="container my-4">
      <div class="card">
        <div class="card-header">Device</div>
        <div class="card-body">
          <p>
            <strong class="d-block">Label:</strong>
            {{title}}
          </p>
          <p>
            <strong class="d-block">Pairing Key:</strong>
            {{pairingKey}}
            <small
              class="d-block text-muted"
            >Please enter this key in the Famoco device.</small>
          </p>
          <router-link class="btn btn-primary" to="/devices/1/edit">Edit</router-link>
          <router-link class="btn" to="/devices">Cancel</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/_ui/sub-header/SubHeader.vue';

export default {
  name: 'DeviceDetails',
  data() {
    return {
      title: '',
      subTitle: '',
      pairingKey: null,
    };
  },
  components: {
    SubHeader,
  },
  mounted() {
    /* axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response)); */
    this.title = 'Device #1';
    this.subTitle = 'Connected to N/A';
    this.pairingKey = Date.now();
  },
};
</script>


<style scoped>
</style>
