import { Injectable } from '@angular/core';
import { Themes } from '../../shared/utils/enums/themes.enums';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  constructor(private overlayContainer: OverlayContainer) {}

  public setTheme(theme: Themes): void {
    localStorage.setItem('theme', theme);

    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses)
      .filter((item: string) => item.includes('-theme'));

    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }

    overlayContainerClasses.add(theme);
  }

}
