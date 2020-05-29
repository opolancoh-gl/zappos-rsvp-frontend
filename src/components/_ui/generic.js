import Swal from 'sweetalert2';
import { singular, plural } from 'pluralize';
import { mapActions, mapState } from 'vuex';
import * as Validators from 'vuelidate/lib/validators';

function titleCase(str) {
  return str
    .split(/\s+/)
    .map(
      (x) =>
        x.substr(0, 1).toUpperCase() +
        x.substr(1).toLowerCase(),
    )
    .join(' ');
}

export function getComponentLogic(module, fields) {
  const modName = singular(module.toLowerCase());
  const ModName = titleCase(modName);
  const dataSourceNames = [];
  const storeSources = {};
  const dataSources = {};
  const dataSourcesInfo = Object.entries(fields)
    .filter(([_key, value]) => value.sourceData)
    .map(([_key, value]) => value.sourceData);
  if (dataSourcesInfo.length) {
    dataSourcesInfo.forEach((dsi) => {
      storeSources[plural(dsi)] = (store) => store[dsi].items;
      const getName = `get${titleCase(plural(dsi))}`;
      dataSources[getName] = `${dsi}/getItemsFromAPI`;
      dataSourceNames.push(getName);
    });
  }
  const validationEntries = Object.entries(fields).reduce(
    (others, [key, value]) => {
      if (!value.validators) {
        return undefined;
      }
      const defaultValidator = !!Validators[
        value.validators
      ];
      const validator = defaultValidator
        ? {
            [value.validators]:
              Validators[value.validators],
          }
        : value.validators;
      const res = [key, validator];
      others.push(res);
      return others;
    },
    [],
  );
  const validations = {
    formData: validationEntries
      ? Object.fromEntries(validationEntries)
      : {},
  };
  return {
    components: {},
    data() {
      return {
        title: ModName,
        fields,
        item: {},
        editing: false,
        formData: {},
      };
    },
    validations,
    props: {},
    created() {
      dataSourceNames.forEach(ds => this[ds]());
      this.getItems().then(() => {
        if (
          this.$route.params.id &&
          this.$route.params.id !== 'create'
        ) {
          this.item =
            this.items
              .filter(
                (item) => item.id === this.$route.params.id,
              )
              .pop() || {};
        }
      });
      this.updateHeaderInfo();
    },
    mounted() {
      if (this.$route.params.id === 'create') {
        window.jQuery('#createModal').modal({
          keyboard: false,
        });
      }
      window
        .jQuery('#createModal')
        .on('hidden.bs.modal', (_e) => {
          this.formData = {};
          if (this.$route.params.id) {
            this.$router.push({
              name: this.$route.name,
            });
          }
        });
    },
    computed: {
      ...mapState({
        items: (store) => store[modName].items,
        ...storeSources,
      }),
      isList() {
        return ['create', undefined].includes(
          this.$route.params.id,
        );
      },
    },
    watch: {
      items() {
        this.updateHeaderInfo();
      },
    },
    methods: {
      titleCase,
      getCollection(collectionName) {
        return this[plural(collectionName)];
      },
      getFieldTitle(field, value) {
        if (value && value.label) {
          return titleCase(value.label);
        }
        return titleCase(field);
      },
      setCurrentItem(item) {
        this.item = item;
        this.$router.push({
          name: this.$route.name,
          params: { id: item.id },
        });
      },
      openCreateDialog() {
        this.$v.$reset();
        this.editing = false;
        this.formData = {};
        this.$router.push({
          name: this.$route.name,
          params: {
            id: 'create',
          },
        });
        window.jQuery('#createModal').modal({
          keyboard: false,
        });
      },
      editItem(item) {
        this.editing = true;
        this.item = item;
        this.formData = item;
        window.jQuery('#createModal').modal({
          keyboard: false,
        });
      },
      onSubmit() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.saveOrUpdate();
        }
      },
      isValid(field) {
        return this.$v.formData[field].$anyError;
      },
      saveOrUpdate() {
        const data = this.formData;
        if (!this.editing) {
          this.createItem(data).then(() => {
            window.jQuery('#createModal').modal('hide');
            this.getItems();
          });
        } else {
          const newData = { ...this.item, ...data };
          this.updateItem(newData).then(() => {
            window.jQuery('#createModal').modal('hide');
            this.getItems();
          });
        }
      },
      updateHeaderInfo() {
        const count = (this.items || []).length;
        this.setHeader({
          name: 'HeaderDefault',
          data: {
            title: this.title,
            subtitle: count ? `${count} items` : '...',
          },
        });
      },
      async removeItem(items) {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0062cc',
          cancelButtonColor: '#b2b3b3',
          confirmButtonText: 'Yes, delete it!',
        });
        if (result.value) {
          await this.deleteItem(items);
          await this.getItems();
          Swal.fire(
            'Deleted!',
            'The element has been deleted.',
            'success',
          );
        }
      },
      ...mapActions({
        getItems: `${modName}/getItemsFromAPI`,
        createItem: `${modName}/createItem`,
        updateItem: `${modName}/updateItem`,
        deleteItem: `${modName}/deleteItem`,
        setHeader: 'setHeader',
        ...dataSources,
      }),
    },
  };
}

export default {
  getComponentLogic,
};
