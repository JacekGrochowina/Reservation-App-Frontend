import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { Masks } from 'src/app/shared/utils/masks';
import { DriversFacade } from '../../+state/drivers.facade';
import { AddEditDriverDialogData } from '../../utils/interfaces/add-edit-driver-dialog-data.interface';

@Component({
  selector: 'app-add-edit-driver',
  templateUrl: './add-edit-driver.component.html',
  styleUrls: ['./add-edit-driver.component.scss'],
})
export class AddEditDriverComponent implements OnInit {
  // ========== Selectors Add
  driverAddLoading$ = this.driversFacade.driverAddLoading$;
  driverAddSuccess$ = this.driversFacade.driverAddSuccess$;
  driverAddError$ = this.driversFacade.driverAddError$;

  // ========== Selectors Update
  driverUpdateLoading$ = this.driversFacade.driverUpdateLoading$;
  driverUpdateSuccess$ = this.driversFacade.driverUpdateSuccess$;
  driverUpdateError$ = this.driversFacade.driverUpdateError$;

  form!: FormGroup;
  peselMask = Masks.pesel;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private driversFacade: DriversFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditDriverComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AddEditDriverDialogData
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.isEditMode()) {
      this.setFormValues();
    }
  }

  onSubmit(): void {
    this.isAddMode() ? this.driverAddSubmit() : this.driverUpdateSubmit();
  }

  isAddMode(): boolean {
    return this.data.mode === AddEditMode.add;
  }

  isEditMode(): boolean {
    return this.data.mode === AddEditMode.edit;
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      pesel: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      hireDate: ['', Validators.required],
      firedDate: [''],
    });
  }

  private setFormValues(): void {
    if (this.data.driver) {
      this.form.patchValue(this.data.driver);
      this.form.patchValue({
        hireDate: new Date(this.data.driver.hireDate),
        firedDate: this.data.driver.firedDate
          ? new Date(this.data.driver.firedDate)
          : null,
      });
    }
  }

  private driverAddSubmit(): void {
    this.driversFacade.addDriver(this.form.value);
    this.driverAddSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((driverAddSuccess) => !!driverAddSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  private driverUpdateSubmit(): void {
    this.driversFacade.updateDriver({
      id: this.data.driver?.id,
      ...this.form.value,
    });
    this.driverUpdateSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((driverUpdateSuccess) => !!driverUpdateSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
