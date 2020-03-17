<template>
  <div>
    <Header>
      <HeaderContent :name="name" :date="date" :location="location" :id="id" />
    </Header>
    <div class="container my-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/_ui/Header.vue';
import store from '@/store/data';

import HeaderContent from './EventDetailsHeaderContent.vue';

export default {
  props: {
    id: { type: [String, Number], required: true },
  },
  data() {
    return {
      name: null,
      date: null,
      location: null,
    };
  },
  components: {
    Header,
    HeaderContent,
  },
  created() {
    const item = store.getEvent(this.id);

    this.name = item.name;
    this.date = item.startDate;
    this.location = item.city;
  },
};
</script>
