<template>
  <div>
    <div class="header-title">{{ title }}</div>
    <div class="header-subtitle">
      <slot>{{ subTitle }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
    subTitle: { type: String },
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
