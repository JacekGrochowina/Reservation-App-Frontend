import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarsFacade } from '../../../../store/cars/cars.facade';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter, first, takeUntil } from 'rxjs/operators';
import { AddEditCarComponent } from '../../components/add-edit-car/add-edit-car.component';
import { AddEditMode } from '../../../../shared/utils/enums/add-edit-mode.enum';
import { DialogService, DialogSize } from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit, OnDestroy {

  // ========== Selectors Details
  public carDetailsItems$ = this.carsFacade.carDetailsItems$;
  public carDetailsLoading$ = this.carsFacade.carDetailsLoading$;
  public carDetailsSuccess$ = this.carsFacade.carDetailsSuccess$;
  public carDetailsError$ = this.carsFacade.carDetailsError$;

  // ========== Selectors Del
  public carDelLoading$ = this.carsFacade.carDelLoading$;
  public carDelSuccess$ = this.carsFacade.carDelSuccess$;
  public carDelError$ = this.carsFacade.carDelError$;

  // ========== Selectors Update
  public carUpdateLoading$ = this.carsFacade.carUpdateLoading$;
  public carUpdateSuccess$ = this.carsFacade.carUpdateSuccess$;
  public carUpdateError$ = this.carsFacade.carUpdateError$;

  private params: ParamMap = this.route.snapshot.paramMap;
  private unsubscribe$ = new Subject<boolean>();

  get carId(): number {
    return Number(this.params.get('id'));
  }

  constructor(
    private carsFacade: CarsFacade,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.carsFacade.getCarDetails(this.carId);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.carsFacade.clearCarDetails();
  }

  public delCar(): void {
    this.dialogService.open(ConfirmDialogComponent, DialogSize.xs, {
      data: {
        title: 'Usuwanie samochodu',
        message: 'Czy napewno chcesz usunąć ten samochód?',
        confirmLabel: 'Usuń',
        dismissLabel: 'Anuluj',
        isAsync: true,
        close$: this.carDelSuccess$,
        loading$: this.carDelLoading$,
        errors$: this.carDelError$,
        confirmed: () => {
          this.carsFacade.delCar(this.carId);
        },
      },
    });

    this.carDelSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((success) => !!success),
      )
      .subscribe(() => {
        this.router.navigate(['../../']);
      });
  }

  public editCar(): void {
    this.carDetailsItems$
      .pipe(
        takeUntil(this.unsubscribe$),
        first(),
      )
      .subscribe((car) => {
        this.dialogService.open(AddEditCarComponent, DialogSize.sm, {
          data: {
            car,
            mode: AddEditMode.edit,
          },
        });
      });

    this.carUpdateSuccess$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((success) => !!success),
      )
      .subscribe(() => {
        this.carsFacade.getCarDetails(this.carId);
      });
  }

}
