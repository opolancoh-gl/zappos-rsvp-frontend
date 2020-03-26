<template>
  <div class="card">
    <div class="card-header">{{ formTitle }}</div>
    <div class="card-body">
      <form @submit.prevent="submitForm" class="needs-validation" novalidate>
        <div class="alert alert-danger" v-if="!isValidForm">
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
            v-model="inputName"
            :class="{ 'is-invalid': !isValidFormProperty('name') }"
          />
          <div class="invalid-feedback">
            {{ formErrors.name }}
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
            v-model="inputEmail"
            :class="{ 'is-invalid': !isValidFormProperty('email') }"
          />
          <div class="invalid-feedback">
            {{ formErrors.email }}
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
              v-model="inputPermCrudSystemUsers"
            />
            <label class="form-check-label" for="permCrudSystemUsers">
              Create | Edit | Delete : System Users
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input optional"
              type="checkbox"
              id="permCrudEvents"
              v-model="inputPermCrudEvents"
            />
            <label class="form-check-label" for="permCrudEvents">
              Create | Edit | Delete : Events
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permCrudEventUsers"
              v-model="inputPermCrudEventUsers"
            />
            <label class="form-check-label" for="permCrudEventUsers">
              Create | Edit | Delete : Event Users
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permImportEventUsers"
              v-model="inputPermImportEventUsers"
            />
            <label class="form-check-label" for="permImportEventUsers">
              Bulk import : Event Users
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permCrudDevices"
              v-model="inputPermCrudDevices"
            />
            <label class="form-check-label" for="permCrudDevices">
              Create | Edit | Delete : Devices
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permAssignDevices"
              v-model="inputPermAssignDevices"
            />
            <label class="form-check-label" for="permAssignDevices">
              Assign devices to events
            </label>
          </div>
        </div>
        <!-- user account -->
        <div class="form-group">
          <label for="userAccounts">Account *</label>
          <select
            id="userAccounts"
            class="form-control"
            v-model="inputAccount"
            :class="{ 'is-invalid': !isValidFormProperty('account') }"
          >
            <option value="" selected>Choose ...</option>
            <option v-for="account in accounts" :value="account.id" :key="account.id">
              {{ account.name }}
            </option>
          </select>
          <div class="invalid-feedback">
            {{ formErrors.account }}
          </div>
        </div>
        <!-- actions -->
        <button type="submit" class="btn btn-primary">{{ confirmButtonName }}</button>
        <router-link class="btn" :to="{ name: 'UserList' }">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formValidationMixin } from '@/mixins/form-validation-mixin';
import userService from '@/services/user-service';
import accountService from '@/services/account-service';
import validationUtils from '@/utils/validation-utils';

export default {
  name: 'UserCreateUpdate',
  mixins: [formValidationMixin],
  props: {
    id: { type: [String, Number] },
  },
  data() {
    return {
      formTitle: '',
      confirmButtonName: '',
      accounts: [],
      inputName: '',
      inputEmail: '',
      inputPermCrudSystemUsers: false,
      inputPermCrudEvents: false,
      inputPermCrudEventUsers: false,
      inputPermImportEventUsers: false,
      inputPermCrudDevices: false,
      inputPermAssignDevices: false,
      inputAccount: '',
    };
  },
  components: {},
  created() {
    if (this.isEditMode) {
      this.setFormUI({ formTitle: 'Edit User', confirmButtonName: 'Update' });
      (async () => {
        const { data } = await userService.getById(this.id);
        this.setFormItem(data);
        this.setHeaderTitle({ title: data.name, subTitle: '[to be implemented]' });
      })();
    } else {
      this.setFormUI({ formTitle: 'New User', confirmButtonName: 'Create' });
      // this.setFormItem(this.freshItem);
      (async () => {
        const itemsCount = await userService.getAllCount();
        this.setHeaderTitle({ title: 'Users', subTitle: `Total: ${itemsCount}` });
      })();
    }
  },
  computed: {
    isEditMode() {
      return typeof this.id !== 'undefined';
    },
  },
  methods: {
    submitForm() {
      this.formErrors = {};
      // validate name
      this.inputName = this.inputName.trim();
      if (this.inputName === '') this.formErrors.name = 'Name is required.';

      // validate email
      this.inputEmail = this.inputEmail.trim();
      if (!validationUtils.isEmail(this.inputEmail)) {
        this.formErrors.email = 'Please enter an email address.';
      }

      // validate account
      if (this.inputAccount === '') this.formErrors.account = 'Account is required.';

      // submit if valid
      if (this.isValidForm) {
        console.log('User created/updated!!');
        this.$router.push({ name: 'UserList' });
      }
    },
    setFormUI({ formTitle, confirmButtonName }) {
      this.formTitle = formTitle;
      this.confirmButtonName = confirmButtonName;
      // populate listbox account
      (async () => {
        const { data: accounts } = await accountService.getAll();
        this.accounts = accounts;
      })();
    },
    setFormItem(item) {
      // populate form item
      this.inputId = item.id;
      this.inputName = item.name;
      this.inputEmail = item.email;
      this.inputPermCrudSystemUsers = item.permCrudSystemUsers;
      this.inputPermCrudEvents = item.permCrudEvents;
      this.inputPermCrudEventUsers = item.permCrudEventUsers;
      this.inputPermImportEventUsers = item.permImportEventUsers;
      this.inputPermCrudDevices = item.permCrudDevices;
      this.inputPermAssignDevices = item.permAssignDevices;
      this.inputAccount = item.account.id;
    },
    ...mapActions(['setHeaderTitle']),
  },
};
</script>

<style scoped></style>
