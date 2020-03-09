<template>
  <div>
    <SubHeader :title="title" :subTitle="subTitle" />
    <div class="container my-4">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="align-self-center">User</div>
          <router-link class="btn btn-sm" :to="`/users/${item.id}/edit`">
            <i class="far fa-edit mr-1"></i>
            <!-- <i class="far fa-edit mr-1"></i> -->
            Edit
          </router-link>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <strong class="d-block">Name:</strong>
              {{item.name}}
            </div>
            <div class="col">
              <strong class="d-block">Email</strong>
              {{item.email}}
            </div>
            <div class="col">
              <strong class="d-block">Account:</strong>
              <router-link :to="`/accounts/${item.account.id}`">{{item.account.name}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/_ui/sub-header/SubHeader.vue';

export default {
  name: 'UserDetails',
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
