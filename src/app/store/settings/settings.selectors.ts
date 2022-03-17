import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { SettingsState } from './settings.state';

const selectSettings = (state: AppState) => state.settings;

// ========== Selector Theme
export const selectTheme = createSelector(
  selectSettings,
  (state: SettingsState) => state.theme
);
