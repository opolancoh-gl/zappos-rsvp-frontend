export default [
  {
    // 2/25/2020, 9:00:00 AM
    name: 'date',
    f: (value) => {
      const date = new Date(value);
      return date.toLocaleString(['en-US']);
    },
  },
  {
    // 02/25/2020
    name: 'dateOnly',
    f: (value) => {
      const date = new Date(value);
      return date.toLocaleString(['en-US'], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
  },
  {
    // Feb 25, 2020
    name: 'dateOnlyShort',
    f: (value) => {
      const date = new Date(value);
      return date.toLocaleString(['en-US'], {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    },
  },
  {
    // 09:00 AM
    name: 'timeOnly',
    f: (value) => {
      const date = new Date(value);
      return date.toLocaleString(['en-US'], {
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
  {
    // Feb 25, 2020 at 09:00 AM
    name: 'dateTimeAt',
    f: (value) => {
      const date = new Date(value);
      const dateOnly = date.toLocaleString(['en-US'], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const timeOnly = date.toLocaleString(['en-US'], {
        hour: '2-digit',
        minute: '2-digit',
      });
      return `${dateOnly} at ${timeOnly}`;
    },
  },
  {
    // Feb 25, 2020 at 09:00 AM
    name: 'dateTimeAtShort',
    f: (value) => {
      const date = new Date(value);
      const dateOnly = date.toLocaleString(['en-US'], {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const timeOnly = date.toLocaleString(['en-US'], {
        hour: '2-digit',
        minute: '2-digit',
      });
      return `${dateOnly} at ${timeOnly}`;
    },
  },
];
