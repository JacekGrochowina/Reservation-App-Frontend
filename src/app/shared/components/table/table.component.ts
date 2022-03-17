import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  private unsubscribe$ = new Subject<void>();

  constructor() {}

  public ngOnInit(): void {
    this.isEmpty$ = this.getIsEmpty();
  }

  private getIsEmpty(): Observable<boolean> {
    return this.items$.pipe(
      takeUntil(this.unsubscribe$),
      map((items) => items.length === 0)
    );
  }

}
