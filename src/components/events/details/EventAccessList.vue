<template>
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
                <i class="fas" :class="getPermissionIcon(item.permissions, permission.id)"></i>
                <small class="ml-2">{{ permission.name }}</small>
              </div>
            </div>
          </div>
          <!-- <div class="list-group-item">
            <div class="row">
              <div class="col-2 align-self-center">
                <a href="/events/1/users/2">User 1</a>
              </div>
              <div class="col align-self-center text-center">
                <i class="fas fa-check text-success"></i>
                <small class="ml-2">View Event</small>
              </div>
              <div class="col align-self-center text-center"></div>
              <div class="col align-self-center text-center"></div>
              <div class="col align-self-center text-center"></div>
              <div class="col align-self-center text-center"></div>
            </div>
          </div> -->
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
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TableHead from '@/components/_ui/TableHead.vue';
import TableBodyNoData from '@/components/_ui/TableBodyNoData.vue';

export default {
  name: 'EventAccessList',
  components: { TableHead, TableBodyNoData },
  props: {
    id: { type: [String, Number] },
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
    };
  },
  mounted() {
    this.fetchItems(this.id);
  },
  computed: {
    permissions() {
      return [
        { id: 'viewEvent', name: 'View Event' },
        { id: 'ownAttendees', name: 'Own Attendees' },
        { id: 'otherAttendees', name: 'Other Attendees' },
        { id: 'blasts', name: 'Blast Center' },
        { id: 'individualInvites', name: 'Individual Invites' },
      ];
    },
    ...mapState('eventUser', {
      items: (state) => state.items,
      itemsTotal: (state) => state.itemsTotal,
      resourceName: (state) => state.resourceName,
    }),
  },
  methods: {
    getPermissionIcon(itemPermissions, currentPermission) {
      return itemPermissions.indexOf(currentPermission) !== -1
        ? 'fa-check text-success'
        : 'fa-times text-danger';
    },
    ...mapActions({
      fetchItems: 'eventUser/fetchItems',
    }),
  },
};
</script>
