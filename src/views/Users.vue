<template>
  <div>
    <SubHeader :title="title" :subTitle="`Total: ${items.length}`" />
    <div class="container my-4">
      <List :title="title" :items="items" :route="route" />
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/_shared/sub-header/SubHeader.vue';
import List from '@/components/users/UserList.vue';

export default {
  name: 'Users',
  data() {
    return {
      title: 'Users',
      route: 'users',
      items: [
        { id: 0, name: 'Adam Admin', email: 'admin@zappos.com' },
        { id: 1, name: 'User 1', email: 'user1@zappos.com' },
        { id: 2, name: 'User 2', email: 'user2@zappos.com' },
        { id: 3, name: 'User 3', email: 'user3@zappos.com' },
      ],
    };
  },
  methods: {},
  components: {
    SubHeader,
    List,
  },
};
</script>
