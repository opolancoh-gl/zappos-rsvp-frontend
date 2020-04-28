<template>
  <div>
    <div v-if="actionMessage" class="alert alert-success ">{{ actionMessage }}</div>
    <div class="row">
      <div class="col">
        <div class="card">
          <TableHead :name="title" :links="tableHeadLinks" />
          <TableBodyNoData v-if="items.length === 0" />
          <div v-else class="list-group list-group-flush">
            <div class="list-group-item" v-for="(item, index) in items" :key="index">
              <div class="row">
                <div class="col-2 align-self-center">
                  <router-link
                    :to="{ name: 'EventAccessDetails', params: { id, userId: item.user.id } }"
                  >
                    {{ item.user.name }}
                  </router-link>
                </div>
                <div
                  class="col align-self-center text-center"
                  v-for="permission in permissions"
                  :key="permission.id"
                >
                  <i
                    class="fas"
                    :class="[
                      item.permissions.includes(permission.id)
                        ? 'fa-check text-success'
                        : 'fa-times text-danger',
                    ]"
                  ></i>
                  <small class="ml-2">{{ permission.name }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card">
          <div class="card-header">Import List from Excel</div>
          <div class="card-body">
            <form
              class="simple_form new_event_user_import"
              id="new_event_user_import"
              novalidate="novalidate"
              enctype="multipart/form-data"
              action="/events/1/users/imports"
              accept-charset="UTF-8"
              method="post"
            >
              <div class="form-group file optional event_user_import_upload form-group-valid">
                <input
                  class="form-control-file is-valid file optional"
                  type="file"
                  name="event_user_import[upload]"
                  id="event_user_import_upload"
                />
              </div>
              <input
                type="submit"
                value="Save"
                class="btn btn-primary btn-block"
                data-confirm="Are you sure?"
                data-disable-with="Save"
              />
            </form>
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
  name: 'EventAccessList',
  components: { TableHead, TableBodyNoData },
  props: {
    id: { type: String, required: true },
    actionMessage: { type: String },
  },
  data() {
    return {
      title: 'Event Users',
      tableHeadLinks: [
        {
          name: 'Add',
          routeName: 'EventAccessCreateUpdate',
          class: 'btn-primary',
          icon: 'fa-plus',
        },
      ],
      /* items: [], */
    };
  },
  created() {
    this.fetchItems(this.id);
  },
  computed: {
    ...mapState('eventUser', {
      items: (state) => state.items,
      permissions: (state) => state.permissions,
    }),
  },
  methods: {
    /* async loadData() {
      this.items = await this.fetchItems(this.id);
    }, */
    getPermissionIcon(itemPermissions, currentPermission) {
      const icon = itemPermissions.includes(currentPermission)
        ? 'fa-check text-success'
        : 'fa-times text-danger';
      console.log('');
      console.log('itemPermissions', itemPermissions);
      console.log('currentPermission', currentPermission);
      console.log('icon', icon);
      return icon;
    },
    ...mapActions({
      fetchItems: 'eventUser/fetchItems',
    }),
  },
};
</script>
