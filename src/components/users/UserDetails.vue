<template>
  <div>
    <Header :title="title" :subTitle="subTitle" />
    <div class="container my-4">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="align-self-center">User</div>
          <router-link class="btn btn-sm" :to="{ name: 'UserUpdate', params: { id: item.id } }">
            <i class="far fa-edit mr-1"></i>
            Edit
          </router-link>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <strong class="d-block">Name:</strong>
              {{ item.name }}
            </div>
            <div class="col">
              <strong class="d-block">Email</strong>
              {{ item.email }}
            </div>
            <div class="col">
              <strong class="d-block">Account:</strong>
              <router-link :to="`/accounts/${item.account.id}`">{{
                item.account.name
              }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/_ui/Header.vue';
import store from '@/store/data';

export default {
  props: {
    id: { type: [String, Number], required: true },
  },
  data() {
    return {
      title: null,
      subTitle: null,
      item: {},
    };
  },
  components: {
    Header,
  },
  created() {
    this.item = store.getUser(this.id);
    this.title = this.item.name;
    this.subTitle = 'Oversees 0 people across 0 brands';
  },
};
</script>
