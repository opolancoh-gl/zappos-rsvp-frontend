<template>
  <div>
    <div class="container my-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const subnavigationItems = [
  {
    title: 'Overview',
    icon: 'fa-home',
    targetRoute: {
      name: 'EventOverview',
      params: { id: 1 },
    },
  },
  {
    title: 'Access',
    icon: 'fa-lock',
    targetRoute: { name: 'EventAccess', params: { id: 1 } },
  },
  {
    title: 'Message Center',
    icon: 'fa-comment-alt',
    targetRoute: {
      name: 'EventMessageCenter',
      params: { id: 1 },
    },
  },
  {
    title: 'Attendees',
    icon: 'fa-user',
    targetRoute: {
      name: 'EventAttendees',
      params: { id: 1 },
    },
  },
  {
    title: 'Blast Center',
    icon: 'fa-rocket',
    targetRoute: {
      name: 'EventBlastCenter',
      params: { id: 1 },
    },
  },
];

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
  components: {},
  mounted() {
    this.updateSubmenuItems(subnavigationItems);
  },
  methods: {
    ...mapActions({
      updateSubmenuItems: 'header/setHeaderSeubmenuItems',
    }),
  },
};
</script>
