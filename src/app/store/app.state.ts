import { SettingsState } from './settings/settings.state';
import { CarsState } from './cars/cars.state';

export interface AppState {
  settings: SettingsState;
  drivers: CarsState;
}
