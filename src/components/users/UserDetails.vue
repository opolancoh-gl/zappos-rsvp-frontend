<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">User</div>
      <router-link
        v-if="typeof user.id !== 'undefined'"
        class="btn btn-sm"
        :to="{ name: 'UserUpdate', params: { id: user.id } }"
      >
        <i class="far fa-edit mr-1"></i>
        Edit
      </router-link>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col">
          <strong class="d-block">Name:</strong>
          {{ user.username }}
        </div>
        <div class="col">
          <strong class="d-block">Email</strong>
          {{ user.email }}
        </div>
        <div class="col">
          <strong class="d-block">Account:</strong>
          <router-link :to="`/accounts/${user.account.id}`">{{ user.account.name }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    id: { type: [String], required: true },
  },
  data() {
    return {
      user: { account: {} },
    };
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers',
    }),
  },
  mounted() {
    if (!this.users.length) {
      this.updateUsers().then(() => {
        this.updateUser();
      });
    } else {
      this.updateUser();
    }
  },
  methods: {
    ...mapActions({
      updateUsers: 'user/updateItems',
    }),
    updateUser() {
      const users = this.users.filter((user) => user.id === this.id);
      if (users.length > 0) {
        this.user = users.pop();
        this.user.account = 1;
      }

      // this.user = this.users.filter((user) => user.id === this.id).pop();
    },
  },
};
</script>
