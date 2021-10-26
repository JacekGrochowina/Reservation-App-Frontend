import { Injectable } from '@angular/core';
import { Themes } from '../utils/enums/themes.enums';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private defaultTheme: Themes = Themes.light;

  setTheme(checked: boolean): void {
    localStorage.setItem('theme', checked ? Themes.dark : Themes.light);
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
