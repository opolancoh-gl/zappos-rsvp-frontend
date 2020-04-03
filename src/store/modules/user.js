import { DataProvider } from '../data-provider';

export const namespaced = true;

export const state = {
  items: [],
};

export const mutations = {
  UPDATE_USERS_LIST(state, users) {
    state.items = users;
  },
};

export const actions = {
  async updateItems({ commit }) {
    const users = await DataProvider.getInstance().getUsers();
    commit('UPDATE_USERS_LIST', users);
  },
};

export const getters = {
  getUsers({ items }) {
    return items;
  },
};
