import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

@Component({
  selector: 'app-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.scss'],
})
export class ButtonLoadingComponent {

  @Input() type = 'submit';
  @Input() text: string | undefined = 'Zatwierdź';
  @Input() class = 'ml-2';
  @Input() disabled: boolean | null = true;
  @Input() isLoading: boolean | null = true;
  @Input() color: ThemePalette = 'primary';
  @Input() diameter = 20;
  @Input() diameterColor: ThemePalette = 'primary';
  @Input() action!: () => void;

}
