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
  mode!: boolean;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme = this.themeService.getTheme();
  }

  setTheme($event: boolean) {
    this.theme = $event ? Themes.dark : Themes.light;
    this.themeService.setTheme($event);
  }
}
