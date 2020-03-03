<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">Zappos RSVP</router-link>
      <button
        class="navbar-toggler"
        data-target="#navbarContent"
        data-toggle="collapse"
        type="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/events">Events</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Users</router-link>
            <a class="nav-link" href="/users"></a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/devices">Devices</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              id="user-dropdown"
              role="button"
            >Adam Admin</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" rel="nofollow" href="/sign_out">Sign Out</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
