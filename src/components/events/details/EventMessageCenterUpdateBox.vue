<template>
  <div class="card">
    <div class="card-header text-center">{{ headerTitle }}</div>
    <div class="card-body">
      <div class="form-group">
        <label :for="inputId">{{ inputLabel }}</label>
        <textarea
          :id="inputId"
          class="form-control"
          rows="3"
          :value="value"
          @input="$emit('input', $event.target.value)"
          :class="inputClass"
        >
        </textarea>
        <div class="invalid-feedback">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventMessageCenterUpdateBox',
  props: ['headerTitle', 'inputId', 'inputLabel', 'inputClass', 'errorMessage', 'value'],
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
