import Vue from 'vue';
import Vuex from 'vuex';
import * as application from '@/store/modules/application';
// import * as user from '@/store/modules/user';
import { getStateManagement } from '@/store/modules/crud-module';

import { DataProvider } from './data-provider';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
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
  },
  modules: {
    application,
    account: getStateManagement('accounts'),
    user: getStateManagement('users'),
  },
});
