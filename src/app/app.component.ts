import { Component, OnInit } from '@angular/core';
import { Themes } from './shared/utils/enums/themes.enums';
import { SettingsFacade } from './store/settings/settings.facade';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public theme!: Observable<Themes>;
  private unsubscribe$ = new Subject<void>();

  constructor(private settingsService: SettingsFacade) {}

  public ngOnInit(): void {
    this.getThemeFromLocalStorage();
    this.theme = this.getTheme();
  }

  private getTheme(): Observable<Themes> {
    return this.settingsService.settingsTheme$.pipe(
      takeUntil(this.unsubscribe$),
      map((theme: Themes) => theme)
    );
  }

  private getThemeFromLocalStorage(): void {
    const theme = localStorage.getItem('theme');

    switch (theme) {
      case Themes.light:
        this.settingsService.setTheme(theme);
        break;
      case Themes.dark:
        this.settingsService.setTheme(theme);
        break;
      default:
        this.settingsService.setTheme(Themes.light);
        break;
    }
  }
}
