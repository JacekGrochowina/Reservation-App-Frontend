import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-content-template',
  templateUrl: './page-content-template.component.html',
  styleUrls: ['./page-content-template.component.scss']
})
export class PageContentTemplateComponent {

  @Input() maxWidth!: number;

}
