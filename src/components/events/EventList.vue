<template>
  <div class="card mb-4">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">{{ title }}</div>
      <router-link class="btn btn-sm btn-primary" :to="`/${route}/new`">
        <i class="fas fa-plus mr-2"></i>
        <!-- <i class="far fa-plus mr-2"></i> -->
        Add
      </router-link>
    </div>
    <div class="list-group list-group-flush">
      <div class="list-group-item" v-for="item in items" :key="item.id">
        <div class="row">
          <div class="col align-self-center">
            <div class="media">
              <i class="far fa-calendar-alt fa-2x ml-2 mr-4 text-primary align-self-center"></i>
              <div class="media-body align-self-center">
                <router-link :to="`/events/${item.id}`">{{ item.name }}</router-link>
                <small class="d-block">{{ item.description }}</small>
              </div>
            </div>
          </div>
          <div class="col text-right d-flex justify-content-end align-items-center">
            <a class="btn btn-sm mr-2 btn-primary" :href="`/${route}/${item.id}/edit`">
              <i class="fas fa-pencil-alt mr-2"></i>
              <!-- <i class="far fa-pencil mr-2"></i> -->
              Edit
            </a>
            <a
              data-confirm="Are you sure? This will delete all event data and cannot be undone."
              class="btn btn-sm btn-primary"
              rel="nofollow"
              data-method="delete"
              href="/events/1"
            >
              <i class="fas fa-times mr-2"></i>
              <!-- <i class="far fa-times mr-2"></i> -->
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventList',
  props: {
    items: { type: Array, required: true },
    title: { type: String, required: true },
    route: { type: String, required: true },
  },
};
</script>

<style scoped></style>
