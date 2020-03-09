<template>
  <div>
    <SubHeader :title="title" :subTitle="`Total: ${items.length}`" />
    <div class="container my-4">
      <List :title="title" :items="items" :route="route" />
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/_ui/sub-header/SubHeader.vue';
import List from '@/components/events/EventList.vue';

export default {
  name: 'EventPage',
  data() {
    return {
      title: 'EventHome',
      route: 'events',
      items: [
        {
          id: 1,
          name: 'Event 1',
          description: 'February 25, 2020 at 2:00pm - San Francisco',
        },
        {
          id: 2,
          name: 'Event 2',
          description: 'February 26, 2020 at 3:00pm - Bogotá',
        },
        {
          id: 3,
          name: 'Event 3',
          description: 'February 27, 2020 at 4:00pm - Medellín',
        },
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
