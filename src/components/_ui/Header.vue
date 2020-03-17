<template>
  <div class="header">
    <div class="container">
      <slot>
        <div class="row">
          <div class="col text-center">
            <HeaderTitle :title="title" :subTitle="subTitle" />
          </div></div
      ></slot>
    </div>
    <HeaderWave />
  </div>
</template>

<script>
import HeaderTitle from '@/components/_ui/HeaderTitle.vue';
import HeaderWave from '@/components/_ui/HeaderWave.vue';

export default {
  props: {
    title: { type: String },
    subTitle: { type: String },
  },
  components: {
    HeaderTitle,
    HeaderWave,
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
