<template>
  <div class="card">
    <div class="card-header">{{ this.formTitle }}</div>
    <div class="card-body">
      <form @submit.prevent="submitForm" novalidate>
        <div class="alert alert-danger" v-if="$v.$error">
          Please correct the following error(s):
        </div>
        <!-- User List -->
        <div class="form-group">
          <label for="event">User * </label>
          <select class="form-control" id="userList" v-model="userList">
            <option value="" selected>Create New User</option>
            <option v-for="user in remainingUsers" :value="user.id" :key="user.id">
              {{ user.name }} - {{ user.id }}
            </option>
          </select>
        </div>
        <!-- User Name -->
        <div class="form-group">
          <label for="userName">
            Name *
          </label>
          <input
            class="form-control"
            type="text"
            id="userName"
            v-model="userName"
            :class="{ 'is-invalid': $v.userName.$error }"
            :disabled="userSelected"
          />
          <div class="invalid-feedback">
            {{ validationMessage.requiredField }}
          </div>
        </div>
        <!-- User Email -->
        <div class="form-group">
          <label for="userEmail">
            Email *
          </label>
          <input
            class="form-control"
            type="email"
            id="userEmail"
            v-model="userEmail"
            :class="{ 'is-invalid': $v.userEmail.$error }"
            :disabled="userSelected"
          />
          <div class="invalid-feedback">
            {{ validationMessage.email }}
          </div>
        </div>
        <!-- User Permissions -->
        <div class="form-group">
          <label>Permissions</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permViewEvent"
              v-model="permViewEvent"
            />
            <label class="form-check-label" for="permViewEvent">
              View Event
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permOwnAttendees"
              v-model="permOwnAttendees"
            />
            <label class="form-check-label" for="permOwnAttendees">
              Add/Edit Own Attendees
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permOtherAttendees"
              v-model="permOtherAttendees"
            />
            <label class="form-check-label" for="permOtherAttendees">
              Add/Edit Other Attendees
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="permBlasts" v-model="permBlasts" />
            <label class="form-check-label" for="permBlasts">
              Add/Edit Blasts
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="permIndividualInvites"
              v-model="permIndividualInvites"
            />
            <label class="form-check-label" for="permIndividualInvites">
              Send Individual Invites
            </label>
          </div>
        </div>
        <div class="form-group" v-if="permOwnAttendees || permOtherAttendees">
          <label class="form-control-label" for="attendeeLimit">
            Attendee Limit
          </label>
          <input
            class="form-control"
            type="number"
            min="0"
            step="1"
            id="attendeeLimit"
            v-model="attendeeLimit"
            :class="{ 'is-invalid': $v.attendeeLimit.$error }"
          />
          <div class="invalid-feedback">
            {{ validationMessage.number }}
          </div>
          <small class="form-text text-muted">
            If user is allowed to add attendees, how many can they add?
          </small>
        </div>
        <!-- actions -->
        <button type="submit" class="btn btn-primary">{{ confirmButtonText }}</button>
        <router-link class="btn" :to="{ name: 'EventAccessList' }">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, email, numeric } from 'vuelidate/lib/validators';

export default {
  name: 'EventAccessCreateUpdate',
  props: {
    id: { type: String, required: true },
    userId: { type: String },
  },
  data() {
    return {
      formTitle: '',
      confirmButtonText: '',
      userList: '',
      userName: '',
      userEmail: '',
      permViewEvent: true,
      permOwnAttendees: false,
      permOtherAttendees: false,
      permBlasts: false,
      permIndividualInvites: false,
      attendeeLimit: '',
      item: null,
    };
  },
  validations() {
    const rules = {};
    if (this.userList) {
      rules.userList = { required };
      rules.userName = {};
      rules.userEmail = {};
    } else {
      rules.userList = {};
      rules.userName = { required };
      rules.userEmail = { required, email };
    }

    if (this.attendeeLimitEnabled) rules.attendeeLimit = { required, numeric };
    else rules.attendeeLimit = {};

    return rules;
  },
  mounted() {
    this.fetchRemainingUsers(this.id);
    if (this.isEditMode) {
      this.formTitle = 'Edit Event';
      this.confirmButtonText = 'Update';

      (async () => {
        try {
          // [_review_] Define what to do when id is invalid or not exists
          this.item = await this.fetchItem(this.id);

          this.formTitle = `Edit ${this.item.name}`;
          this.name = this.item.name;
          this.contactEmail = this.item.contactEmail;
          this.startTime = this.$options.filters.toDatetimeLocal(this.item.startTime);
          this.endTime = this.$options.filters.toDatetimeLocal(this.item.endTime);
          this.location = this.item.location;
        } catch (error) {
          console.log('[UpdateItem - mounted()] There was a problem processing your item.', error);
        }
      })();
    } else {
      this.formTitle = 'Add Event User';
      this.confirmButtonText = 'Create';
      // [_review_] Improve the way to set itemsTotal
      /* this.$store
        .dispatch('event/fetchItems')
        .then(() => {
          this.setCurrentHeader(`Total: ${this.itemsTotal}`);
        })
        .catch((error) => {
          console.log('[CreateItem - mounted()] There was a problem processing your item.', error);
        }); */
    }
  },
  computed: {
    isEditMode() {
      return typeof this.userId !== 'undefined';
    },
    validationMessage() {
      return {
        requiredField: 'This field is required.',
        email: 'Please enter a valid email address.',
        number: 'Please enter a valid number.',
      };
    },
    userSelected() {
      return this.userList !== '';
    },
    attendeeLimitEnabled() {
      return this.permOwnAttendees || this.permOtherAttendees;
    },
    selectedPermissions() {
      const permissions = [];
      if (this.permViewEvent) permissions.push('viewEvent');
      if (this.permOwnAttendees) permissions.push('ownAttendees');
      if (this.permOtherAttendees) permissions.push('otherAttendees');
      if (this.permBlasts) permissions.push('blasts');
      if (this.permIndividualInvites) permissions.push('individualInvites');
      return permissions;
    },
    ...mapState('eventUser', {
      remainingUsers: (state) => state.remainingUsers,
      userPermissions: (state) => state.userPermissions,
    }),
  },
  methods: {
    submitForm() {
      this.$v.$touch();

      // submit if valid
      if (!this.$v.$invalid) {
        if (!this.item) this.item = {};

        this.item.permissions = this.selectedPermissions;
        if (this.attendeeLimitEnabled) this.item.attendeeLimit = this.attendeeLimit;

        if (this.userList) {
          this.item.user = { id: this.userList };
        } else {
          this.item.user = { id: this.userEmail, name: this.userName };
        }

        this.createOrUpdateItem({ id: this.id, item: this.item });
      }
    },
    createOrUpdateItem(item) {
      const keyMessage = item.userId ? 'updated' : 'added';
      this.$store
        .dispatch('eventUser/createOrUpdateItem', item)
        .then((data) => {
          this.$router.push({
            name: 'EventAccessList',
            params: { id: data.id, actionMessage: `Event User successfully ${keyMessage}!` },
          });
        })
        .catch((error) => {
          console.log('[createOrUpdateItem] There was a problem processing your item.', error);
        });
    },
    ...mapActions({
      /* fetchItem: 'event/fetchItem', */
      fetchRemainingUsers: 'eventUser/fetchRemainingUsers',
    }),
  },
};
</script>
