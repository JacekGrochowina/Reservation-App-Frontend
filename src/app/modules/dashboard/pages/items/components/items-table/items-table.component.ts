import { Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { AddEditItemComponent } from '../add-edit-item/add-edit-item.component';
import { DialogService, DialogSize } from '../../../../../../shared/services/dialog.service';
import { ItemsFacade } from '../../../../../../store/items/items.facade';
import { Item } from '../../../../../../store/items/interfaces/item.interface';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss'],
})
export class ItemsTableComponent implements OnInit {

  // ========== Selectors List
  public itemsListItems$ = this.itemsFacade.itemsListItems$;
  public itemsListLoading$ = this.itemsFacade.itemsListLoading$;
  public itemsListSuccess$ = this.itemsFacade.itemsListSuccess$;
  public itemsListError$ = this.itemsFacade.itemsListError$;

  // ========== Selectors Add
  public itemAddLoading$ = this.itemsFacade.itemAddLoading$;
  public itemAddSuccess$ = this.itemsFacade.itemAddSuccess$;
  public itemAddError$ = this.itemsFacade.itemAddError$;

  // ========== Selectors Del
  public itemDelLoading$ = this.itemsFacade.itemDelLoading$;
  public itemDelSuccess$ = this.itemsFacade.itemDelSuccess$;
  public itemDelError$ = this.itemsFacade.itemDelError$;

  // ========== Selectors Update
  public itemUpdateLoading$ = this.itemsFacade.itemUpdateLoading$;
  public itemUpdateSuccess$ = this.itemsFacade.itemUpdateSuccess$;
  public itemUpdateError$ = this.itemsFacade.itemUpdateError$;

  public displayedColumns: string[] = [
    'name',
    'pricePerDay',
    'action',
  ];

  constructor(
    private itemsFacade: ItemsFacade,
    private dialogService: DialogService,
  ) {}

  public ngOnInit(): void {
    this.itemsFacade.getItemsList();
  }

  public editItem(item: Item): void {
    this.dialogService.open(AddEditItemComponent, DialogSize.sm, {
      data: {
        item,
        mode: AddEditMode.edit,
      },
    });
  }

  public delItem(itemID: number): void {
    this.dialogService.open(ConfirmDialogComponent, DialogSize.xs, {
      data: {
        title: 'Usuwanie przedmiotu',
        message: 'Czy napewno chcesz usunąć ten przedmiot?',
        confirmLabel: 'Usuń',
        dismissLabel: 'Anuluj',
        isAsync: true,
        close$: this.itemDelSuccess$,
        loading$: this.itemDelLoading$,
        errors$: this.itemDelError$,
        confirmed: () => {
          this.itemsFacade.delItem(itemID);
        },
      },
    });
  }

}
