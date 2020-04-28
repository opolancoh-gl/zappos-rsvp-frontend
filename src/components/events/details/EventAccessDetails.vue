<template>
  <div>
    <div class="card-group">
      <div class="card mb-4 bg-success text-white">
        <div class="card-body text-center">
          <h4 class="mb-0 d-block">0</h4>
          <div class="d-block">Yes</div>
        </div>
      </div>
      <div class="card mb-4 bg-danger text-white">
        <div class="card-body text-center">
          <h4 class="mb-0 d-block">0</h4>
          <div class="d-block">No</div>
        </div>
      </div>
      <div class="card mb-4 bg-warning text-white">
        <div class="card-body text-center">
          <h4 class="mb-0 d-block">0</h4>
          <div class="d-block">Snooze</div>
        </div>
      </div>
      <div class="card mb-4 bg-secondary text-white">
        <div class="card-body text-center">
          <h4 class="mb-0 d-block">0</h4>
          <div class="d-block">No Response</div>
        </div>
      </div>
    </div>
    <div class="card">
      <TableHead :name="title" :links="tableHeadLinks" />
      <div class="card-body">
        <div class="row">
          <div class="col text-center"><strong class="mr-1">Allowed Additions:</strong>100</div>
          <div class="col text-center">
            <strong class="mr-1">Added:</strong><a href="/events/2/attendees?added_by=15">0</a>
          </div>
          <div class="col text-center"><strong class="mr-1">Available:</strong>100</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TableHead from '@/components/_ui/TableHead.vue';

export default {
  name: 'EventAccessDetails',
  components: { TableHead },
  props: {
    id: { type: String, required: true },
    userId: { type: String, required: true },
  },
  data() {
    return {
      title: 'Event User: ',
      tableHeadLinks: [
        {
          name: 'Edit',
          routeName: 'E',
          class: '',
          icon: 'svg-inline--fa fa-edit fa-w-18 mr-1',
        },
      ],
    };
  },
  mounted() {
    (async () => {
      const item = await this.fetchItem({ id: this.id, userId: this.userId });
      if (item) this.title += item.user.name;
    })();
  },
  computed: {
    ...mapState('eventUser', {
      item: (state) => state.currentItem,
    }),
  },
  methods: {
    ...mapActions({ fetchItem: 'eventUser/fetchItem' }),
  },
};
</script>
