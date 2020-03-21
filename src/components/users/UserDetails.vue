<template>
  <div>
    <Header
      :title="item.name"
      :subTitle="'[to be implemented] Oversees 0 people across 0 brands'"
    />
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
              <router-link :to="item.account ? `/accounts/${item.account.id}` : ''">{{
                item.account ? item.account.name : ''
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
import { mapState } from 'vuex';

export default {
  props: {
    id: { type: [String, Number], required: true },
  },
  components: {
    Header,
  },
  created() {
    this.$store.dispatch('user/fetchUserById', this.id);
  },
  computed: {
    ...mapState('user', { item: (state) => state.user }),
  },
};
</script>
