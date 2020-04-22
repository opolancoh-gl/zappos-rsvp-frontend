<template>
  <div class="card">
    <div class="card-header">{{ formTitle }}</div>
    <div class="card-body">
      <form
        @submit.prevent="submitForm"
        class="needs-validation"
        novalidate
      >
        <div class="alert alert-danger" v-if="$v.$error">
          Please correct the following error(s):
        </div>
        <!-- user name -->
        <div class="form-group">
          <label for="userName">Name *</label>
          <input
            type="text"
            class="form-control"
            id="userName"
            placeholder="Name"
            v-model="editableUser.username"
            :class="{
              'is-invalid': $v.editableUser.username.$error,
            }"
          />
          <div
            v-if="$v.editableUser.username.$error"
            class="invalid-feedback"
          >
            Invalid user name
          </div>
        </div>
        <!-- user email -->
        <fieldset class="form-group">
          <label for="userEmail">Email *</label>
          <input
            type="email"
            class="form-control"
            id="userEmail"
            placeholder="Email"
            v-model="editableUser.email"
            :class="{
              'is-invalid': $v.editableUser.email.$error,
            }"
          />
          <div
            v-if="$v.editableUser.email.$error"
            class="invalid-feedback"
          >
            Invalid email
          </div>
        </fieldset>
        <!-- user permissions -->
        <div class="form-group">
          <label>Permissions</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permCrudSystemUsers"
              v-model="permissions.crud_system_users"
            />
            <label
              class="form-check-label"
              for="permCrudSystemUsers"
              >Create | Edit | Delete : System Users</label
            >
          </div>
          <div class="form-check">
            <input
              class="form-check-input optional"
              type="checkbox"
              id="permCrudEvents"
              v-model="permissions.crud_events"
            />
            <label
              class="form-check-label"
              for="permCrudEvents"
              >Create | Edit | Delete : Events</label
            >
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permCrudEventUsers"
              v-model="permissions.crud_event_users"
            />
            <label
              class="form-check-label"
              for="permCrudEventUsers"
              >Create | Edit | Delete : Event Users</label
            >
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permImportEventUsers"
              v-model="permissions.bulk_event_users"
            />
            <label
              class="form-check-label"
              for="permImportEventUsers"
              >Bulk import : Event Users</label
            >
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permCrudDevices"
              v-model="permissions.crud_devices"
            />
            <label
              class="form-check-label"
              for="permCrudDevices"
              >Create | Edit | Delete : Devices</label
            >
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permAssignDevices"
              v-model="permissions.assign_devices"
            />
            <label
              class="form-check-label"
              for="permAssignDevices"
              >Assign devices to events</label
            >
          </div>
        </div>
        <!-- user account -->
        <div class="form-group">
          <label for="userAccounts">Account *</label>
          <select
            id="userAccounts"
            class="form-control"
            v-model="editableUser.accountId"
            :class="{
              'is-invalid':
                $v.editableUser.accountId.$error,
            }"
          >
            <option disabled selected>Choose ...</option>
            <option
              v-for="account in accounts"
              :value="account.id"
              :key="account.id"
              >{{ account.name }}</option
            >
          </select>
          <div
            v-if="$v.editableUser.accountId.$error"
            class="invalid-feedback"
          >
            Invalid account
          </div>
        </div>
        <!-- actions -->
        <button type="submit" class="btn btn-primary">
          {{ currentFormAction }}
        </button>
        <router-link class="btn" :to="{ name: 'UserList' }"
          >Cancel</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserCreateUpdate',
  mixins: [],
  props: {
    id: { type: String },
  },
  data() {
    return {
      formTitle: '',
      currentFormAction: 'Create',
      permissions: {},
      editableUser: {},
      submitStatus: null,
    };
  },
  validations: {
    editableUser: {
      email: {
        email,
        required,
      },
      username: {
        required,
      },
      accountId: {
        required,
      },
    },
  },
  components: {},
  watch: {
    users(fetchedUsers) {
      this.updateEditableUser(fetchedUsers);
    },
  },
  mounted() {
    this.currentFormAction = this.isEditMode
      ? 'Update'
      : 'Create';
    this.formTitle = this.isEditMode
      ? 'Edit User'
      : 'New User';
    this.$store.dispatch('application/setHeaderInfo', {
      title: 'Users',
      subtitle: this.currentFormAction,
    });
    if (!this.users.length) {
      this.getUsers();
    } else {
      this.updateEditableUser(this.users);
    }
    this.getAccounts();
  },
  computed: {
    isEditMode() {
      return typeof this.id !== 'undefined';
    },
    ...mapGetters({
      accounts: 'account/getAccounts',
      users: 'user/getUsers',
    }),
  },
  methods: {
    updateEditableUser(fetchedUsers) {
      if (!this.isEditMode) {
        return;
      }
      const user = fetchedUsers
        .filter((val) => val.id === this.id)
        .pop();
      if (user) {
        this.editableUser = user;
        this.permissions = user.permissions.reduce(
          (acc, key) => {
            acc[key] = true;
            return acc;
          },
          {},
        );
      }
    },
    async submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        this.saveFormInfo()
          .then(() => {
            this.submitStatus = 'LOGGED_IN';
          })
          .catch(() => {
            this.submitStatus = 'ERROR';
          });
      }
    },
    async saveFormInfo() {
      const userInfo = {
        ...this.editableUser,
      };
      userInfo.permissions = Object.entries(
        this.permissions,
      )
        .filter(([_key, val]) => val)
        .map(([key, _val]) => key);
      if (this.isEditMode) {
        await this.updateUser(userInfo);
        this.$router.push({ name: 'UserList' });
      } else {
        userInfo.password = '$empty$';
        await this.createUser(userInfo);
        this.$router.push({ name: 'UserList' });
      }
    },
    ...mapActions({
      getAccounts: 'account/getItemsFromAPI',
      getUsers: 'user/getItemsFromAPI',
      updateUser: 'user/updateItem',
      createUser: 'user/createItem',
      deleteUser: 'user/deleteItem',
    }),
  },
};
</script>

<style scoped></style>
