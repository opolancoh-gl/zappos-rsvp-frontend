<template>
  <div>
    <div class="card mb-4">
      <TableHead :name="headName" :links="headLinks" />
      <TableBody />
    </div>
  </div>
</template>

<script>
import TableHead from './TableHead.vue';
import TableBody from './TableBody.vue';

export default {
  name: 'Table',
  components: { TableHead, TableBody },
  props: {
    headName: { type: String },
    headLinks: { type: Array },
    items: { type: Array },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>
