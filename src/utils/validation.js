/* eslint-disable no-useless-escape */
// useful code to be added to Vue instance properties

export default Object.freeze({
  objectIdRegExp: /^[0-9a-fA-F]{24}$/,
  integerGreaterThanZeroRegExp: /^[1-9]\d*$/,
  integerGreaterOrEqualThanZeroRegExp: /^\d+$/, // \d equivalent to [0-9]
  urlRegExp: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  alphanumericSpecialRegExp: /^(?=.*[a-zA-Z0-9 _-])/, // Allows alphanumeric, space, hyphen, underscore, at least one character
  emailRegExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

  isObjectId(value) {
    if (typeof value === 'undefined') return false;
    return this.objectIdRegExp.test(value);
  },

  isIntegerGreaterThanZero(value) {
    if (typeof value === 'undefined') return false;
    return this.integerGreaterThanZeroRegExp.test(value);
  },

  isIntegerGreaterOrEqualThanZero(value) {
    if (typeof value === 'undefined') return false;
    return this.integerGreaterOrEqualThanZeroRegExp.test(value);
  },

  isUrl(value) {
    if (typeof value === 'undefined') return false;
    return this.urlRegExp.test(value);
  },

  isAlphanumericSpecial(value) {
    if (typeof value === 'undefined') return false;
    return this.alphanumericSpecialRegExp.test(value);
  },

  isEmail(value) {
    if (typeof value === 'undefined') return false;
    return this.emailRegExp.test(value);
  },
});
