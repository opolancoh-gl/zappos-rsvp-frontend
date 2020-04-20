// useful code to be added to Vue instance properties
import lget from 'lodash.get';

export function get(storageContainer, valuePath) {
  let res = '';
  try {
    res = lget(storageContainer.store.state, valuePath);
    if (!res) res = '';
  } catch (error) {
    res = '';
  }
  return res;
}

export function replaceStateInfo(storageContainer) {
  return (value) => {
    if (!value) return value;
    let res = value;
    const re = new RegExp('\\$\\[[^\\]]+\\]', 'g');
    const val = value.match(re);
    if (val) {
      res = val.reduce((oldStr, part) => {
        const valuePath = part.substring(2, part.length - 1);
        const res = get(storageContainer, valuePath);
        return oldStr.replace(part, res);
      }, value);
    }
    return res;
  }
}

export default Object.freeze({
  reverseText(text) {
    return text
      .split('')
      .reverse()
      .join('');
  },
});
