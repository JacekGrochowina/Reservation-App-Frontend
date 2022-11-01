import { SettingsState } from './settings/settings.state';
import { CarsState } from './cars/cars.state';
import { AuthState } from './auth/auth.state';

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
  drivers: CarsState;
}
