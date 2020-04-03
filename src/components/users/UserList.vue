<template>
  <div class="card mb-4">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">Users</div>
      <router-link class="btn btn-sm" :to="{ name: 'UserCreate' }">
        <i class="fas fa-plus"></i>
      </router-link>
    </div>
    <div class="list-group list-group-flush">
      <div class="list-group-item" v-for="user in users" :key="user.id">
        <div class="row">
          <div class="col align-self-center">
            <div class="media">
              <i class="far fa-2x fa-user-circle ml-2 mr-4 text-muted align-self-center"></i>
              <div class="media-body align-self-center">
                <router-link :to="{ name: 'UserDetails', params: { id: user.id } }">
                  {{ user.name }}
                  <small class="d-block">{{ user.email }}</small>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col text-right">
            <router-link class="btn btn-sm" :to="{ name: 'UserUpdate', params: { id: user.id } }">
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {},
  data() {
    return { items: [], itemsCount: '' };
  },
  mounted() {
    this.$store.dispatch('application/setHeaderInfo', {
      title: 'Users',
      subtitle: '',
    });
    this.updateUsers();
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers',
    }),
  },
  methods: {
    ...mapActions({
      updateUsers: 'user/updateItems',
    }),
  },
};
</script>
