import { Component, OnInit } from '@angular/core';
import { AddEditGroupComponent } from './components/add-edit-group/add-edit-group.component';
import { DialogService, DialogSize } from '../../../../shared/services/dialog.service';
import { AddEditGroupDialogData } from './utils/interfaces/add-edit-group-dialog-data.interface';
import { AddEditMode } from '../../../../shared/utils/enums/add-edit-mode.enum';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(private dialogService: DialogService,) {}

  ngOnInit(): void {}

  public openAddGroupDialog(): void {
    this.dialogService.open(AddEditGroupComponent, DialogSize.sm, {
      data: {
        mode: AddEditMode.add,
      } as AddEditGroupDialogData,
    });
  }

}
