import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-table-error',
  templateUrl: './table-error.component.html',
  styleUrls: ['./table-error.component.scss']
})
export class TableErrorComponent implements OnInit, OnDestroy {

  @Input() error$!: Observable<HttpErrorResponse>;

  public errorMessage$!: Observable<string>;
  private unsubscribe$ = new Subject<boolean>();

  public ngOnInit(): void {
    this.errorMessage$ = this.getErrorMessage();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  private getErrorMessage(): Observable<string> {
    return this.error$.pipe(
      takeUntil(this.unsubscribe$),
      map((httpErrorResponse) => httpErrorResponse.error.message)
    );
  }

}
