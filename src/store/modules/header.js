export const namespaced = true;

const HEADER_TITLE = 'Zappos';
const HEADER_SUBTITLE = '...';

export const state = {
  headerTitle: HEADER_TITLE,
  headerSubtitle: HEADER_SUBTITLE,
  headerSubmenuItems: [],
};

export const mutations = {
  SET_HEADER_TITLE(state, title) {
    state.headerTitle = title;
  },
  SET_HEADER_SUBTITLE(state, subtitle) {
    state.headerSubtitle = subtitle;
  },
  SET_HEADER_SUBMENU_ITEMS(state, headerSubmenuItems) {
    state.headerSubmenuItems = headerSubmenuItems;
  },
};

export const actions = {
  setHeaderTitle({ commit }, title) {
    commit('SET_HEADER_TITLE', title);
  },
  setHeaderSubtitle({ commit }, subtitle) {
    commit('SET_HEADER_SUBTITLE', subtitle);
  },
  setHeaderSeubmenuItems({ commit }, headerSubmenuItems) {
    commit('SET_HEADER_SUBMENU_ITEMS', headerSubmenuItems);
  },
  setInfo({ commit }, payload) {
    if (payload.title) {
      commit('SET_HEADER_TITLE', payload.title);
    }
    if (payload.subtitle) {
      commit('SET_HEADER_SUBTITLE', payload.subtitle);
    }
  },
};

export const getters = {
  headerTitle: ({ headerTitle }) => headerTitle,
  headerSubtitle: ({ headerSubtitle }) => headerSubtitle,
  headerSubmenuItems: ({ headerSubmenuItems }) => headerSubmenuItems,
};
