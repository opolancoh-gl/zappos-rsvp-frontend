import UserDataActions from './user-data-actions';
import AttendeeDataActions from './attendee-data-actions';
import AccountDataActions from './account-data-actions';
import OrganizationDataActions from './organization-data-actions';
import AwsDataActions from './aws-data-action';
import { DataProvider as BaseDataProvider } from './data-provider';

function prepareDataProvider(dataActionsContainer) {
  Object.keys(dataActionsContainer).reduce((baseClass, methodName) => {
    baseClass.prototype[methodName] = dataActionsContainer[methodName];
    return baseClass;
  }, BaseDataProvider);
}

prepareDataProvider(UserDataActions);
prepareDataProvider(AccountDataActions);
prepareDataProvider(AttendeeDataActions);
prepareDataProvider(OrganizationDataActions);
prepareDataProvider(AwsDataActions);

export const DataProvider = BaseDataProvider;
