// useful code to be added to Vue instance properties

export default Object.freeze({
  reverseText(text) {
    return text
      .split('')
      .reverse()
      .join('');
  },
});
