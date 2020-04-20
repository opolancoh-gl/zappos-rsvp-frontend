<template>
  <div>
    <div class="card mb-4">
      <TableHead :name="title" :links="tableHeadLinks" />
      <TableBodyNoData v-if="items.length === 0" />
      <div class="list-group list-group-flush">
        <div class="list-group-item" v-for="item in items" :key="item.id">
          <div class="row">
            <div class="col align-self-center">
              <div class="media">
                <i class="far fa-calendar-alt fa-2x ml-2 mr-4 text-primary align-self-center"></i>
                <div class="media-body align-self-center">
                  <router-link :to="{ name: 'EventOverview', params: { id: item.id } }">
                    {{ item.name }}
                  </router-link>
                  <small class="d-block"
                    >{{ item.startTime | datetimeAtShort }} - {{ item.location }}</small
                  >
                </div>
              </div>
            </div>
            <div class="col text-right d-flex justify-content-end align-items-center">
              <router-link
                class="btn btn-sm mr-2 btn-primary"
                :to="{ name: 'EventUpdate', params: { id: item.id } }"
              >
                <i class="fas fa-pencil-alt mr-2"></i>
                Edit
              </router-link>
              <button class="btn btn-sm btn-primary" @click.prevent="removeItem(item.id)">
                <i class="fas fa-times mr-2"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';
import TableHead from '@/components/_ui/TableHead.vue';
import TableBodyNoData from '@/components/_ui/TableBodyNoData.vue';

export default {
  name: 'EventList',
  components: { TableHead, TableBodyNoData },
  data() {
    return {
      title: 'Events',
      tableHeadLinks: [
        {
          name: 'Add',
          routeName: 'EventCreate',
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
        console.log('[Exception-EventList]', error);
      }
    })();
  },
  computed: {
    ...mapState('event', {
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
    removeItem(id) {
      const result = Swal.fire({
        title: 'Are you sure?',
        text: 'This will delete all event data and cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0062cc',
        cancelButtonColor: '#b2b3b3',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.value) {
          await this.deleteItem(id);
          Swal.fire('Deleted!', 'The element has been deleted.', 'success');
        }
      });
    },
    ...mapActions({
      setHeader: 'setHeader',
      fetchItems: 'event/fetchItems',
      deleteItem: 'event/deleteItem',
    }),
  },
};
</script>
