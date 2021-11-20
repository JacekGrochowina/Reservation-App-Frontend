import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Themes } from '../utils/enums/themes.enums';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private defaultTheme: Themes = Themes.light;

  constructor(private overlayContainer: OverlayContainer) {}

  setTheme(checked: boolean): void {
    const theme = checked ? Themes.dark : Themes.light;
    localStorage.setItem('theme', theme);
    this.setThemeOverlay(theme);
  }

  setThemeOverlay(theme: string): void {
    const overlayContainerClasses =
      this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter(
      (item: string) => item.includes('-theme')
    );
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
  }

  getTheme(): Themes {
    //@ts-ignore
    return localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : this.defaultTheme;
  }

  setSlideTooglerState(): boolean {
    return !localStorage.getItem('theme')
      ? this.defaultTheme === Themes.dark
      : localStorage.getItem('theme') === Themes.dark;
  }
}
