<template>
  <div class="card-header d-flex justify-content-between">
    <div class="align-self-center">{{ name }}</div>
    <router-link
      v-for="(item, index) in links"
      :key="index"
      class="btn btn-sm"
      :class="item.class"
      :to="{ name: item.routeName }"
    >
      <i class="fas mr-2" :class="item.icon"></i>
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    name: { type: String, default: '' },
    links: { type: Array, default: () => [] },
  },
};
</script>
