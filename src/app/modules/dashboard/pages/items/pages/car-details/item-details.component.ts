import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter, first, takeUntil } from 'rxjs/operators';
import { AddEditItemComponent } from '../../components/add-edit-item/add-edit-item.component';
import { AddEditMode } from '../../../../../../shared/utils/enums/add-edit-mode.enum';
import { DialogService, DialogSize } from '../../../../../../shared/services/dialog.service';
import { ItemsFacade } from '../../../../../../store/items/items.facade';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

  // ========== Selectors Details
  public itemDetailsItems$ = this.itemsFacade.itemDetailsItems$;
  public itemDetailsLoading$ = this.itemsFacade.itemDetailsLoading$;
  public itemDetailsSuccess$ = this.itemsFacade.itemDetailsSuccess$;
  public itemDetailsError$ = this.itemsFacade.itemDetailsError$;

  // ========== Selectors Del
  public itemDelLoading$ = this.itemsFacade.itemDelLoading$;
  public itemDelSuccess$ = this.itemsFacade.itemDelSuccess$;
  public itemDelError$ = this.itemsFacade.itemDelError$;

  // ========== Selectors Update
  public itemUpdateLoading$ = this.itemsFacade.itemUpdateLoading$;
  public itemUpdateSuccess$ = this.itemsFacade.itemUpdateSuccess$;
  public itemUpdateError$ = this.itemsFacade.itemUpdateError$;

  private params: ParamMap = this.route.snapshot.paramMap;
  private unsubscribe$ = new Subject<boolean>();

  get itemId(): number {
    return Number(this.params.get('id'));
  }

  constructor(
    private itemsFacade: ItemsFacade,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.itemsFacade.getItemDetails(this.itemId);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.itemsFacade.clearItemDetails();
  }

  public delItem(): void {
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
          this.itemsFacade.delItem(this.itemId);
        },
      },
    });

    this.itemDelSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((success) => !!success),
      )
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  public editItem(): void {
    this.itemDetailsItems$
      .pipe(
        takeUntil(this.unsubscribe$),
        first(),
      )
      .subscribe((item) => {
        this.dialogService.open(AddEditItemComponent, DialogSize.sm, {
          data: {
            item,
            mode: AddEditMode.edit,
          },
        });
      });

    this.itemUpdateSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((success) => !!success),
      )
      .subscribe(() => {
        this.itemsFacade.getItemDetails(this.itemId);
      });
  }

}
