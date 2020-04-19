import { DataProvider } from '@/services-layer';

const HEADER_TITLE = 'Zappos';
const HEADER_SUBTITLE = '...';

export const namespaced = true;

export const state = {
  headerTitle: HEADER_TITLE,
  headerSubtitle: HEADER_SUBTITLE,
  isAuthenticated: false,
};

export const mutations = {
  SET_HEADER_TITLE(state, title) {
    state.headerTitle = title;
  },
  SET_HEADER_SUBTITLE(state, subtitle) {
    state.headerSubtitle = subtitle;
  },
  SET_AUTH_TOKEN(state, info) {
    window.localStorage.setItem('tkn', info);
    DataProvider.getInstance().login(info);
    state.isAuthenticated = true;
  },
  SIGN_OUT(state) {
    window.localStorage.setItem('tkn', '');
    state.isAuthenticated = false;
    state.headerTitle = HEADER_TITLE;
    state.headerSubtitle = HEADER_SUBTITLE;
  },
};

export const actions = {
  setHeaderTitle({ commit }, title) {
    commit('SET_HEADER_TITLE', title);
  },
  setHeaderSubtitle({ commit }, subtitle) {
    commit('SET_HEADER_SUBTITLE', subtitle);
  },
  setHeaderInfo({ commit }, payload) {
    if (payload.title) {
      commit('SET_HEADER_TITLE', payload.title);
    }
    if (payload.subtitle) {
      commit('SET_HEADER_SUBTITLE', payload.subtitle);
    }
  },
};

export const getters = {};

async function initializeAppStore(state) {
  window.$app.setLogInVerifier(() => DataProvider.getInstance().verifySession());
  state.isAuthenticated = await DataProvider.getInstance().verifySession();
}

initializeAppStore(state);
