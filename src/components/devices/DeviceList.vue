<template>
  <div class="card mb-4">
    <TableHead :name="title" :links="tableHeadLinks" />
    <TableBodyNoData v-if="items.length === 0" />
    <div v-else class="list-group list-group-flush">
      <div class="list-group-item" v-for="(item, index) in items" :key="index">
        <div class="row">
          <div class="col align-self-center">
            <router-link :to="{ name: 'DeviceDetails', params: { id: item.id } }">{{
              item.label
            }}</router-link>
          </div>
          <div class="col align-self-center">
            <div v-if="!item.event" class="text-muted">N/A</div>
            <div v-else>
              Connected to
              <router-link :to="{ name: 'EventOverview', params: { id: item.event.id } }">
                {{ item.event.name }}
              </router-link>
            </div>
          </div>
          <div class="col text-right">
            <router-link
              class="btn btn-sm btn-primary"
              :to="{ name: 'DeviceUpdate', params: { id: item.id } }"
            >
              <i class="fas fa-pencil-alt mr-2"></i>
              Edit
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TableHead from '@/components/_ui/TableHead.vue';
import TableBodyNoData from '@/components/_ui/TableBodyNoData.vue';

export default {
  name: 'DeviceList',
  components: { TableHead, TableBodyNoData },
  data() {
    return {
      title: 'Devices',
      tableHeadLinks: [
        {
          name: 'Add',
          routeName: 'DeviceCreate',
          class: 'btn-primary',
          icon: 'fa-plus',
        },
      ],
    };
  },
  created() {
    this.setCurrentHeader('...');
  },
  mounted() {
    (async () => {
      try {
        await this.fetchItems();
        this.setCurrentHeader(`Total: ${this.itemsTotal}`);
      } catch (error) {
        console.log('[Exception-DeviceList]', error);
      }
    })();
  },
  computed: {
    ...mapState('device', {
      items: (state) => state.items,
      itemsTotal: (state) => state.itemsTotal,
      resourceName: (state) => state.resourceName,
    }),
  },
  methods: {
    setCurrentHeader(subtitle, title = this.resourceName) {
      this.setHeader({
        name: 'HeaderDefault',
        data: { title, subtitle },
      });
    },
    ...mapActions({ setHeader: 'setHeader', fetchItems: 'device/fetchItems' }),
  },
};
</script>
