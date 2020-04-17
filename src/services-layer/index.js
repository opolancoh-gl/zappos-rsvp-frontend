import UserDataActions from './user-data-actions';
import AccountDataActions from './account-data-actions';
import { DataProvider as BaseDataProvider } from './data-provider';

function prepareDataProvider(dataActionsContainer) {
  Object.keys(dataActionsContainer).reduce(
    (baseClass, methodName) => {
      baseClass.prototype[methodName] =
        dataActionsContainer[methodName];
      return baseClass;
    },
    BaseDataProvider,
  );
}

prepareDataProvider(UserDataActions);
prepareDataProvider(AccountDataActions);

export const DataProvider = BaseDataProvider;
