import { singular } from 'pluralize';
import { DataProvider } from '@/services-layer';
import { titleCase } from '@/utils/text-utils';

/**
 *
 * @param {String} resourceName name of resource to be generated as module
 * @param {Any} param properties to create the data state manager
 */
export function getStateManagement(
  resourceName,
  {
    dataProviderGetter,
    dataProviderGetterOne,
    dataProviderUpdater,
    dataProviderCreator,
    dataProviderDeleter,
  } = {},
) {
  const capitalName = titleCase(resourceName);
  const sCapitalName = titleCase(singular(resourceName));
  /** @type {String} name of module data getter */
  let DATA_PROVIDER_GETTER = dataProviderGetter;
  /** @type {String} name of module data getter for one item */
  let DATA_PROVIDER_GETTER_ONE = dataProviderGetterOne;
  /** @type {String} name of module data updater */
  let DATA_PROVIDER_UPDATER = dataProviderUpdater;
  /** @type {String} name of module data creator */
  let DATA_PROVIDER_CREATOR = dataProviderCreator;
  /** @type {String} name of module data deleter */
  let DATA_PROVIDER_DELETER = dataProviderDeleter;
  // Generates custom name if those are not provided.
  if (!dataProviderGetter) {
    DATA_PROVIDER_GETTER = `get${capitalName}`;
  }
  if (!dataProviderGetter) {
    DATA_PROVIDER_GETTER_ONE = `get${sCapitalName}`;
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
  const MUTATION_LIST_NAME = `UPDATE_${resourceName.toUpperCase()}_LIST`;
  const MUTATION_ITEM_NAME = `UPDATE_${resourceName.toUpperCase()}_ITEM`;
  const GETTER_NAME = `get${capitalName}`;
  return {
    namespaced: true,
    state: {
      items: [],
    },
    mutations: {
      [MUTATION_LIST_NAME]: (state, items) => {
        state.items = items;
      },
      [MUTATION_ITEM_NAME]: (state, item) => {
        state.item = item;
      },
    },
    actions: {
      async createItem(_state, dataObject) {
        const result = await DataProvider.getInstance()[DATA_PROVIDER_CREATOR](
          dataObject,
        );
        return result.data.data;
      },
      async getItemsFromAPI({ commit }, query) {
        const items = await DataProvider.getInstance()[DATA_PROVIDER_GETTER](query);
        commit(MUTATION_LIST_NAME, items);
      },
      async getItemFromAPI({ commit }, id) {
        const item = await DataProvider.getInstance()[DATA_PROVIDER_GETTER_ONE](id);
        commit(MUTATION_ITEM_NAME, item);
        return item;
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
