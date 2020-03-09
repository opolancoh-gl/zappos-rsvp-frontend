<template>
  <div class="card mb-4">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">Users</div>
      <router-link class="btn btn-sm" :to="`/users/new`">
        <i class="fas fa-plus"></i>
        <!-- <i class="far fa-plus"></i> -->
      </router-link>
    </div>
    <div class="list-group list-group-flush">
      <div class="list-group-item" v-for="item in items" :key="item.id">
        <div class="row">
          <div class="col align-self-center">
            <div class="media">
              <i class="far fa-2x fa-user-circle ml-2 mr-4 text-muted align-self-center"></i>
              <!--<i class="fal fa-2x fa-user-circle ml-2 mr-4 text-muted align-self-center"></i>-->
              <div class="media-body align-self-center">
                <router-link :to="`/users/${item.id}`">{{ item.name }}</router-link>
                <small class="d-block">{{ item.email }}</small>
              </div>
            </div>
          </div>
          <div class="col text-right">
            <router-link class="btn btn-sm" :to="`/users/${item.id}/edit`">
              <i class="fas fa-pencil-alt"></i>
              <!-- <i class="far fa-pencil"></i> -->
            </router-link>
            <router-link class="btn btn-sm" to="#">
              <i class="fas fa-times"></i>
              <!-- <i class="far fa-times"></i> -->
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    /* axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response)); */
    this.items = [
      { id: 0, name: 'Adam Admin', email: 'admin@zappos.com' },
      { id: 1, name: 'User 1', email: 'user1@zappos.com' },
      { id: 2, name: 'User 2', email: 'user2@zappos.com' },
      { id: 3, name: 'User 3', email: 'user3@zappos.com' },
    ];
  },
};
</script>

<style scoped></style>
