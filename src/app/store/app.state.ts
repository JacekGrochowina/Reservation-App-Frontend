import { SettingsState } from './settings/settings.state';
import { DriversState } from './drivers/drivers.state';

export interface AppState {
  settings: SettingsState;
  drivers: DriversState;
}
