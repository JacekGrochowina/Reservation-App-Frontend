import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-container-template',
  templateUrl: './page-container-template.component.html',
  styleUrls: ['./page-container-template.component.scss']
})
export class PageContainerTemplateComponent {

  @Input() maxWidth!: number;

  public styleFactory(): string {
    const style: string[] = [];

    style.push(this.maxWidth ? `max-width: ${this.maxWidth}px;` : '');

    return style.toString().replace(/,/, ' ');
  }

}
