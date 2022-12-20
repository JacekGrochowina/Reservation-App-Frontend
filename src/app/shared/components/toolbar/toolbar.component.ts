import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SettingsFacade } from '../../../store/settings/settings.facade';
import { Themes } from '../../utils/enums/themes.enums';
import { AuthFacade } from '../../../store/auth/auth.facade';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  @Input() drawer!: MatDrawer;
  public checked!: boolean;

  constructor(
    private settingsService: SettingsFacade,
    private authFacade: AuthFacade,
  ) {}

  public ngOnInit(): void {
    this.checked = this.getSlideToogleStateFromLocalStorage();

    const isSidenavOpen = localStorage.getItem('isSidenavOpen') === 'true';
    this.drawer.opened = isSidenavOpen;
  }

  public toggleSidenav(): void {
    const toogler = !this.drawer.opened;
    this.drawer.opened = toogler;
    localStorage.setItem('isSidenavOpen', String(toogler));
  }

  public changeTheme(): void {
    this.slideToogle();
    const theme = this.setTheme(this.checked);
    this.settingsService.setTheme(theme);
  }

  public logout(): void {
    this.authFacade.logout();
  }

  private slideToogle(): void {
    this.checked = !this.checked;
  }

  private setTheme(checked: boolean): Themes {
    return checked ? Themes.dark : Themes.light;
  }

  private getSlideToogleStateFromLocalStorage(): boolean {
    const theme = localStorage.getItem('theme');

    switch (theme) {
      case Themes.light:
        return false;
        break;
      case Themes.dark:
        return true;
        break;
      default:
        return false;
        break;
    }
  }

}
