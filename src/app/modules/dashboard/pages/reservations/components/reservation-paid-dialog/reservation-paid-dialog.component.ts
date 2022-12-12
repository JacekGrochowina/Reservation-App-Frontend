import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ReservationExtendsResponse
} from '../../../../../../store/reservations/interfaces/responses/reservation-extends.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ReservationsFacade } from '../../../../../../store/reservations/reservations.facade';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reservation-paid-dialog',
  templateUrl: './reservation-paid-dialog.component.html',
  styleUrls: ['./reservation-paid-dialog.component.scss'],
})
export class ReservationPaidDialogComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  private unsubscribe$ = new Subject<boolean>();

  // ========== Selectors Reservation Update
  public reservationUpdateLoading$ = this.reservationsFacade.reservationUpdateLoading$;
  public reservationUpdateSuccess$ = this.reservationsFacade.reservationUpdateSuccess$;
  public reservationUpdateError$ = this.reservationsFacade.reservationUpdateError$;

  constructor(
    private fb: FormBuilder,
    private reservationsFacade: ReservationsFacade,
    private dialogRef: MatDialogRef<ReservationPaidDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationExtendsResponse,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  public onSubmit(): void {
    this.reservationsFacade.updateReservation({
      id: this.data.id,
      body: {
        ...this.data,
        paidAmount: this.form.get('paidAmount')?.value,
      },
    });

    this.reservationUpdateSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((reservationUpdateSuccess) => !!reservationUpdateSuccess),
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  public closeDialog(): void {
    this.dialogRef.close(true);
  }

  private initForm(): void {
    const totalPaidAmount = this.data.advancePaid ?? 0 + this.data.paidAmount;

    this.form = this.fb.group({
      paidAmount: [totalPaidAmount, [Validators.required, Validators.min(0)]],
    });
  }

}
