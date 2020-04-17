import { singular } from 'pluralize';

import { DataProvider } from '../data-provider';

function titleCase(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

export function getStateManagement(
  resourceName,
  {
    dataProviderGetter,
    dataProviderUpdater,
    dataProviderCreator,
    dataProviderDeleter,
  } = {},
) {
  const capitalName = titleCase(resourceName);
  const sCapitalName = titleCase(singular(resourceName));
  let DATA_PROVIDER_GETTER = dataProviderGetter;
  let DATA_PROVIDER_UPDATER = dataProviderUpdater;
  let DATA_PROVIDER_CREATOR = dataProviderCreator;
  let DATA_PROVIDER_DELETER = dataProviderDeleter;
  if (!dataProviderGetter) {
    DATA_PROVIDER_GETTER = `get${capitalName}`;
  }
  if (!dataProviderUpdater) {
    DATA_PROVIDER_UPDATER = `update${sCapitalName}`;
  }
  if (!dataProviderCreator) {
    DATA_PROVIDER_CREATOR = `create${sCapitalName}`;
  }
  if (!dataProviderDeleter) {
    DATA_PROVIDER_DELETER = `delete${sCapitalName}`;
  }
  const MUTATION_NAME = `UPDATE_${resourceName.toUpperCase()}_LIST`;
  const GETTER_NAME = `get${capitalName}`;
  return {
    namespaced: true,
    state: {
      items: [],
    },
    mutations: {
      [MUTATION_NAME]: (state, items) => {
        state.items = items;
      },
    },
    actions: {
      async createItem(_state, dataObject) {
        const result = await DataProvider.getInstance()[DATA_PROVIDER_CREATOR](
          dataObject,
        );
        return result.data.data;
      },
      async getItemsFromAPi({ commit }) {
        const items = await DataProvider.getInstance()[DATA_PROVIDER_GETTER]();
        commit(MUTATION_NAME, items);
      },
      async updateItem(_state, dataObject) {
        const result = await DataProvider.getInstance()[DATA_PROVIDER_UPDATER](
          dataObject,
        );
        return result.data.data;
      },
      async deleteItem(_state, dataObject) {
        const result = await DataProvider.getInstance()[DATA_PROVIDER_DELETER](
          dataObject,
        );
        return result.data.data;
      },
    },

    getters: {
      [GETTER_NAME]: ({ items }) => items,
    },
  };
}
