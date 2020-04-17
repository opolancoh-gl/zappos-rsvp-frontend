/* eslint-disable no-useless-escape */
export const objectIdRegExp = /^[0-9a-fA-F]{24}$/;
export const integerGreaterThanZeroRegExp = /^[1-9]\d*$/;
export const integerGreaterOrEqualThanZeroRegExp = /^\d+$/; // \d equivalent to [0-9]
export const urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export const alphanumericSpecialRegExp = /^(?=.*[a-zA-Z0-9 _-])/; // Allows alphanumeric, space, hyphen, underscore, at least one characte
export const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const uuidRE = new RegExp('[0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12}');

export function isObjectId(value) {
  if (typeof value === 'undefined') return false;
  return this.objectIdRegExp.test(value);
}

export function isIntegerGreaterThanZero(value) {
  if (typeof value === 'undefined') return false;
  return this.integerGreaterThanZeroRegExp.test(value);
}

export function isIntegerGreaterOrEqualThanZero(value) {
  if (typeof value === 'undefined') return false;
  return this.integerGreaterOrEqualThanZeroRegExp.test(
    value,
  );
}

export function isUrl(value) {
  if (typeof value === 'undefined') return false;
  return this.urlRegExp.test(value);
}

export function isUUID(value) {
  if (typeof value === 'undefined') return false;
  return this.uuidRE.test(value);
}

export function isAlphanumericSpecial(value) {
  if (typeof value === 'undefined') return false;
  return this.alphanumericSpecialRegExp.test(value);
}

export function isEmail(value) {
  if (typeof value === 'undefined') return false;
  return this.emailRegExp.test(value);
}
