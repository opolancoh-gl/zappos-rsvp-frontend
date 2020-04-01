<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger-dark">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">{{ this.$_app.name }}</router-link>
      <button
        class="navbar-toggler"
        data-target="#navbarContent"
        data-toggle="collapse"
        type="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent" v-if="isAuthenticated">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'EventList' }">Events</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'UserList' }">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'DeviceList' }">Devices</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              :to="{ name: 'SignIn' }"
              id="user-dropdown"
              role="button"
            >Sign In</router-link>
          </li>
          <li class="nav-item dropdown" v-if="isAuthenticated">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              :to="{ name: 'SignIn' }"
              id="user-dropdown"
              role="button"
            >Options</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" rel="nofollow" @click="signOut">Sign Out</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapState('application', {
      isAuthenticated: (state) => state.isAuthenticated,
    }),
  },
  methods: {
    signOut() {
      this.$store.commit('application/SIGN_OUT');
      this.$router.push('/signout');
    },
  },
};
</script>
