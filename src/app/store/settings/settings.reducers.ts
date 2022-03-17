import { settingsInitialState, SettingsState } from './settings.state';
import { SettingsActions, SettingsActionTypes } from './settings.actions';

export function SettingsReducers(
  state = settingsInitialState,
  action: SettingsActions
): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.setTheme: {
      return {
        ...state,
        theme: action.payload
      };
    }

    default:
      return {
        ...state,
      };
  }
}
