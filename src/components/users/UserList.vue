<template>
  <div class="card mb-4">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">{{title}}</div>
      <a class="btn btn-sm" :href="`/${route}/new`">
        <i class="fas fa-plus"></i>
        <!-- <i class="far fa-plus"></i> -->
      </a>
    </div>
    <div class="list-group list-group-flush">
      <div class="list-group-item" v-for="(item) in items" :key="item.id">
        <div class="row">
          <div class="col align-self-center">
            <div class="media">
              <i class="far fa-2x fa-user-circle ml-2 mr-4 text-muted align-self-center"></i>
              <!--<i class="fal fa-2x fa-user-circle ml-2 mr-4 text-muted align-self-center"></i>-->
              <div class="media-body align-self-center">
                <a :href="`/users/${item.id}`">{{item.name}}</a>
                <small class="d-block">{{item.email}}</small>
              </div>
            </div>
          </div>
          <div class="col text-right">
            <a class="btn btn-sm" :href="`/${route}/${item.id}/edit`">
              <i class="fas fa-pencil-alt"></i>
              <!-- <i class="far fa-pencil"></i> -->
            </a>
            <a
              data-confirm="Are you sure?"
              class="btn btn-sm"
              rel="nofollow"
              data-method="delete"
              :href="`/${route}/${item.id}`"
            >
              <i class="fas fa-times"></i>
              <!-- <i class="far fa-times"></i> -->
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    items: { type: Array, required: true },
    title: { type: String, required: true },
    route: { type: String, required: true },
  },
};
</script>


<style scoped>
</style>
