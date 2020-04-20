export default {
  props: {
    id: { type: [String, Number] },
  },
  data() {
    return {
      event: {
        name: '',
        email: '',
        startTime: '',
        location: '',
        endTime: '',
        attendeeLimit: 1,
        closeOptInPage: false,
        photoAPIKey: '',
      },
      confirmButtonName: 'Create Event',
      accounts: [],
    };
  },
  components: {},
  methods: {
    onSubmit() {
      console.log(this.event);
    },
  },
  created() {
    /*
    if (this.isEditMode) {
      this.item = store.getEvent(this.id);

      this.title = this.item.name;
      this.subTitle = 'Oversees 0 people across 0 brands';
      this.formTitle = 'Edit Event';
      this.confirmButtonName = 'Update';
    } else {
      this.title = 'Events';
      this.subTitle = `Total: ${store.users.length}`;
      this.formTitle = 'New Event';
      this.confirmButtonName = 'Create';
    }

    this.accounts.push({ name: 'Kuhn Inc', value: 1 });
    */
  },
  computed: {
    isEditMode() {
      return Object.prototype.hasOwnProperty.call(
        this.$route.params,
        'id',
      );
    },
  },
};
