import { Action } from '@ngrx/store';
import { Themes } from '../../shared/utils/enums/themes.enums';

export enum SettingsActionTypes {
  setTheme = '[Settings/Theme] Set Theme'
}

// ========== Set Theme
export class SetTheme implements Action {
  readonly type = SettingsActionTypes.setTheme;

  constructor(public payload: Themes) {}
}

export type SettingsActions = SetTheme;
