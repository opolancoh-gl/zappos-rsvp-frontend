<template>
  <div class="header">
    <div class="container">
      <component :is="headerName"></component>
    </div>
    <HeaderWave />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HeaderDefault from './HeaderDefault.vue';
import HeaderWave from './HeaderWave.vue';

export default {
  name: 'Header',
  components: {
    HeaderDefault,
    HeaderWave,
  },
  computed: {
    ...mapState(['headerName']),
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/bootstrap';

.header {
  position: relative;
  padding: 4rem 0 6rem;
  color: white;
  background-color: $primary;
}
</style>
