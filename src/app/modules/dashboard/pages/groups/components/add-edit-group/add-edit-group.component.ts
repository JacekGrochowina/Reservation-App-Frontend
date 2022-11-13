import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { AddEditGroupDialogData } from '../../utils/interfaces/add-edit-group-dialog-data.interface';
import { GroupsFacade } from '../../../../../../store/groups/groups.facade';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss'],
})
export class AddEditGroupComponent implements OnInit, OnDestroy {

  // ========== Selectors Add
  public groupAddLoading$ = this.groupsFacade.groupAddLoading$;
  public groupAddSuccess$ = this.groupsFacade.groupAddSuccess$;
  public groupAddError$ = this.groupsFacade.groupAddError$;

  // ========== Selectors Update
  public groupUpdateLoading$ = this.groupsFacade.groupUpdateLoading$;
  public groupUpdateSuccess$ = this.groupsFacade.groupUpdateSuccess$;
  public groupUpdateError$ = this.groupsFacade.groupUpdateError$;

  public form!: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private groupsFacade: GroupsFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AddEditGroupDialogData
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
    if (this.data.group) {
      this.form.patchValue(this.data.group);
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
      id: this.data.group?.id,
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
