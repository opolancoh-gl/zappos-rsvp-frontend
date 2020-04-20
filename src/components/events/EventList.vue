<template>
  <div>
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between">
        <div class="align-self-center">Events</div>
        <router-link class="btn btn-sm btn-primary" :to="{ name: 'EventCreate' }">
          <i class="fas fa-plus mr-2"></i>
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
                  <router-link :to="{ name: 'EventOverview', params: { id: item.id } }">
                    {{
                    item.name
                    }}
                  </router-link>
                  <small class="d-block">{{ item.description }}</small>
                </div>
              </div>
            </div>
            <div class="col text-right d-flex justify-content-end align-items-center">
              <router-link
                class="btn btn-sm mr-2 btn-primary"
                :to="{ name: 'EventUpdate', params: { id: item.id } }"
              >
                <i class="fas fa-pencil-alt mr-2"></i>
                Edit
              </router-link>
              <router-link class="btn btn-sm btn-primary" to="#">
                <i class="fas fa-times mr-2"></i>
                Delete
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  // created() {
  //   this.items = store.events;
  // },
  mounted() {
    this.$store.dispatch('header/setInfo', {
      title: 'Events',
      subtitle: 'You have $[event.items.length] event',
    });
  },
};
</script>
