<template>
  <router-view></router-view>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'EventDetails',
  props: {
    id: { type: String, required: true },
  },
  created() {},
  mounted() {
    (async () => {
      try {
        // [_review_] // Define what to do id is invalid or not exists
        const { name, startTime, location } = await this.fetchItem(this.id);
        this.setHeader({
          name: 'HeaderWithNavigation',
          data: {
            title: name,
            subtitle1: startTime,
            subtitle2: location,
            navItems: this.navItems,
          },
        });
      } catch (error) {
        console.log('[Exception-EventDetails]', error);
      }
    })();
  },
  computed: {
    ...mapState('event', {
      item: (state) => state.currentItem,
      resourceName: (state) => state.resourceName,
    }),
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
          targetRoute: { name: 'EventAccessList', params: { id: this.id } },
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
  methods: {
    ...mapActions({ setHeader: 'setHeader', fetchItem: 'event/fetchItem' }),
  },
};
</script>
