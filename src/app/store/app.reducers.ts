import { ActionReducer, ActionReducerMap, INIT, MetaReducer } from '@ngrx/store';
import { AppState } from './app.state';
import { SettingsReducers } from './settings/settings.reducers';
import { AuthReducers } from './auth/auth.reducers';
import { GroupsReducers } from './groups/groups.reducers';
import { ItemsReducers } from './items/items.reducers';
import { AuthActionTypes } from './auth/auth.actions';

export const appReducers: ActionReducerMap<AppState, any> = {
  auth: AuthReducers,
  settings: SettingsReducers,
  groups: GroupsReducers,
  items: ItemsReducers,
};

export const logout = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    if (action !== null && action.type === AuthActionTypes.logout) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer[] = [logout];
