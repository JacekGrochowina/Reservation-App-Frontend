import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { SettingsReducers } from './settings/settings.reducers';
import { CarsReducers } from './cars/cars.reducers';
import { AuthReducers } from './auth/auth.reducers';
import { GroupsReducers } from './groups/groups.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  auth: AuthReducers,
  settings: SettingsReducers,
  groups: GroupsReducers,
  drivers: CarsReducers,
};
