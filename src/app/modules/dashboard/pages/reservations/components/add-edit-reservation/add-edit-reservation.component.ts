import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { AddEditReservationDialogData } from '../../utils/interfaces/add-edit-reservation-dialog-data.interface';
import { ReservationsFacade } from '../../../../../../store/reservations/reservations.facade';
import { ItemsFacade } from '../../../../../../store/items/items.facade';
import { GroupsFacade } from '../../../../../../store/groups/groups.facade';
import { DictionariesFacade } from '../../../../../../store/dictionaries/dictionaries.facade';
import { Dictionaries } from '../../../../../../store/dictionaries/dictionaries.state';

type CheckboxStatus = 'tak' | 'nie';

@Component({
  selector: 'app-add-edit-reservation',
  templateUrl: './add-edit-reservation.component.html',
  styleUrls: ['./add-edit-reservation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditReservationComponent implements OnInit, OnDestroy {

  public dictionaryGroupsItems$ = this.dictionariesFacade.dictionaryGroupsItems$;
  public dictionaryGroupsLoading$ = this.dictionariesFacade.dictionaryGroupsLoading$;

  public dictionaryItemsItems$ = this.dictionariesFacade.dictionaryItemsItems$;
  public dictionaryItemsLoading$ = this.dictionariesFacade.dictionaryItemsLoading$;

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
    private dictionariesFacade: DictionariesFacade,
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

    this.clearDictionaries();
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

  public percentFormat(value: number): string {
    return `${value}%`;
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
        dateRange: this.fb.group({
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
        surname: ['', [
          Validators.minLength(3),
          Validators.maxLength(25)
        ]],
        phone: [''],
        email: ['', [Validators.email]],
      }),
      advance: this.fb.group({
        isRequired: [false, [Validators.required]],
        amount: [0, [Validators.min(0)]],
        amountPercent: [0, [Validators.min(0)]],
        paidAmount: ['', [Validators.min(0)]],
      }),
      discount: this.fb.group({
        isRequired: [false, [Validators.required]],
        amount: [0, [Validators.min(0)]],
        amountPercent: [0, [Validators.min(0)]],
      }),
    });

    this.handleRequired(this.formAdvance);
    this.handleRequired(this.formDiscount);

    this.handleChangesGeneralGroupId();
    this.handleChangesPercent(this.formAdvance);
    this.handleChangesPercent(this.formDiscount);

    this.setDisabledControls();

    this.loadDictionaries();
  }

  private setDisabledControls(): void {
    this.setDisabledFormGeneralItemId();
  }

  private setDisabledFormGeneralItemId(): void {
    this.isItemsSelectDisabled()
      ? this.formGeneral.get('itemId')?.disable()
      : this.formGeneral.get('itemId')?.enable();
  }

  private isItemsSelectDisabled(): boolean {
    return !this.formGeneral.get('groupId')?.value;
  }

  private handleRequired (formGroup: FormGroup): void {
    formGroup.get('isRequired')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isRequired) =>
        isRequired
          ? this.setRequired(formGroup, 'amount')
          : this.unsetRequired(formGroup, 'amount')
    );
  }

  private setRequired(formGroup: FormGroup, controlName: string): void {
    formGroup.get(controlName)?.setValidators([Validators.required, Validators.min(0)]);
    formGroup.get(controlName)?.updateValueAndValidity();
  }

  private unsetRequired(formGroup: FormGroup, controlName: string): void {
    formGroup.get(controlName)?.setValidators(null);
    formGroup.get(controlName)?.updateValueAndValidity();
  }

  private handleChangesGeneralGroupId(): void {
    this.formGeneral.get('groupId')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((group) => {
        this.setDisabledFormGeneralItemId();
        this.dictionariesFacade.clearDictionary(Dictionaries.items);
        this.dictionariesFacade.getDictionary(Dictionaries.items, { group });
      });
  }

  private handleChangesPercent(formGroup: FormGroup): void {
    formGroup.get('amount')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((amount) => {
        const priceTotal = this.formGeneral.get('priceTotal')?.value;
        const calcPercent = this.calcPercent(amount, priceTotal);

        if ((formGroup.get('amountPercent')?.value) === calcPercent) return;

        formGroup.get('amountPercent')?.patchValue(calcPercent);
      });

    formGroup.get('amountPercent')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((amountPercent) => {
        const priceTotal = this.formGeneral.get('priceTotal')?.value;
        const calcAmount = this.calcAmount(amountPercent, priceTotal);

        if (formGroup.get('amount')?.value === calcAmount) return;

        formGroup.get('amount')?.patchValue(calcAmount);
      });
  }

  private calcAmount(percent: number, totalValue: number): number {
    return Number((totalValue / 100 * percent).toFixed(2));
  }

  private calcPercent(value: number, totalValue: number): number {
    return Number((value * 100 / totalValue).toFixed(2));
  }

  private loadDictionaries(): void {
    this.dictionariesFacade.getDictionary(Dictionaries.groups);
  }

  private clearDictionaries(): void {
    this.dictionariesFacade.clearDictionary(Dictionaries.groups);
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
