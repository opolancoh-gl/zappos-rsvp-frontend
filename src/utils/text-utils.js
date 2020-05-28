// useful code to be added to Vue instance properties

export function titleCase(str) {
  return (
    str[0].toUpperCase() + str.substring(1).toLowerCase()
  );
}

export default {
  titleCase,
};
