import Header from '@/components/_ui/Header.vue';
import store from '@/store/data';

export default {
  props: {
    id: { type: [String, Number] },
  },
  data() {
    return {
      title: null,
      subTitle: null,
      formTitle: null,
      item: null,
      confirmButtonName: null,
      accounts: [],
    };
  },
  components: {
    Header,
  },
  created() {
    if (this.isEditMode) {
      this.item = store.getUser(this.id);

      this.title = this.item.name;
      this.subTitle = 'Oversees 0 people across 0 brands';
      this.formTitle = 'Edit User';
      this.confirmButtonName = 'Update';
    } else {
      this.title = 'Users';
      this.subTitle = `Total: ${store.users.length}`;
      this.formTitle = 'New User';
      this.confirmButtonName = 'Create';
    }

    this.accounts.push({ name: 'Kuhn Inc', value: 1 });
  },
  computed: {
    isEditMode() {
      return Object.prototype.hasOwnProperty.call(this.$route.params, 'id');
    },
  },
};
