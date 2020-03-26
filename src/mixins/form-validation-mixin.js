/* eslint-disable import/prefer-default-export */

export const formValidationMixin = {
  data() {
    return {
      formErrors: {},
    };
  },
  computed: {
    isValidForm() {
      return Object.keys(this.formErrors).length === 0;
    },
  },
  methods: {
    isValidFormProperty(propertyName) {
      if (typeof this.formErrors[propertyName] !== 'undefined') return false;
      return true;
    },
  },
};
