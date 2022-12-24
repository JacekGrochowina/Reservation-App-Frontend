import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { getDayName } from '../../utils/extensions/getDayName';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ErrorHandlerComponent implements OnChanges {

  public message!: string;
  public detailsList!: unknown[];

  @Input() class!: string;
  @Input() isExpanded: boolean = false;
  @Input() errorMessage$!: Observable<unknown>;
  @Input() errorDetailsList$!: Observable<unknown>;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.errorMessage$) {
      this.message = changes?.errorMessage$.currentValue;
    }

    if (changes?.errorDetailsList$) {
      this.detailsList = changes?.errorDetailsList$.currentValue;
    }
  }

  public getDayName(date: string): string | null {
    if (!date) { return null; }
    return getDayName(new Date(date));
  }

}
