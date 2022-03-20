import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fluid-loading',
  templateUrl: './fluid-loading.component.html',
  styleUrls: ['./fluid-loading.component.scss'],
})
export class FluidLoadingComponent {

  @Input() height!: number;

  public styleFactory(): string {
    const style: string[] = [];

    style.push(this.height ? `height: ${this.height}px` : '');

    return style.toString().replace(/,/, ' ');
  }

}
