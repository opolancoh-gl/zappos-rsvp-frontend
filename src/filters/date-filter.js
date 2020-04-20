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
    name: 'datetimeAtShort',
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
  {
    // 2020-02-25T09:00:00
    name: 'toDatetimeLocal',
    f: (value) => {
      const date = new Date(value);
      const ten = (i) => (i < 10 ? '0' : '') + i;

      const YYYY = date.getFullYear();
      const MM = ten(date.getMonth() + 1);
      const DD = ten(date.getDate());
      const HH = ten(date.getHours());
      const II = ten(date.getMinutes());
      const SS = ten(date.getSeconds());
      return `${YYYY}-${MM}-${DD}T${HH}:${II}:${SS}`;
    },
  },
];
