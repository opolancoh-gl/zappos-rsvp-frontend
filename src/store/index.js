import Vue from 'vue';
import Vuex from 'vuex';
import * as user from '@/store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    headerTitle: '',
    headerSubTitle: '',
  },
  mutations: {
    SET_HEADER_TITLE(state, { title, subTitle }) {
      state.headerTitle = title;
      state.headerSubTitle = subTitle;
    },
  },
  actions: {
    setHeaderTitle({ commit }, payload) {
      commit('SET_HEADER_TITLE', payload);
    },
  },
  modules: {
    user,
  },
});
