import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Themes } from '../../shared/utils/enums/themes.enums';
import { SetTheme } from './settings.actions';
import { selectTheme } from './settings.selectors';

@Injectable()
export class SettingsFacade {

  // ========== Selector Theme
  settingsTheme$ = this.store.select(selectTheme);

  constructor(private store: Store<AppState>) {}

  public setTheme(theme: Themes): void {
    this.store.dispatch(new SetTheme(theme));
  }

}
