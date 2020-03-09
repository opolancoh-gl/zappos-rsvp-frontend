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
import List from '@/components/devices/DeviceList.vue';

export default {
  name: 'DevicePage',
  data() {
    return {
      title: 'Devices',
      route: 'devices',
      items: [
        {
          id: 1,
          name: 'Device 1',
          description: 'Description for #1',
        },
        {
          id: 2,
          name: 'Device 2',
          description: 'Description for #2',
        },
        {
          id: 3,
          name: 'Device 3',
          description: 'Description for #3',
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
