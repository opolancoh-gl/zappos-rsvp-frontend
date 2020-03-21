import userService from '@/services/user-service';

export const namespaced = true;

export const state = {
  users: [],
  usersCount: 0,
  user: {},
};

export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload;
  },
  SET_USERS_COUNT(state, payload) {
    state.usersCount = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  /* ADD_USER(state, item) {
    state.users.push(item);
  }, */
};

export const actions = {
  async fetchUsers({ commit }) {
    const items = await userService.getAll();
    commit('SET_USERS', items);
    commit('SET_USERS_COUNT', items.length);
  },
  async fetchUserById({ commit }, id) {
    const item = await userService.getById(id);
    commit('SET_USER', item);
  },
};

export const getters = {};
