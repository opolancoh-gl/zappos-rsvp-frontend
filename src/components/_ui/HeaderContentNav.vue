<template>
  <div class="row event-nav d-flex align-items-center">
    <div class="col-4 col-xl-5">
      <HeaderTitle :title="title">
        <div class="d-block">{{ subTitle1 | upperCase }}</div>
        <div class="d-block">{{ subTitle2 | upperCase }}</div>
      </HeaderTitle>
    </div>
    <div class="col text-center d-flex justify-content-end">
      <ul class="nav nav-tabs align-items-center">
        <li class="nav-item" v-for="(item, index) in navItems" :key="index">
          <router-link class="fa-stack" :to="item.targetRoute">
            <i class="fas fa-stack-1x fa-fw nav-icon" :class="item.icon"></i>
            <strong class="fa-stack-1x nav-label">{{ item.title | upperCase }}</strong>
            <!-- <strong class="fa-stack-1x nav-label"><span v-html="item.title"></span></strong> -->
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderTitle from '@/components/_ui/HeaderTitle.vue';

export default {
  props: {
    title: { type: String, required: true },
    subTitle1: { type: String, required: true },
    subTitle2: { type: String, required: true },
    navItems: { type: Array, required: true },
  },
  components: { HeaderTitle },
};
</script>

<style scoped>
.nav-tabs {
  border-bottom: none;
}

.nav-label {
  line-height: 1;
}
</style>
