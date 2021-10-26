import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() drawer!: MatDrawer;
  @Output() mode = new EventEmitter<boolean>();

  checked!: boolean;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.checked = this.themeService.setSlideTooglerState();
  }

  toogleTheme(): void {
    this.checked = !this.checked;
    this.mode.emit(this.checked);
  }
}
