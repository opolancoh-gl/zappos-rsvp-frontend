import Vue from 'vue';
import Vuex from 'vuex';
import * as application from '@/store/modules/application';
import * as device from '@/store/modules/device';
import * as event from '@/store/modules/event';
import { getStateManagement } from '@/store/modules/crud-module';

import { DataProvider } from '@/services-layer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    headerName: '',
    headerData: {},
  },
  mutations: {
    SET_HEADER_NAME(state, payload) {
      state.headerName = payload;
    },
    SET_HEADER_DATA(state, payload) {
      state.headerData = payload;
    },
  },
  actions: {
    async addNewUser(_state, data) {
      const resp = await DataProvider.getInstance().post('/auth/sign-up', data);
      console.log(resp);
      return resp.data;
    },
    async logIn({ commit }, data) {
      try {
        const resp = await DataProvider.getInstance().post('/auth/login', data);
        if (resp.status === 200) {
          const info = resp.data.data;
          commit('application/SET_AUTH_TOKEN', info.token);
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    },
    setHeader({ commit, state }, { name, data }) {
      if (state.headerName !== name) commit('SET_HEADER_NAME', name);
      commit('SET_HEADER_DATA', data);
    },
  },
  modules: {
    application,
    device,
    event,
    account: getStateManagement('accounts'),
    user: getStateManagement('users'),
  },
});
