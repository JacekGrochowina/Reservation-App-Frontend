import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { AddEditItemDialogData } from '../../utils/interfaces/add-edit-item-dialog-data.interface';
import { ItemsFacade } from '../../../../../../store/items/items.facade';
import { DictionariesFacade } from '../../../../../../store/dictionaries/dictionaries.facade';
import { Dictionaries } from '../../../../../../store/dictionaries/dictionaries.state';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss'],
})
export class AddEditItemComponent implements OnInit, OnDestroy {

  public dictionaryGroupsItems$ = this.dictionariesFacade.dictionaryGroupsItems$;
  public dictionaryGroupsLoading$ = this.dictionariesFacade.dictionaryGroupsLoading$;

  // ========== Selectors Add
  public itemAddLoading$ = this.itemsFacade.itemAddLoading$;
  public itemAddSuccess$ = this.itemsFacade.itemAddSuccess$;
  public itemAddError$ = this.itemsFacade.itemAddError$;

  // ========== Selectors Update
  public itemUpdateLoading$ = this.itemsFacade.itemUpdateLoading$;
  public itemUpdateSuccess$ = this.itemsFacade.itemUpdateSuccess$;
  public itemUpdateError$ = this.itemsFacade.itemUpdateError$;

  public form!: FormGroup;
  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private itemsFacade: ItemsFacade,
    private dictionariesFacade: DictionariesFacade,
    private dialogRef: MatDialogRef<AddEditItemComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AddEditItemDialogData
  ) {}

  public ngOnInit(): void {
    this.dictionariesFacade.getDictionary(Dictionaries.items);
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
    this.isAddMode() ? this.itemAddSubmit() : this.itemUpdateSubmit();
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
      pricePerDay: ['', [
        Validators.required,
        Validators.min(0)
      ]],
      isActive: ['true', [
        Validators.required,
      ]],
      groupId: ['', [
        Validators.required,
      ]],
    });
  }

  private setFormValues(): void {
    if (this.data.item) {
      this.form.patchValue(this.data.item);
    }
  }

  private itemAddSubmit(): void {
    this.itemsFacade.addItem(this.form.value);
    this.itemAddSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((itemAddSuccess) => !!itemAddSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  private itemUpdateSubmit(): void {
    this.itemsFacade.updateItem({
      id: this.data.item?.id,
      body: this.form.value,
    });

    this.itemUpdateSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((itemUpdateSuccess) => !!itemUpdateSuccess)
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

}
