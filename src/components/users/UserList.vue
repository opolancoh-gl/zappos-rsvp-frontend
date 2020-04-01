<template>
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
                <router-link :to="{ name: 'UserDetails', params: { id: item.id } }">
                  {{ item.name }}
                </router-link>
                <small class="d-block">{{ item.email }}</small>
              </div>
            </div>
          </div>
          <div class="col text-right">
            <router-link class="btn btn-sm" :to="{ name: 'UserUpdate', params: { id: item.id } }">
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
import { mapActions } from 'vuex';
import userService from '@/services/user-service';

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
    // this.loadUsers();
  },
  computed: {},
  methods: {
    loadUsers() {
      (async () => {
        const { data: items } = await userService.getAll();
        const itemsCount = await userService.getAllCount();
        this.items = items;
        this.setHeaderTitle({ title: 'Users', subTitle: `Total: ${itemsCount}` });
      })();
    },
    ...mapActions(['setHeaderTitle']),
  },
};
</script>
