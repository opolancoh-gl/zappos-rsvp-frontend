import DataService from '@/services/event-service';

export const namespaced = true;

export const state = {
  resourceName: 'Event Users',
  items: [],
  itemsTotal: null,
  currentItem: {},
  remainingUsers: [],
};

export const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload;
  },
  SET_ITEMS_TOTAL(state, payload) {
    state.itemsTotal = payload;
  },
  SET_CURRENT_ITEM(state, payload) {
    state.currentItem = payload;
  },
  // [_review_] Create a local state strategy
  /* CREATE_ITEM(state, item) {
    state.items.push(item);
  },
  UPDATE_ITEM(state, item) {
    state.items = state.items.map((element) => (element.id === item.id ? item : element));
  }, */
  DELETE_ITEM(state, id) {
    state.items = state.items.filter((element) => element.id !== id);
  },
  SET_REMAINING_USERS(state, payload) {
    state.remainingUsers = payload;
  },
};

export const actions = {
  async fetchItems({ commit }, id) {
    const result = await DataService.getUsers(id);
    const { data } = result.data;
    commit('SET_ITEMS', data);
    commit('SET_ITEMS_TOTAL', data.length);
    // [_review_] x-total-count can be set from header or meta object inside response.data
    // commit('SET_ITEMS_TOTAL', parseInt(response.headers['x-total-count']));
  },
  async fetchRemainingUsers({ commit }, id) {
    const result = await DataService.getRemainingUsers(id);
    const { data } = result.data;
    commit('SET_REMAINING_USERS', data);
  },
  async fetchItem({ commit }, { id, userId }) {
    // [_review_] Create a local state strategy
    /* if (state.currentItem.id === id) {
      return state.currentItem;
    } */
    const result = await DataService.getUser(id, userId);
    const { data } = result.data;
    commit('SET_CURRENT_ITEM', data);
    return data;
  },
  async createOrUpdateItem({ commit }, { id, item }) {
    /* if (item.id) {
      const updateResult = await DataService.update(item);
      const { data } = updateResult.data;
      return data;
    } */

    const createResult = await DataService.createUser(id, item);
    const { data } = createResult.data;
    return data;
  },
  async deleteItem({ commit }, id) {
    await DataService.remove(id);
    commit('DELETE_ITEM', id);
  },
};

export const getters = {
  getById: (state) => (id) => {
    state.items.find((element) => element.id === id);
  },
};
