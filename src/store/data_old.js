/* eslint-disable radix */
/* eslint-disable object-curly-newline */
export default {
  users: [
    {
      id: 0,
      name: 'Adam Admin',
      email: 'admin@zappos.com',
      accountId: 100,
    },
    { id: 1, name: 'User 1', email: 'user1@zappos.com', accountId: 101 },
    { id: 2, name: 'User 2', email: 'user2@zappos.com', accountId: 102 },
    { id: 3, name: 'User 3', email: 'user3@zappos.com', accountId: 103 },
  ],
  accounts: [
    { id: 100, name: 'Kuhn Inc' },
    { id: 101, name: 'Ocean Inc' },
    { id: 102, name: 'Amazon Inc' },
    { id: 103, name: 'Gorilla Inc' },
  ],
  devices: [
    {
      id: 1,
      name: 'Device 1',
      description: 'Description for #1',
    },
    {
      id: 2,
      name: 'Device 2',
      description: 'Description for #2',
    },
    {
      id: 3,
      name: 'Device 3',
      description: 'Description for #3',
    },
  ],
  events: [
    {
      id: 1,
      name: 'Event 1',
      startDate: Date.parse('25 Feb 2020 14:00:00 GMT'),
      endDate: Date.parse('25 Feb 2020 17:30:00 GMT'),
      city: 'San Francisco',
      description: 'February 25, 2020 at 2:00pm - San Francisco',
    },
    {
      id: 2,
      name: 'Event 2',
      startDate: Date.parse('26 Feb 2020 10:00:00 GMT'),
      endDate: Date.parse('26 Feb 2020 13:50:00 GMT'),
      city: 'Bogotá',
      description: 'February 26, 2020 at 3:00pm - Bogotá',
    },
    {
      id: 3,
      name: 'Event 3',
      startDate: Date.parse('27 Feb 2020 16:00:00 GMT'),
      endDate: Date.parse('27 Feb 2020 18:00:00 GMT'),
      city: 'Medellín',
      description: 'February 27, 2020 at 4:00pm - Medellín',
    },
  ],
  getUser(id) {
    const user = this.users.find((item) => item.id === parseInt(id));
    if (!user) throw new Error(`Couldn't find user with id '${id}'`);
    user.account = this.getAccount(user.accountId);
    return user;
  },
  getAccount(id) {
    const account = this.accounts.find((item) => item.id === parseInt(id));
    if (!account) throw new Error(`Couldn't find account with id '${id}'`);
    return account;
  },
  getEvent(id) {
    const event = this.events.find((item) => item.id === parseInt(id));
    if (!event) throw new Error(`Couldn't find event with id '${id}'`);
    return event;
  },
};
