<template>
  <div>
    <div class="container my-4" v-if="!isList">
      <div class="card">
        <div class="card-header"> {{ title }} </div>
        <div class="card-body">
          <p v-for="(value, field) in fields" :key="field">
            <strong class="d-block">
              {{ getFieldTitle(field, value) }}:</strong
            >
            {{ item[field] }}
          </p>
          <a
            class="btn btn-light"
            href="#"
            @click.prevent="$router.go(-1)"
            >Back</a
          >
        </div>
      </div>
      <div class="card mt-4" v-if="0">
        <div class="card-header">People</div>
        <div class="list-group list-group-flush">
          <div class="list-group-item">
            <div class="row person-incomplete">
              <div class="col align-self-center">
                <div class="media">
                  <i
                    class="far fa-2x fa-user-circle ml-2 mr-4 text-muted align-self-center"
                  ></i>
                  <div class="media-body align-self-center">
                    <a href="/people/3">Oscar Granada</a
                    ><small class="d-block"
                      ><a href="/organizations/1"
                        >Sample Brand</a
                      ></small
                    >
                  </div>
                </div>
              </div>
              <div class="col align-self-center">
                <small class="d-block">User</small>Nobody
              </div>
              <div class="col align-self-center">
                <small class="d-block">Communication</small
                >Text Message
              </div>
              <div class="col text-right align-self-center">
                <div class="btn-group">
                  <a
                    class="btn btn-sm btn-outline-primary"
                    href="/people/3/edit"
                  >
                    <i class="fas fa-pencil-alt"></i>
                    Edit</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-4" v-if="isList">
      <div
        class="card-header d-flex justify-content-between"
      >
        <div class="align-self-center"> {{ title }} </div>
        <a
          class="btn btn-sm"
          href="#"
          @click.prevent="openCreateDialog()"
        >
          <i class="fas fa-plus"></i>
        </a>
      </div>
      <div class="list-group list-group-flush">
        <div
          class="list-group-item"
          v-for="items in items"
          :key="items.id"
        >
          <div class="row">
            <div class="col align-self-center">
              <div class="media">
                <i
                  class="fas fa-2x fa-circle-notch ml-2 mr-4 text-muted align-self-center"
                ></i>
                <div class="media-body align-self-center">
                  <a
                    href="#"
                    @click.prevent="setCurrentItem(items)"
                  >
                    {{ items.name }}
                  </a>
                </div>
              </div>
            </div>
            <div class="col text-right">
              <button
                class="btn btn-sm"
                @click.prevent="editItem(items)"
              >
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button
                class="btn btn-sm"
                @click.prevent="removeItem(items)"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="createModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="createModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div class="modal-dialog">
          <form
            id="new_attendee"
            novalidate="novalidate"
            accept-charset="UTF-8"
            class="simple_form new_attendee"
            @submit.prevent="onSubmit"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5
                  class="modal-title"
                  id="createModalLabel"
                >
                  <span v-if="!editing">Create</span>
                  <span v-if="editing">Update</span> {{ title }}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="card-body">
                  <div
                    class="row"
                    v-for="(value, field) in fields"
                    :key="field"
                  >
                    <div class="col">
                      <div
                        class="form-group string required attendee_person_name"
                      >
                        <label
                          for="attendee_person_attributes_name"
                          class="form-control-label string required"
                        >
                          {{ getFieldTitle(field, value) }}
                          <abbr title="required"
                            >*</abbr
                          ></label
                        ><input
                          v-if="value.type === String"
                          type="text"
                          v-model="formData[field]"
                          :data-field-name="field"
                          :placeholder="titleCase(field)"
                          class="form-control string required"
                          :class="{'is-invalid': isValid(field)}"
                        />
                        <select
                          v-if="value.type === 'select'"
                          v-model="formData[field]"
                          :data-field-name="field"
                          class="form-control string required"
                          :class="{'is-invalid': isValid(field)}"
                          >
                          <option value="" disabled selected> Choose an option... </option>
                          <option v-for="elm in getCollection(value.sourceData)" :value="elm[value.sourceKey]" :key="elm[value.sourceKey]"> {{ elm[value.sourceDisplay] }} </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <input
                  type="submit"
                  class="btn btn-primary"
                  value="Save changes"
                />
              </div>
            </div>
          </form>
        </div>
        <!-- End Modal Dialog -->
      </div>
      <!-- End Modal -->
    </div>
  </div>
</template>

<script>
import { getComponentLogic } from './_ui/generic';

const logic = getComponentLogic('organization', {
  name: {
    type: String,
    label: 'Organization Name',
    validators: 'required',
  },
  accountId: {
    type: 'select',
    label: 'Account',
    sourceData: 'account',
    validators: 'required',
    sourceKey: 'id',
    sourceDisplay: 'name',
  },
});
export default logic;
</script>
