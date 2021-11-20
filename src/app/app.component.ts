import { Component, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { Themes } from './shared/utils/enums/themes.enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  theme!: Themes;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.initToogleTheme();
  }

  getTheme($event: boolean) {
    this.theme = $event ? Themes.dark : Themes.light;
    this.themeService.setTheme($event);
  }

  private initToogleTheme() {
    this.theme = this.themeService.getTheme();
    this.themeService.setThemeOverlay(this.theme);
  }
}
