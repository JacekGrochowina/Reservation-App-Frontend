import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() items$!: Observable<any[]>;
  @Input() loading$!: Observable<boolean>;
  @Input() success$!: Observable<boolean>;
  @Input() error$!: Observable<HttpErrorResponse>;

  public isEmpty$!: Observable<boolean>;
  public isTableErrorVisible$!: Observable<boolean>;
  public isTableEmptyVisible$!: Observable<boolean>;
  public isTableContentVisible$!: Observable<boolean>;

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.isEmpty$ = this.getIsEmpty();
    this.isTableErrorVisible$ = this.getIsTableErrorVisible();
    this.isTableEmptyVisible$ = this.getIsTableEmptyVisible();
    this.isTableContentVisible$ = this.getIsTableContentVisible();
  }

  private getIsEmpty(): Observable<boolean> {
    return this.items$.pipe(
      takeUntil(this.unsubscribe$),
      map((items) => items.length === 0)
    );
  }

  private getIsTableErrorVisible(): Observable<boolean> {
    return combineLatest([this.loading$, this.error$])
      .pipe(
        takeUntil(this.unsubscribe$),
        map(([loading, error]) => !loading && !!error)
      );
  }

  private getIsTableEmptyVisible(): Observable<boolean> {
    return combineLatest([this.loading$, this.error$, this.isEmpty$])
      .pipe(
        takeUntil(this.unsubscribe$),
        map(([loading, error, isEmpty]) => !loading && !error && isEmpty)
      );
  }

  private getIsTableContentVisible(): Observable<boolean> {
    return combineLatest([this.loading$, this.isEmpty$])
      .pipe(
        takeUntil(this.unsubscribe$),
        map(([loading, isEmpty]) => !loading && !isEmpty)
      );
  }

}
