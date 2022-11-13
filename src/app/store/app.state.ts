import { SettingsState } from './settings/settings.state';
import { CarsState } from './cars/cars.state';
import { AuthState } from './auth/auth.state';
import { GroupsState } from './groups/groups.state';

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
  groups: GroupsState;
  drivers: CarsState;
}
