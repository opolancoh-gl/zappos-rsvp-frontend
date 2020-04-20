<template>
  <div class="row">
    <div class="col text-center">
      <HeaderTitle :title="item.title" :subtitle="item.subtitle" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HeaderTitle from '@/components/_ui/HeaderTitle.vue';

export default {
  name: 'HeaderDefault',
  components: { HeaderTitle },
  computed: {
    ...mapState({
      item: (state) => state.headerData,
    }),
  },
};
</script>
