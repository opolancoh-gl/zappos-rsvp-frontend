import { DataProvider } from '@/services-layer';

export const namespaced = true;

export const state = {
  isAuthenticated: false,
};

export const mutations = {
  SET_AUTH_TOKEN(state, info) {
    window.localStorage.setItem('tkn', info);
    DataProvider.getInstance().login(info);
    state.isAuthenticated = true;
  },
  SIGN_OUT(state) {
    window.localStorage.setItem('tkn', '');
    state.isAuthenticated = false;
  },
};

export const actions = {
};

export const getters = {};

async function initializeAppStore(state) {
  window.$app.setLogInVerifier(() => DataProvider.getInstance().verifySession());
  const isAuthenticated = await DataProvider.getInstance().verifySession();
  state.isAuthenticated = isAuthenticated;
}

initializeAppStore(state);
