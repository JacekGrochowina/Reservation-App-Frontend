import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { SettingsReducers } from './settings/settings.reducers';
import { DriversReducers } from './drivers/drivers.reducers';

export const appReducers: ActionReducerMap<AppState> = {
  // @ts-ignore
  settings: SettingsReducers,
  // @ts-ignore
  drivers: DriversReducers,
};
