import { Component, OnInit } from '@angular/core';
import { AddEditItemComponent } from './components/add-edit-item/add-edit-item.component';
import { DialogService, DialogSize } from '../../../../shared/services/dialog.service';
import { AddEditItemDialogData } from './utils/interfaces/add-edit-item-dialog-data.interface';
import { AddEditMode } from '../../../../shared/utils/enums/add-edit-mode.enum';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  public openAddItemDialog(): void {
    this.dialogService.open(AddEditItemComponent, DialogSize.sm, {
      data: {
        mode: AddEditMode.add,
      } as AddEditItemDialogData,
    });
  }

}
