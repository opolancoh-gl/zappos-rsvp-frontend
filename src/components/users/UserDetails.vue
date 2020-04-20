<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">User</div>
      <router-link
        v-if="typeof userInfo.id !== 'undefined'"
        class="btn btn-sm"
        :to="{ name: 'UserUpdate', params: { id: userInfo.id } }"
      >
        <i class="far fa-edit mr-1"></i>
        Edit
      </router-link>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col">
          <strong class="d-block">Name:</strong>
          {{ userInfo.username }}
        </div>
        <div class="col">
          <strong class="d-block">Email</strong>
          {{ userInfo.email }}
        </div>
        <div class="col">
          <strong class="d-block">Account:</strong>
          <router-link
            v-if="userInfo.account"
            :to="`/accounts/${userInfo.account.account_name}`"
          >{{ userInfo.account.account_name }}</router-link>
          <span v-if="!userInfo.account">No Account</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    user: { type: Object },
  },
  data() {
    return {
      userInfo: { account: {} },
    };
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers',
      accounts: 'account/getAccounts',
    }),
  },
  mounted() {
    this.$store.dispatch('header/setInfo', {
      title: 'Users',
      subtitle: 'Details',
    });
    if (this.user) {
      this.userInfo = this.user;
    }
    if (!this.users.length) {
      this.getUsers().then(() => {
        this.updateUserInformation();
      });
    } else {
      this.updateUserInformation();
    }
  },
  methods: {
    ...mapActions({
      getUsers: 'user/getItemsFromAPi',
    }),
    updateUserInformation() {
      const uid = this.user ? this.user.id : this.$route.params.id;
      const users = this.users.filter((userInfo) => userInfo.id === uid);
      if (users.length > 0) {
        this.userInfo = users.pop();
      }
    },
  },
};
</script>
