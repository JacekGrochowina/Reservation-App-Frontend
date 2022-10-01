import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-fluid-loading',
  templateUrl: './fluid-loading.component.html',
  styleUrls: ['./fluid-loading.component.scss'],
})
export class FluidLoadingComponent {

  @Input() height!: number;
  @Input() text!: string;
  @Input() diameter = 70;

  public styleFactory(): string {
    const style: string[] = [];

    style.push(this.height ? `height: ${this.height}px` : '');

    return style.toString().replace(/,/, ' ');
  }

  public isTextVisible(): boolean {
    return !_.isNull(this.text);
  }

}
