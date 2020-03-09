<template>
  <div>
    <SubHeader :title="title" :subTitle="subTitle" />
    <div class="container my-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SubHeader from './DetailsSubHeader.vue';

export default {
  name: 'EventDetails',
  data() {
    return {
      title: '',
      subTitle: '',
      item: {
        id: null,
        name: null,
        email: null,
        account: { id: null, name: null },
      },
    };
  },
  components: {
    SubHeader,
  },
  mounted() {
    /* axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response)); */
    this.item = {
      id: 1,
      name: 'Sheldon Cooper',
      email: 'scooper@zappos.com',
      account: { id: 11, name: 'Kuhn Inc' },
    };
    this.title = this.item.name;
    this.subTitle = 'Oversees 0 people across 0 brands';
  },
};
</script>


<style scoped>
</style>
