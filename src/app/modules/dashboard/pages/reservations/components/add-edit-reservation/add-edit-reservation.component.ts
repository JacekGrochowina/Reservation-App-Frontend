import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { AddEditReservationDialogData } from '../../utils/interfaces/add-edit-reservation-dialog-data.interface';
import { GroupsFacade } from '../../../../../../store/groups/groups.facade';

@Component({
  selector: 'app-add-edit-reservation',
  templateUrl: './add-edit-reservation.component.html',
  styleUrls: ['./add-edit-reservation.component.scss'],
})
export class AddEditReservationComponent implements OnInit, OnDestroy {

  // ========== Selectors Add
  public groupAddLoading$ = this.groupsFacade.groupAddLoading$;
  public groupAddSuccess$ = this.groupsFacade.groupAddSuccess$;
  public groupAddError$ = this.groupsFacade.groupAddError$;

  // ========== Selectors Update
  public groupUpdateLoading$ = this.groupsFacade.groupUpdateLoading$;
  public groupUpdateSuccess$ = this.groupsFacade.groupUpdateSuccess$;
  public groupUpdateError$ = this.groupsFacade.groupUpdateError$;

  public form!: FormGroup;
  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private groupsFacade: GroupsFacade,
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
    this.isAddMode() ? this.groupAddSubmit() : this.groupUpdateSubmit();
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
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(45),
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
      city: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(45),
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
      ]],
    });
  }

  private setFormValues(): void {
    if (this.data.reservation) {
      this.form.patchValue(this.data.reservation);
    }
  }

  private groupAddSubmit(): void {
    this.groupsFacade.addGroup(this.form.value);
    this.groupAddSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((groupAddSuccess) => !!groupAddSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  private groupUpdateSubmit(): void {
    this.groupsFacade.updateGroup({
      id: this.data.reservation?.id,
      body: this.form.value,
    });

    this.groupUpdateSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((groupUpdateSuccess) => !!groupUpdateSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

}
