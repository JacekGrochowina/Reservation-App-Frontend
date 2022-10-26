import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { SettingsReducers } from './settings/settings.reducers';
import { CarsReducers } from './cars/cars.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  settings: SettingsReducers,
  drivers: CarsReducers,
};
