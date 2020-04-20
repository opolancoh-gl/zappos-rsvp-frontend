<template>
  <div>
    <div v-if="actionMessage" class="alert alert-success ">{{ actionMessage }}</div>
    <div class="card">
      <div class="card-header">Device</div>
      <div class="card-body">
        <p>
          <strong class="d-block">Label:</strong>
          {{ item.label }}
        </p>
        <p>
          <strong class="d-block">Connected to:</strong>
          {{ item.event ? item.event.name : 'N/A' }}
        </p>
        <p>
          <strong class="d-block">Pairing Key:</strong>
          {{ item.pairingKey }}
          <small class="d-block text-muted">Please enter this key in the Famoco device.</small>
        </p>
        <router-link
          v-if="item.id"
          class="btn btn-primary"
          :to="{ name: 'DeviceUpdate', params: { id: item.id } }"
        >
          <i class="fas fa-pencil-alt mr-2"></i>
          Edit
        </router-link>
        <router-link class="btn btn-link" :to="{ name: 'DeviceList' }">Back to List</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'DeviceDetails',
  props: {
    id: { type: [String, Number] },
    actionMessage: { type: String },
  },
  mounted() {
    (async () => {
      try {
        // [_review_] // Define what to do id is invalid or not exists
        const result = await this.fetchItem(this.id);
        this.setCurrentHeader(
          `Connected to  ${result.event ? result.event.name : 'N/A'}`,
          result.label,
        );
      } catch (error) {
        console.log('[Exception-DeviceDetails]', error);
      }
    })();
  },
  computed: {
    ...mapState('device', {
      item: (state) => state.currentItem,
      itemsTotal: (state) => state.itemsTotal,
      resourceName: (state) => state.resourceName,
    }),
  },
  methods: {
    setCurrentHeader(subtitle, title = this.resourceName) {
      this.setHeader({
        name: 'HeaderDefault',
        data: { title, subtitle },
      });
    },
    ...mapActions({ setHeader: 'setHeader', fetchItem: 'device/fetchItem' }),
  },
};
</script>
