import DataService from '@/services/device-service';

export const namespaced = true;

export const state = {
  resourceName: 'Devices',
  items: [],
  itemsTotal: null,
  currentItem: {},
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
  CREATE_ITEM(state, item) {
    state.items.push(item);
  },
  UPDATE_ITEM(state, item) {
    state.items = state.items.map((element) => (element.id === item.id ? item : element));
  },
};

export const actions = {
  async fetchItems({ commit }) {
    const result = await DataService.get();
    const { data } = result.data;
    commit('SET_ITEMS', data);
    commit('SET_ITEMS_TOTAL', data.length);
    // [_review_] x-total-count can be set from header or meta object inside response.data
    // commit('SET_ITEMS_TOTAL', parseInt(response.headers['x-total-count']));
  },
  async fetchItem({ commit, getters }, id) {
    const item = getters.getById(id);

    if (item) {
      commit('SET_CURRENT_ITEM', item);
      return item;
    }
    const result = await DataService.getById(id);
    const { data } = result.data;
    commit('SET_CURRENT_ITEM', data);
    return data;
  },
  async createOrUpdateItem({ commit }, item) {
    const freshItem = {};
    freshItem.label = item.label;
    if (item.event) freshItem.eventId = item.event.id;

    if (item.id) {
      freshItem.id = item.id;
      const createResult = await DataService.update(freshItem);
      const { data } = createResult.data;
      commit('UPDATE_ITEM', data);
      return data;
    }

    const updateteResult = await DataService.create(freshItem);
    const { data } = updateteResult.data;
    commit('CREATE_ITEM', data);
    return data;
  },
};

export const getters = {
  getById: (state) => (id) => {
    state.items.find((element) => element.id === id);
  },
};
