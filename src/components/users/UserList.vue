<template>
  <div class="card mb-4">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">Users</div>
      <router-link
        class="btn btn-sm"
        :to="{ name: 'UserCreate' }"
      >
        <i class="fas fa-plus"></i>
      </router-link>
    </div>
    <div class="list-group list-group-flush">
      <div
        class="list-group-item"
        v-for="user in users"
        :key="user.id"
      >
        <div class="row">
          <div class="col align-self-center">
            <div class="media">
              <i
                class="far fa-2x fa-user-circle ml-2 mr-4 text-muted align-self-center"
              ></i>
              <div class="media-body align-self-center">
                <router-link
                  :to="{
                    name: 'UserDetails',
                    params: { id: user.id },
                  }"
                >
                  {{ user.name }}
                  <small class="d-block">{{
                    user.email
                  }}</small>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col text-right">
            <router-link
              class="btn btn-sm"
              :to="{
                name: 'UserUpdate',
                params: { id: user.id },
              }"
            >
              <i class="fas fa-pencil-alt"></i>
            </router-link>
            <button
              class="btn btn-sm"
              @click.prevent="removeUser(user)"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {},
  data() {
    return { items: [], itemsCount: '' };
  },
  mounted() {
    this.$store.dispatch('application/setHeaderInfo', {
      title: 'Users',
      subtitle: 'List',
    });
    this.getUsers();
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers',
    }),
  },
  methods: {
    async removeUser(user) {
      const result = Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0062cc',
        cancelButtonColor: '#b2b3b3',
        confirmButtonText: 'Yes, delete it!',
      });
      if (result.value) {
        await this.deleteUser(user);
        await this.getUsers();
        Swal.fire(
          'Deleted!',
          'The element has been deleted.',
          'success',
        );
      }
    },
    ...mapActions({
      getUsers: 'user/getItemsFromAPi',
      deleteUser: 'user/deleteItem',
    }),
  },
};
</script>
