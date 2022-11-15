import { Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { AddEditGroupComponent } from '../add-edit-group/add-edit-group.component';
import { DialogService, DialogSize } from '../../../../../../shared/services/dialog.service';
import { GroupsFacade } from '../../../../../../store/groups/groups.facade';
import { Group } from '../../../../../../store/groups/interfaces/group.interface';

@Component({
  selector: 'app-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.scss'],
})
export class GroupsTableComponent implements OnInit {

  // ========== Selectors List
  public groupsListItems$ = this.groupsFacade.groupsListItems$;
  public groupsListLoading$ = this.groupsFacade.groupsListLoading$;
  public groupsListSuccess$ = this.groupsFacade.groupsListSuccess$;
  public groupsListError$ = this.groupsFacade.groupsListError$;

  // ========== Selectors Add
  public groupAddLoading$ = this.groupsFacade.groupAddLoading$;
  public groupAddSuccess$ = this.groupsFacade.groupAddSuccess$;
  public groupAddError$ = this.groupsFacade.groupAddError$;

  // ========== Selectors Del
  public groupDelLoading$ = this.groupsFacade.groupDelLoading$;
  public groupDelSuccess$ = this.groupsFacade.groupDelSuccess$;
  public groupDelError$ = this.groupsFacade.groupDelError$;

  // ========== Selectors Update
  public groupUpdateLoading$ = this.groupsFacade.groupUpdateLoading$;
  public groupUpdateSuccess$ = this.groupsFacade.groupUpdateSuccess$;
  public groupUpdateError$ = this.groupsFacade.groupUpdateError$;

  public displayedColumns: string[] = [
    'name',
    'city',
    'address',
    'action',
  ];

  constructor(
    private groupsFacade: GroupsFacade,
    private dialogService: DialogService,
  ) {}

  public ngOnInit(): void {
    this.groupsFacade.getGroupsList();
  }

  public editGroup(group: Group): void {
    this.dialogService.open(AddEditGroupComponent, DialogSize.sm, {
      data: {
        group,
        mode: AddEditMode.edit,
      },
    });
  }

  public delGroup(groupID: number): void {
    this.dialogService.open(ConfirmDialogComponent, DialogSize.xs, {
      data: {
        title: 'Usuwanie grupy',
        message: 'Czy napewno chcesz usunąć tę grupę?',
        confirmLabel: 'Usuń',
        dismissLabel: 'Anuluj',
        isAsync: true,
        close$: this.groupDelSuccess$,
        loading$: this.groupDelLoading$,
        errors$: this.groupDelError$,
        confirmed: () => {
          this.groupsFacade.delGroup(groupID);
        },
      },
    });
  }

}
