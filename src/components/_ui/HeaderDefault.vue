<template>
  <div class="row">
    <div class="col text-center">
      <div class="header-title">{{ item.title }}</div>
      <div class="header-subtitle">{{ item.subtitle }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HeaderDefault',
  computed: {
    ...mapState({
      item: (state) => state.headerData,
    }),
  },
};
</script>

<style scoped>
.header-title {
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  line-height: 1;
  font-weight: bold;
}

.header-subtitle {
  margin-top: 0;
  font-size: 1.2rem;
  font-weight: 100;
  line-height: 1.2;
}
</style>
