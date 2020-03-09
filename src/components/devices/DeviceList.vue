<template>
  <div class="card mb-4">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">{{title}}</div>
      <router-link class="btn btn-sm btn-primary" to="/devices/new">
        <i class="fas fa-plus mr-2"></i>
        <!-- <i class="far fa-plus mr-2"></i> -->
        Add
      </router-link>
    </div>
    <div class="list-group list-group-flush">
      <div class="list-group-item" v-for="(item) in items" :key="item.id">
        <div class="row">
          <div class="col align-self-center">
            <!--<a :href="`/${route}/${item.id}`">{{item.name}}</a>-->
            <router-link to="/devices/1">{{item.name}}</router-link>
          </div>
          <div class="col align-self-center">
            <div class="text-muted">{{item.description}}</div>
          </div>
          <div class="col text-right">
            <router-link class="btn btn-sm btn-primary" :to="`/${route}/${item.id}/edit`">
              <i class="fas fa-pencil-alt mr-2"></i>
              <!-- <i class="far fa-pencil mr-2"></i> -->
              Edit
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceList',
  props: {
    items: { type: Array, required: true },
    title: { type: String, required: true },
    route: { type: String, required: true },
  },
};
</script>


<style scoped>
</style>
