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
      <div class="collapse navbar-collapse" id="navbarContent">
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
          <li class="nav-item dropdown">
            <router-link
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              :to="{ name: 'SignIn' }"
              id="user-dropdown"
              role="button"
              >Sign In
            </router-link>
            <div class="dropdown-menu">
              <router-link class="dropdown-item" rel="nofollow" :to="{ name: 'PasswordRecovery' }"
                >Sign Out</router-link
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
