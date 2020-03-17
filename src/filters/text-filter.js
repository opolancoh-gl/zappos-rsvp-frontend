export default [
  {
    // text->Text
    name: 'capitalize',
    f: (value) => {
      if (!value) return '';
      const ret = value.toString();
      return ret.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  {
    // text->VUE
    name: 'upperCase',
    f: (value) => {
      if (!value) return '';
      const ret = value.toString();
      return ret.toUpperCase();
    },
  },
];
