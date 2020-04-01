<template>
  <div>
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between">
        <div class="align-self-center">Devices</div>
        <router-link class="btn btn-sm btn-primary" :to="{ name: 'DeviceCreate' }">
          <i class="fas fa-plus mr-2"></i>
          Add
        </router-link>
      </div>
      <div class="list-group list-group-flush">
        <div class="list-group-item" v-for="item in items" :key="item.id">
          <div class="row">
            <div class="col align-self-center">
              <router-link to="/devices/1">{{ item.name }}</router-link>
            </div>
            <div class="col align-self-center">
              <div class="text-muted">{{ item.description }}</div>
            </div>
            <div class="col text-right">
              <router-link
                class="btn btn-sm btn-primary"
                :to="{ name: 'DeviceUpdate', params: { id: item.id } }"
              >
                <i class="fas fa-pencil-alt mr-2"></i>
                Edit
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/store/data';

export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    // this.items = store.devices;
  },
  mounted() {
    this.$store.dispatch('application/setHeaderInfo', {
      title: 'Devices',
      subtitle: 'Total: 0',
    });
  },
};
</script>
