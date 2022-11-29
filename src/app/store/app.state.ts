import { SettingsState } from './settings/settings.state';
import { AuthState } from './auth/auth.state';
import { GroupsState } from './groups/groups.state';
import { ItemsState } from './items/items.state';
import { ReservationsState } from './reservations/reservations.state';
import { DictionariesState } from './dictionaries/dictionaries.state';

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
  groups: GroupsState;
  items: ItemsState;
  reservations: ReservationsState;
  dictionaries: DictionariesState;
}
