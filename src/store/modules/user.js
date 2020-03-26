export const namespaced = true;

export const state = {
  usersCount: 0,
};

export const mutations = {
  SET_USERS_COUNT(state, payload) {
    state.usersCount = payload;
  },
};

export const actions = {
  async setUsersCoount({ commit }, value) {
    commit('SET_USERS_COUNT', value);
  },
};

export const getters = {};
