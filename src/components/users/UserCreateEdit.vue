<template>
  <div>
    <SubHeader :title="title" :subTitle="subTitle" />
    <div class="container my-4">
      <div class="card">
        <div class="card-header">New User</div>
        <div class="card-body">
          <form class="simple_form new_user" id="new_user">
            <div class="form-group string required user_name">
              <label class="form-control-label string required" for="user_name">
                Name
                <abbr title="required">*</abbr>
              </label>
              <input class="form-control string required" type="text" id="user_name" />
            </div>
            <div class="form-group email optional user_email">
              <label class="form-control-label email optional" for="user_email">Email</label>
              <input class="form-control string email optional" type="email" id="user_email" />
            </div>
            <fieldset class="form-group boolean optional user_perm_crud_system_users">
              <div class="form-check">
                <input
                  class="form-check-input boolean optional"
                  type="checkbox"
                  id="user_perm_crud_system_users"
                />
                <label class="form-check-label boolean optional" for="user_perm_crud_system_users"
                  >Create / edit / delete system users</label
                >
              </div>
            </fieldset>
            <fieldset class="form-group boolean optional user_perm_crud_events">
              <div class="form-check">
                <input
                  class="form-check-input boolean optional"
                  type="checkbox"
                  id="user_perm_crud_events"
                />
                <label class="form-check-label boolean optional" for="user_perm_crud_events"
                  >Create / edit / delete events</label
                >
              </div>
            </fieldset>
            <fieldset class="form-group boolean optional user_perm_crud_event_users">
              <div class="form-check">
                <input
                  class="form-check-input boolean optional"
                  type="checkbox"
                  id="user_perm_crud_event_users"
                />
                <label class="form-check-label boolean optional" for="user_perm_crud_event_users"
                  >Create / edit / delete event users</label
                >
              </div>
            </fieldset>
            <fieldset class="form-group boolean optional user_perm_import_event_users">
              <div class="form-check">
                <input
                  class="form-check-input boolean optional"
                  type="checkbox"
                  id="user_perm_import_event_users"
                />
                <label class="form-check-label boolean optional" for="user_perm_import_event_users"
                  >Bulk import event users</label
                >
              </div>
            </fieldset>
            <fieldset class="form-group boolean optional user_perm_crud_devices">
              <div class="form-check">
                <input
                  class="form-check-input boolean optional"
                  type="checkbox"
                  id="user_perm_crud_devices"
                />
                <label class="form-check-label boolean optional" for="user_perm_crud_devices"
                  >Create / edit / delete devices</label
                >
              </div>
            </fieldset>
            <fieldset class="form-group boolean optional user_perm_assign_devices">
              <div class="form-check">
                <input
                  class="form-check-input boolean optional"
                  type="checkbox"
                  id="user_perm_assign_devices"
                />
                <label class="form-check-label boolean optional" for="user_perm_assign_devices"
                  >Assign devices to events</label
                >
              </div>
            </fieldset>
            <div class="form-group select optional user_account">
              <label class="form-control-label select optional" for="user_account_id"
                >Account</label
              >
              <select class="form-control select optional" id="user_account_id">
                <option v-for="item in accounts" :value="item.value" :key="item.value">{{
                  item.name
                }}</option>
              </select>
            </div>
            <button class="btn btn-primary">Save</button>
            <router-link class="btn" to="/users">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/_ui/sub-header/SubHeader.vue';

export default {
  name: 'UserCreateEdit',
  data() {
    return {
      title: 'Users',
      subTitle: 'Total: 3',
      accounts: [],
    };
  },
  components: {
    SubHeader,
  },
  mounted() {
    /* axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response)); */
    this.accounts.push({ name: 'Kuhn Inc', value: 1 });
  },
};
</script>

<style scoped></style>
