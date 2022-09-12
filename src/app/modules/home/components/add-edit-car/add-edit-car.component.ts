import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { Masks } from 'src/app/shared/utils/masks';
import { CarsFacade } from '../../../../store/cars/cars.facade';
import { AddEditCarDialogData } from '../../utils/interfaces/add-edit-car-dialog-data.interface';

@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrls: ['./add-edit-car.component.scss'],
})
export class AddEditCarComponent implements OnInit, OnDestroy {

  // ========== Selectors Add
  public carAddLoading$ = this.carsFacade.carAddLoading$;
  public carAddSuccess$ = this.carsFacade.carAddSuccess$;
  public carAddError$ = this.carsFacade.carAddError$;

  // ========== Selectors Update
  public carUpdateLoading$ = this.carsFacade.carUpdateLoading$;
  public carUpdateSuccess$ = this.carsFacade.carUpdateSuccess$;
  public carUpdateError$ = this.carsFacade.carUpdateError$;

  public form!: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private carsFacade: CarsFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditCarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AddEditCarDialogData
  ) {}

  public ngOnInit(): void {
    this.initForm();
    if (this.isEditMode()) {
      this.setFormValues();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onSubmit(): void {
    this.isAddMode() ? this.carAddSubmit() : this.carUpdateSubmit();
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

  private initForm(): void {
    this.form = this.fb.group({
      brand: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]],
      model: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]],
      valueOfCar: ['', [
        Validators.required,
        Validators.min(0),
      ]],
    });
  }

  private setFormValues(): void {
    if (this.data.car) {
      this.form.patchValue(this.data.car);
    }
  }

  private carAddSubmit(): void {
    this.carsFacade.addCar(this.form.value);
    this.carAddSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((carAddSuccess) => !!carAddSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  private carUpdateSubmit(): void {
    this.carsFacade.updateCar({
      id: this.data.car?.id,
      body: this.form.value,
    });

    this.carUpdateSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((carUpdateSuccess) => !!carUpdateSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

}
