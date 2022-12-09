import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ReservationExtendsResponse
} from '../../../../../../store/reservations/interfaces/responses/reservation-extends.response';
import { isNull } from 'lodash';

@Component({
  selector: 'app-reservation-summary-dialog',
  templateUrl: './reservation-summary-dialog.component.html',
  styleUrls: ['./reservation-summary-dialog.component.scss'],
})
export class ReservationSummaryDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ReservationSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationExtendsResponse,
  ) {}

  public closeDialog(): void {
    this.dialogRef.close(true);
  }

  public calcPercent(value: number | null, totalValue: number): number {
    if (isNull(value)) { return 0 };
    return Number(value * 100 / totalValue);
  }

  public nonNullable(value: unknown): unknown {
    return isNull(value) ? '' : value;
  }

}
