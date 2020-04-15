// import { DataProvider } from '../data-provider';
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
  DELETE_ITEM(state, id) {
    state.items = state.items.filter((element) => element.id !== id);
  },
};

export const actions = {
  fetchItems({ commit }) {
    return DataService.get()
      .then((response) => {
        commit('SET_ITEMS', response.data);
        commit('SET_ITEMS_TOTAL', response.data.length);
        // [_review_] x-total-count can be set from header or meta object inside response.data
        // commit('SET_ITEMS_TOTAL', parseInt(response.headers['x-total-count']));
      })
      .catch((error) => {
        // [_review_] Use a log system
        console.log('There was an error:', error.response);
      });
  },
  fetchItem({ commit, state, getters }, id) {
    return new Promise((resolve, reject) => {
      const item = getters.getById(id);

      if (item) {
        commit('SET_CURRENT_ITEM', item);
        resolve({ itemsTotal: state.itemsTotal });
      } else {
        DataService.getById(id)
          .then((response) => {
            commit('SET_CURRENT_ITEM', response.data);
            // [_review_] Create a service to get this value
            resolve({ itemsTotal: 0 });
          })
          .catch((error) => {
            console.log('There was an error:', error.response);
            reject(error);
          });
      }
    });
  },
  createItem({ commit }, item) {
    return DataService.create(item).then(() => {
      commit('CREATE_ITEM', item);
    });
  },
  updateItem({ commit }, item) {
    return DataService.update(item).then(() => {
      commit('UPDATE_ITEM', item);
    });
  },
  deleteItem({ commit }, id) {
    return DataService.remove(id).then(() => {
      commit('DELETE_ITEM', id);
    });
  },
};

export const getters = {
  getById: (state) => (id) => {
    state.items.find((element) => element.id === id);
  },
};
