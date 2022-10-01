import { Component, OnDestroy, OnInit } from '@angular/core';
import { Themes } from './shared/utils/enums/themes.enums';
import { SettingsFacade } from './store/settings/settings.facade';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public theme!: Observable<Themes>;
  private unsubscribe$ = new Subject<boolean>();

  constructor(private settingsFacade: SettingsFacade) {}

  public ngOnInit(): void {
    this.getThemeFromLocalStorage();
    this.theme = this.getTheme();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  private getTheme(): Observable<Themes> {
    return this.settingsFacade.settingsTheme$.pipe(
      takeUntil(this.unsubscribe$),
      map((theme: Themes) => theme)
    );
  }

  private getThemeFromLocalStorage(): void {
    const theme = localStorage.getItem('theme');

    switch (theme) {
      case Themes.light:
        this.settingsFacade.setTheme(theme);
        break;
      case Themes.dark:
        this.settingsFacade.setTheme(theme);
        break;
      default:
        this.settingsFacade.setTheme(Themes.light);
        break;
    }
  }

}
