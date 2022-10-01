import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ConfirmDialogData } from './interfaces/confirm-dialog-data.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  public ngOnInit(): void {
    if (this.data.isAsync && this.data.close$) {
      this.data.close$
        .pipe(
          takeUntil(this.unsubscribe$),
          filter((closed) => !!closed)
        )
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  public onDismiss(): void {
    this.dialogRef.close(false);
  }

}
