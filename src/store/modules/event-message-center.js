import DataService from '@/services/event-service';

export const namespaced = true;

export const state = {
  currentItem: {},
};

export const mutations = {
  SET_CURRENT_ITEM(state, payload) {
    state.currentItem = payload;
  },
};

export const actions = {
  async fetchItem({ commit }, id) {
    const result = await DataService.getMessage(id);
    const { data } = result.data;
    commit('SET_CURRENT_ITEM', data);
    return data;
  },
  async updateItem({ commit }, { id, item }) {
    const createResult = await DataService.updateMessage(id, item);
    const { data } = createResult.data;
    commit('SET_CURRENT_ITEM', data);
    return data;
  },
};
