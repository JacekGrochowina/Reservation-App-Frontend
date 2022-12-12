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
import { isNull } from 'lodash';
import { DefaultDictionary } from '../../../../../../store/dictionaries/interfaces/common/default-dictionary.interface';
import {
  ReservationAddPayload
} from '../../../../../../store/reservations/interfaces/payloads/reservation-add.payload';

type CheckboxStatus = 'tak' | 'nie';

@Component({
  selector: 'app-add-edit-reservation',
  templateUrl: './add-edit-reservation.component.html',
  styleUrls: ['./add-edit-reservation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditReservationComponent implements OnInit, OnDestroy {

  public dictionaryGroupsItems$ = this.dictionariesFacade.dictionaryGroupsItems$;

  public dictionaryItemsItems$ = this.dictionariesFacade.dictionaryItemsItems$;
  public dictionaryItemsLoading$ = this.dictionariesFacade.dictionaryItemsLoading$;
  public dictionaryItemsSuccess$ = this.dictionariesFacade.dictionaryItemsSuccess$;

  // ========== Selectors Add
  public reservationAddLoading$ = this.reservationsFacade.reservationAddLoading$;
  public reservationAddSuccess$ = this.reservationsFacade.reservationAddSuccess$;
  public reservationAddError$ = this.reservationsFacade.reservationAddError$;

  // ========== Selectors Update
  public reservationUpdateLoading$ = this.reservationsFacade.reservationUpdateLoading$;
  public reservationUpdateSuccess$ = this.reservationsFacade.reservationUpdateSuccess$;
  public reservationUpdateError$ = this.reservationsFacade.reservationUpdateError$;

  // ========== Selectors Details
  public itemDetailsItems$ = this.itemsFacade.itemDetailsItems$;
  public itemDetailsLoading$ = this.itemsFacade.itemDetailsLoading$;
  public itemDetailsSuccess$ = this.itemsFacade.itemDetailsSuccess$;
  public itemDetailsError$ = this.itemsFacade.itemDetailsError$;

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
    @Inject(MAT_DIALOG_DATA) private data: AddEditReservationDialogData,
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
    this.isAddMode() ? this.reservationAddSubmit() : this.reservationUpdateSubmit();
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

  public getPercentDisplayValue(formGroup: FormGroup): string {
    return `${(formGroup.get('amountPercent')?.value).toFixed(2)}%`;
  }

  public getPriceTotalWithDiscount(): string {
    const priceTotal = this.formGeneral.get('priceTotal')?.value;
    const discount = this.formDiscount.get('amount')?.value;
    return (priceTotal - discount).toFixed(2);
  }

  public toggleFormGeneralIsEditingPriceTotal(): void {
    const currentValue = this.formGeneral.get('isEditingPriceTotal')?.value;
    this.formGeneral.get('isEditingPriceTotal')?.patchValue(!currentValue);
    this.setDisabledFormGeneralPriceTotal();
  }

  public objectComparisonFunction(option, value): boolean {
    return option.id === value.id;
  }

  private initForm(): void {
    this.form = this.fb.group({
      general: this.fb.group({
        dateRange: this.fb.group({
          start: ['', [Validators.required]],
          end: ['', [Validators.required]],
        }),
        group: ['', [Validators.required]],
        item: ['', [Validators.required]],
        priceTotal: ['', [Validators.required]],
        isEditingPriceTotal: [false, [Validators.required]],
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

    this.handleChangesGeneralDateRange();
    this.handleChangesGeneralPriceTotal();
    this.handleChangesGeneralGroup();
    this.handleChangesGeneralItem();

    this.handleChangesPercent(this.formAdvance);
    this.handleChangesPercent(this.formDiscount);

    this.setDisabledControls();
  }

  private setDisabledControls(): void {
    this.setDisabledFormGeneralPriceTotal();
    this.setDisabledFormGeneralItem();
  }

  private setDisabledFormGeneralPriceTotal(): void {
    this.formGeneral.get('isEditingPriceTotal')?.value
      ? this.formGeneral.get('priceTotal')?.enable()
      : this.formGeneral.get('priceTotal')?.disable();
  }

  private setDisabledFormGeneralItem(): void {
    this.isItemsSelectDisabled()
      ? this.formGeneral.get('item')?.disable()
      : this.formGeneral.get('item')?.enable();
  }

  private isItemsSelectDisabled(): boolean {
    return !this.formGeneral.get('group')?.value;
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

  private handleChangesGeneralDateRange(): void {
    ['start', 'end'].forEach((controlName) =>
      this.formGeneralDateRange.get(controlName)?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.calcPriceTotal())
    );
  }

  private handleChangesGeneralPriceTotal(): void {
    this.formGeneral.get('priceTotal')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((priceTotal) => {
        if (priceTotal <= 0) { return; }

        const advanceAmountPercent = this.formAdvance.get('amountPercent')?.value;
        const discountAmountPercent = this.formDiscount.get('amountPercent')?.value;
        const advanceAmount = this.calcAmount(advanceAmountPercent, priceTotal);
        const discountAmount = this.calcAmount(discountAmountPercent, priceTotal);

        this.formAdvance.get('amount')?.patchValue(advanceAmount);
        this.formDiscount.get('amount')?.patchValue(discountAmount);
      });
  }

  private handleChangesGeneralGroup(): void {
    this.formGeneral.get('group')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ id }: DefaultDictionary) => {
        this.setDisabledFormGeneralItem();
        this.dictionariesFacade.clearDictionary(Dictionaries.items);
        this.dictionariesFacade.getDictionary(Dictionaries.items, { group: id });
      });
  }

  private handleChangesGeneralItem(): void {
    this.itemDetailsItems$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.calcPriceTotal());

    this.formGeneral.get('item')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ id }: DefaultDictionary) => {
        if (id) {
          this.itemsFacade.getItemDetails(id);
        }
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

  private calcPriceTotal(): void {
    this.itemsFacade.itemDetailsItems$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((itemDetailsItems) => {
        if (isNull(itemDetailsItems) || isNaN(itemDetailsItems.pricePerDay)) { return; }

        if (itemDetailsItems) {
          this.formGeneral.get('priceTotal')?.patchValue(itemDetailsItems.pricePerDay * this.getDateRange());
        } else {
          this.formGeneral.get('priceTotal')?.patchValue(0);
        }
      });
  }

  private calcAmount(percent: number, totalValue: number): number {
    return Number((totalValue / 100 * percent).toFixed(2));
  }

  private calcPercent(value: number, totalValue: number): number {
    return Number(value * 100 / totalValue);
  }

  private clearDictionaries(): void {
    this.dictionariesFacade.clearDictionary(Dictionaries.items);
  }

  private setFormValues(): void {
    if (this.data.reservation) {
      this.form.patchValue({
        general: {
          dateRange: {
            start: new Date(this.data.reservation.dateStart),
            end: new Date(this.data.reservation.dateFinish),
          },
          group: {
            id: this.data.reservation.groupId,
            name: this.data.reservation.group.name,
          },
          priceTotal: this.data.reservation.priceTotal,
          isEditingPriceTotal: false,
        },
        client: {
          name: this.data.reservation.clientName ?? '',
          surname: this.data.reservation.clientSurname ?? '',
          phone: this.data.reservation.clientPhone ?? '',
          email: this.data.reservation.clientEmail ?? '',
        },
        advance: {
          isRequired: this.data.reservation.advanceTotal ? true : false,
          amount: this.data.reservation.advanceTotal,
          amountPercent: this.data.reservation.advanceTotal
            ? this.calcPercent(this.data.reservation.advanceTotal, this.data.reservation.priceTotal)
            : null,
          paidAmount: this.data.reservation.advancePaid,
        },
        discount: {
          isRequired: this.data.reservation.discount ? true : false,
          amount: this.data.reservation.discount,
          amountPercent: this.data.reservation.discount
            ? this.calcPercent(this.data.reservation.discount, this.data.reservation.priceTotal)
            : null,
        },
      })

      this.dictionaryItemsSuccess$
        .pipe(
          takeUntil(this.unsubscribe$),
          filter((dictionaryItemsSuccess) => !!dictionaryItemsSuccess),
        )
        .subscribe(() => {
          this.formGeneral.get('item')?.setValue({
            id: this.data.reservation?.itemId,
            name: this.data.reservation?.item.name,
          });
        });
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

  private getFormControlStringValue(value: string): string | null {
    const trimValue = value.trim();
    const isEmpty = trimValue === '';
    return isEmpty ? null : trimValue;
  }

  private getFormControlOptionalValue(formGroup: FormGroup, controlName: string): number | null {
    const isIntroduced = formGroup.get('isRequired')?.value;
    const controlNameValue = formGroup.get(controlName)?.value;
    const isEmpty = controlNameValue === '';
    return isIntroduced && !isEmpty ? controlNameValue : null;
  }

  private reservationAddSubmit(): void {
    this.reservationsFacade.addReservation(this.getReservationAddPayload());

    this.reservationAddSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((reservationAddSuccess) => !!reservationAddSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  private reservationUpdateSubmit(): void {
    this.reservationsFacade.updateReservation({
      id: this.data.reservation?.id,
      body: this.getReservationAddPayload(),
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

  private getReservationAddPayload(): ReservationAddPayload {
    return {
      dateStart: this.formGeneralDateRange.get('start')?.value,
      dateFinish: this.formGeneralDateRange.get('end')?.value,
      clientName: this.getFormControlStringValue(this.formClient.get('name')?.value),
      clientSurname: this.getFormControlStringValue(this.formClient.get('surname')?.value),
      clientPhone: this.getFormControlStringValue(this.formClient.get('phone')?.value),
      clientEmail: this.getFormControlStringValue(this.formClient.get('email')?.value),
      isAdvance: this.formAdvance.get('isRequired')?.value,
      advanceTotal: this.getFormControlOptionalValue(this.formAdvance, 'amount'),
      advancePaid: this.getFormControlOptionalValue(this.formAdvance, 'paidAmount'),
      isDiscount: this.formDiscount.get('isRequired')?.value,
      discount: this.getFormControlOptionalValue(this.formDiscount, 'amount'),
      priceTotal: this.formGeneral.get('priceTotal')?.value,
      paidAmount: 0,
      groupId: this.formGeneral.get('group')?.value.id,
      itemId: this.formGeneral.get('item')?.value.id,
    }
  }

}
