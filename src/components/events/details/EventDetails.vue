<template>
  <div>
    <Header>
      <HeaderContent
        :title="title"
        :subTitle1="subTitle1"
        :subTitle2="subTitle2"
        :navItems="navItems"
      />
    </Header>
    <div class="container my-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/_ui/Header.vue';

import HeaderContent from '@/components/_ui/HeaderContentNav.vue';

export default {
  props: {
    id: { type: [String, Number], required: true },
  },
  data() {
    return {
      title: null,
      subTitle1: null,
      subTitle2: null,
    };
  },
  components: {
    Header,
    HeaderContent,
  },
  created() {
    /*
    const item = store.getEvent(this.id);

    this.title = item.name;
    this.subTitle1 = this.$options.filters.datetimeAtShort(item.startDate);
    this.subTitle2 = item.city;
    */
  },
  computed: {
    navItems() {
      return [
        {
          title: 'Overview',
          icon: 'fa-home',
          targetRoute: { name: 'EventOverview', params: { id: this.id } },
        },
        {
          title: 'Access',
          icon: 'fa-lock',
          targetRoute: { name: 'EventAccess', params: { id: this.id } },
        },
        {
          title: 'Message Center',
          icon: 'fa-comment-alt',
          targetRoute: { name: 'EventMessageCenter', params: { id: this.id } },
        },
        {
          title: 'Attendees',
          icon: 'fa-user',
          targetRoute: { name: 'EventAttendees', params: { id: this.id } },
        },
        {
          title: 'Blast Center',
          icon: 'fa-rocket',
          targetRoute: { name: 'EventBlastCenter', params: { id: this.id } },
        },
      ];
    },
  },
};
</script>
