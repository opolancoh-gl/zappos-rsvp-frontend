<template>
  <div>
    <Header :title="title" :subTitle="subTitle" />
    <div class="container my-4">
      <div class="card mb-4">
        <div class="card-header d-flex justify-content-between">
          <div class="align-self-center">Users</div>
          <router-link class="btn btn-sm" :to="{ name: 'UserCreate' }">
            <i class="fas fa-plus"></i>
          </router-link>
        </div>
        <div class="list-group list-group-flush">
          <div class="list-group-item" v-for="item in items" :key="item.id">
            <div class="row">
              <div class="col align-self-center">
                <div class="media">
                  <i class="far fa-2x fa-user-circle ml-2 mr-4 text-muted align-self-center"></i>
                  <div class="media-body align-self-center">
                    <router-link :to="{ name: 'UserDetails', params: { id: item.id } }">{{
                      item.name
                    }}</router-link>
                    <small class="d-block">{{ item.email }}</small>
                  </div>
                </div>
              </div>
              <div class="col text-right">
                <router-link
                  class="btn btn-sm"
                  :to="{ name: 'UserUpdate', params: { id: item.id } }"
                >
                  <i class="fas fa-pencil-alt"></i>
                </router-link>
                <router-link class="btn btn-sm" to="#">
                  <i class="fas fa-times"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/_ui/Header.vue';

import { mapState } from 'vuex';

export default {
  components: {
    Header,
  },
  created() {
    this.$store.dispatch('user/fetchUsers');
  },
  computed: {
    title() {
      return 'Users';
    },
    subTitle() {
      return `Total: ${this.itemsCount}`;
    },
    ...mapState('user', {
      items: (state) => state.users,
      itemsCount: (state) => state.usersCount,
    }),
  },
};
</script>
