import { Themes } from '../../shared/utils/enums/themes.enums';

export interface SettingsState {
  theme: Themes;
}

export const settingsInitialState: SettingsState = {
  theme: Themes.light,
};
