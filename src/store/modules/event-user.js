import DataService from '@/services/event-service';

export const namespaced = true;

export const state = {
  resourceName: 'Event Users',
  items: [],
  currentItem: {},
  remainingUsers: [],
  permissions: [
    { id: 'viewEvent', name: 'View Event' },
    { id: 'ownAttendees', name: 'Own Attendees' },
    { id: 'otherAttendees', name: 'Other Attendees' },
    { id: 'blasts', name: 'Blast Center' },
    { id: 'individualInvites', name: 'Individual Invites' },
  ],
};

export const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload;
  },
  SET_CURRENT_ITEM(state, payload) {
    state.currentItem = payload;
  },
  SET_REMAINING_USERS(state, payload) {
    state.remainingUsers = payload;
  },
};

export const actions = {
  async fetchItems({ commit }, id) {
    commit('SET_ITEMS', []);
    const result = await DataService.getUsers(id);
    const { data } = result.data;
    commit('SET_ITEMS', data);
    console.log('fetchItems', data);
  },
  async fetchRemainingUsers({ commit }, id) {
    const result = await DataService.getRemainingUsers(id);
    const { data } = result.data;
    commit('SET_REMAINING_USERS', data);
  },
  async fetchItem({ commit }, { id, userId }) {
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
};
