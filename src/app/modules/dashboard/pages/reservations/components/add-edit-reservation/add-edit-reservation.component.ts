import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { AddEditReservationDialogData } from '../../utils/interfaces/add-edit-reservation-dialog-data.interface';
import { ReservationsFacade } from '../../../../../../store/reservations/reservations.facade';
import { ItemsFacade } from '../../../../../../store/items/items.facade';
import { GroupsFacade } from '../../../../../../store/groups/groups.facade';

type CheckboxStatus = 'tak' | 'nie';

@Component({
  selector: 'app-add-edit-reservation',
  templateUrl: './add-edit-reservation.component.html',
  styleUrls: ['./add-edit-reservation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditReservationComponent implements OnInit, OnDestroy {

  // ========== Selectors List Groups
  public groupsListItems$ = this.groupsFacade.groupsListItems$;
  public groupsListLoading$ = this.groupsFacade.groupsListLoading$;
  public groupsListSuccess$ = this.groupsFacade.groupsListSuccess$;
  public groupsListError$ = this.groupsFacade.groupsListError$;

  // ========== Selectors List Items
  public itemsListItems$ = this.itemsFacade.itemsListItems$;
  public itemsListLoading$ = this.itemsFacade.itemsListLoading$;
  public itemsListSuccess$ = this.itemsFacade.itemsListSuccess$;
  public itemsListError$ = this.itemsFacade.itemsListError$;

  // ========== Selectors Add
  public reservationAddLoading$ = this.reservationsFacade.reservationAddLoading$;
  public reservationAddSuccess$ = this.reservationsFacade.reservationAddSuccess$;
  public reservationAddError$ = this.reservationsFacade.reservationAddError$;

  // ========== Selectors Update
  public reservationUpdateLoading$ = this.reservationsFacade.reservationUpdateLoading$;
  public reservationUpdateSuccess$ = this.reservationsFacade.reservationUpdateSuccess$;
  public reservationUpdateError$ = this.reservationsFacade.reservationUpdateError$;

  public form!: FormGroup;
  private unsubscribe$ = new Subject<boolean>();

  // get dateRange(): FormGroup {
  //   return this.form.get('dateRange') as FormGroup;
  // }

  get formGeneral(): FormGroup {
    return this.form.get('general') as FormGroup;
  }

  get formGeneralDateRange(): FormGroup {
    return this.formGeneral.get('dateRange') as FormGroup;
  }

  get formClient(): FormGroup {
    return this.form.get('client') as FormGroup;
  }

  get formAdvance(): FormGroup {
    return this.form.get('advance') as FormGroup;
  }

  get formDiscount(): FormGroup {
    return this.form.get('discount') as FormGroup;
  }

  constructor(
    private fb: FormBuilder,
    private itemsFacade: ItemsFacade,
    private groupsFacade: GroupsFacade,
    private reservationsFacade: ReservationsFacade,
    private dialogRef: MatDialogRef<AddEditReservationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AddEditReservationDialogData
  ) {}

  public ngOnInit(): void {
    this.initForm();
    if (this.isEditMode()) {
      this.setFormValues();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  public onSubmit(): void {
    console.log(this.form.value);
    // this.isAddMode() ? this.groupAddSubmit() : this.groupUpdateSubmit();
  }

  public isAddMode(): boolean {
    return this.data.mode === AddEditMode.add;
  }

  public isEditMode(): boolean {
    return this.data.mode === AddEditMode.edit;
  }

  public closeDialog(): void {
    this.dialogRef.close(true);
  }

  public getDateRange(): number {
    return !isNaN(this.calcDateRangeDiff()) ? this.calcDateRangeDiff() : 0;
  }

  public getCheckboxStatus(formControl: AbstractControl | null): CheckboxStatus {
    return formControl?.value ? 'tak' : 'nie';
  }

  private initForm(): void {
    /*
        1. general (Podstawowe informacje) - dateStart, dateFinish, itemId, priceTotal
        2. client (Dane rezerwującego) - clientName, clientSurname, clientPhone, clientEmail
        3. advance (Zaliczka) - isAdvance, advanceTotal, advancePaid
        4. discount (Rabat) - isDiscount, discount
     */

    this.form = this.fb.group({
      general: this.fb.group({
        dateRange : this.fb.group({
          start: ['', [Validators.required]],
          end: ['', [Validators.required]],
        }),
        groupId: ['', [Validators.required]],
        itemId: ['', [Validators.required]],
        priceTotal: ['', [Validators.required]],
      }),
      client: this.fb.group({
        name: ['', [
          Validators.minLength(3),
          Validators.maxLength(25)
        ]],
        surname: ['',[
          Validators.minLength(3),
          Validators.maxLength(25)
        ]],
        phone: [''],
        email: ['', [Validators.email]],
      }),
      advance: this.fb.group({
        isRequired: [false, [Validators.required]],
        amount: ['', [Validators.min(0)]],
        paidAmount: ['', [Validators.min(0)]],
      }),
      discount: this.fb.group({
        isRequired: [false, [Validators.required]],
        amount: ['', [Validators.min(0)]],
      }),
    });

    this.formAdvance.get('isRequired')?.valueChanges.subscribe((isRequired) =>
      isRequired
        ? this.setRequired(this.formAdvance, 'amount')
        : this.unsetRequired(this.formAdvance, 'amount')
    );

    this.formDiscount.get('isRequired')?.valueChanges.subscribe((isRequired) =>
      isRequired
        ? this.setRequired(this.formDiscount, 'amount')
        : this.unsetRequired(this.formDiscount, 'amount')
    );

    // this.form = this.fb.group({
    //   dateRange : this.fb.group({
    //     start: ['', [Validators.required]],
    //     end: ['', [Validators.required]],
    //   }),
    //   name: ['', [
    //     Validators.minLength(3),
    //     Validators.maxLength(25)
    //   ]],
    //   surname: ['', [
    //     Validators.minLength(3),
    //     Validators.maxLength(25)
    //   ]],
    //   isAdvance: [false, [Validators.required]],
    //   advance: [0, [
    //     Validators.required,
    //     Validators.min(0),
    //   ]],
    //   isDiscount: [false, [Validators.required]],
    //   discount: [0, [
    //     Validators.required,
    //     Validators.min(0),
    //   ]],
    // });
    //
    // this.form.get('isAdvance')?.valueChanges.subscribe((isAdvance) =>
    //   isAdvance
    //     ? this.setRequired('advance')
    //     : this.unsetRequired('advance')
    // );
    //
    // this.form.get('isDiscount')?.valueChanges.subscribe((isDiscount) =>
    //   isDiscount
    //     ? this.setRequired('discount')
    //     : this.unsetRequired('discount')
    // );
  }

  private handleRequ

  private setRequired(formGroup: FormGroup, controlName: string): void {
    formGroup.get(controlName)?.setValidators([Validators.required, Validators.min(0)]);
    formGroup.get(controlName)?.updateValueAndValidity();
  }

  private unsetRequired(formGroup: FormGroup, controlName: string): void {
    formGroup.get(controlName)?.setValidators(null);
    formGroup.get(controlName)?.updateValueAndValidity();
  }

  private setFormValues(): void {
    if (this.data.reservation) {
      this.form.patchValue(this.data.reservation);
    }
  }

  private calcDateRangeDiff(): number {
    return this.dateDiff(
      this.formGeneralDateRange.get('start')?.value,
      this.formGeneralDateRange.get('end')?.value,
    );
  }

  private dateDiff(startDate: string, finishDate: string): number {
    return Math.floor((Date.parse(finishDate) - Date.parse(startDate)) / 86400000);
  }

  private groupAddSubmit(): void {
    this.reservationsFacade.addReservation(this.form.value);
    this.reservationAddSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((reservationAddSuccess) => !!reservationAddSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  private groupUpdateSubmit(): void {
    this.reservationsFacade.updateReservation({
      id: this.data.reservation?.id,
      body: this.form.value,
    });

    this.reservationUpdateSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((reservationUpdateSuccess) => !!reservationUpdateSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

}
