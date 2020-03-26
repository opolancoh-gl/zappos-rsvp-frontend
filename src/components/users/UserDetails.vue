<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">User</div>
      <router-link
        v-if="typeof item.id !== 'undefined'"
        class="btn btn-sm"
        :to="{ name: 'UserUpdate', params: { id: item.id } }"
      >
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
          <router-link :to="`/accounts/${item.account.id}`">
            {{ item.account.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import userService from '@/services/user-service';

export default {
  props: {
    id: { type: [String, Number], required: true },
  },
  data() {
    return {
      item: { account: {} },
    };
  },
  components: {},
  created() {
    this.loadUser(this.id);
  },
  computed: {},
  methods: {
    loadUser(id) {
      (async () => {
        const response = await userService.getById(id);
        this.item = response.data;
        this.setHeaderTitle({ title: this.item.name, subTitle: '[to be implemented]' });
      })(id);
    },
    ...mapActions(['setHeaderTitle']),
  },
};
</script>
