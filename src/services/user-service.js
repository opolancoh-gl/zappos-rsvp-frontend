import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const serviceRoute = '/users';

export default {
  async getAll(page, limit) {
    // [to be implemented] page, limit
    // return http.get(`${serviceRoute}`);
    const { data: items } = await http.get(`${serviceRoute}`);
    return items;
  },
  async getById(id) {
    const { data: item } = await http.get(`${serviceRoute}/${id}`);
    if (!item) throw new Error(`Couldn't find user with id '${id}'`);

    const { data: account } = await http.get(`accounts/${item.accountId}`);
    if (!account) throw new Error(`Couldn't find an account with id '${item.accountId}'`);
    item.account = account;

    return item;
  },
};
