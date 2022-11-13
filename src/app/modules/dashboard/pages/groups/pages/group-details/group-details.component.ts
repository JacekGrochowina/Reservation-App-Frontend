import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarsFacade } from '../../../../../../store/cars/cars.facade';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter, first, takeUntil } from 'rxjs/operators';
import { AddEditGroupComponent } from '../../components/add-edit-group/add-edit-group.component';
import { AddEditMode } from '../../../../../../shared/utils/enums/add-edit-mode.enum';
import { DialogService, DialogSize } from '../../../../../../shared/services/dialog.service';
import { GroupsFacade } from '../../../../../../store/groups/groups.facade';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit, OnDestroy {

  // ========== Selectors Details
  public groupDetailsItems$ = this.groupsFacade.groupDetailsItems$;
  public groupDetailsLoading$ = this.groupsFacade.groupDetailsLoading$;
  public groupDetailsSuccess$ = this.groupsFacade.groupDetailsSuccess$;
  public groupDetailsError$ = this.groupsFacade.groupDetailsError$;

  // ========== Selectors Del
  public groupDelLoading$ = this.groupsFacade.groupDelLoading$;
  public groupDelSuccess$ = this.groupsFacade.groupDelSuccess$;
  public groupDelError$ = this.groupsFacade.groupDelError$;

  // ========== Selectors Update
  public groupUpdateLoading$ = this.groupsFacade.groupUpdateLoading$;
  public groupUpdateSuccess$ = this.groupsFacade.groupUpdateSuccess$;
  public groupUpdateError$ = this.groupsFacade.groupUpdateError$;

  private params: ParamMap = this.route.snapshot.paramMap;
  private unsubscribe$ = new Subject<boolean>();

  get groupId(): number {
    return Number(this.params.get('id'));
  }

  constructor(
    private groupsFacade: GroupsFacade,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.groupsFacade.getGroupDetails(this.groupId);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.groupsFacade.clearGroupDetails();
  }

  public delGroup(): void {
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
          this.groupsFacade.delGroup(this.groupId);
        },
      },
    });

    this.groupDelSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((success) => !!success),
      )
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  public editGroup(): void {
    this.groupDetailsItems$
      .pipe(
        takeUntil(this.unsubscribe$),
        first(),
      )
      .subscribe((group) => {
        this.dialogService.open(AddEditGroupComponent, DialogSize.sm, {
          data: {
            group,
            mode: AddEditMode.edit,
          },
        });
      });

    this.groupUpdateSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((success) => !!success),
      )
      .subscribe(() => {
        this.groupsFacade.getGroupDetails(this.groupId);
      });
  }

}
