<template>
  <div>
    <SubHeader :title="title" :subTitle="`Total: 2`" />
    <div class="container my-4">
      <List />
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/_ui/sub-header/SubHeader.vue';
import List from '@/components/users/UserList.vue';

export default {
  name: 'UserPage',
  data() {
    return {
      title: 'Users',
    };
  },
  methods: {},
  components: {
    SubHeader,
    List,
  },
};
</script>
