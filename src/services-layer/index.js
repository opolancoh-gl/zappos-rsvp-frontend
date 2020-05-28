import UserDataActions from './user-data-actions';
import BlastDataActions from './blast-data-actions';
import AttendeeDataActions from './attendee-data-actions';
import AccountDataActions from './account-data-actions';
import OrganizationDataActions from './organization-data-actions';
import { DataProvider as BaseDataProvider, baseCrudGenerator } from './data-provider';

function prepareDataProvider(dataActionsContainer) {
  const baseCrud = baseCrudGenerator(dataActionsContainer);
  Object.keys(baseCrud).reduce((baseClass, methodName) => {
    baseClass.prototype[methodName] = baseCrud[methodName];
    return baseClass;
  }, BaseDataProvider);
}

prepareDataProvider(UserDataActions);
prepareDataProvider(BlastDataActions);
prepareDataProvider(AccountDataActions);
prepareDataProvider(AttendeeDataActions);
prepareDataProvider(OrganizationDataActions);

export const DataProvider = BaseDataProvider;
