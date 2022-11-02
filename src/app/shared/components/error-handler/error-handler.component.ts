import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss'],
})
export class ErrorHandlerComponent implements OnChanges {

  public message!: string;

  @Input() class!: string;
  @Input() errorMessage$!: Observable<any>;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.errorMessage$) {
      this.message = changes?.errorMessage$.currentValue;
    }
  }
}
