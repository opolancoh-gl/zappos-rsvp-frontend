<template>
  <div id="app">
    <NavBar />
    <Header :title="title" :subTitle="subtitle" />
    <div class="container my-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from '@/components/_ui/NavBar.vue';
import Header from '@/components/_ui/Header.vue';

export default {
  components: {
    NavBar,
    Header,
  },
  computed: {
    ...mapState('application', {
      title: (state) => state.headerTitle,
      subtitle: (state) => state.headerSubtitle,
    }),
  },
  mounted() {},
};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';

.dropdown-toggle::after {
  display: none;
}

.person-complete {
  color: $secondary !important;
}

.person-incomplete {
  color: $warning !important;
}

.person-missing-phone {
  color: $danger !important;
}

.bg-purple {
  background-color: purple !important;
}

.bg-danger-dark {
  background-color: darken($primary, 10);
}

.text-purple {
  color: purple !important;
}

.navbar-dark .navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.9);
}

.event-nav {
  .fa-stack {
    font-size: 3.4em;
    height: 2em;
    width: 2.15em;
  }

  .fa-stack-2x {
    height: 2em;
    width: 2.15em;
  }

  .fa-stack-1x {
    height: 1em;
    width: 1em;
  }

  .nav-label.fa-stack-1x {
    height: auto;
    width: inherit;
  }

  .nav-circle {
    color: $primary;
  }

  .nav-icon {
    margin-top: 20px;
    font-size: 40px;
    color: #fff;
  }

  .nav-label {
    margin-top: 66px;
    font-size: 12px;
    color: #fff;
  }
}

.event-nav ul,
.event-nav ul li {
  z-index: 2;
  display: inline-block;
  vertical-align: middle;
  padding: 0;
  margin: 0;
}
.event-nav ul li a.active .nav-circle,
.event-nav ul li a:hover .nav-circle {
  color: darken($primary, 10);
  text-decoration: none;
}

.card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  .card-header {
    color: white;
    background-color: darken($primary, 5);

    a,
    a:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

.text-bold {
  font-weight: 700;
}
</style>
