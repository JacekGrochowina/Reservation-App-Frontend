import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { CarsFacade } from '../../../../store/cars/cars.facade';
import { AddEditCarComponent } from '../add-edit-car/add-edit-car.component';
import { Car } from '../../../../store/cars/interfaces/car.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss'],
})
export class CarsTableComponent implements OnInit {

  // ========== Selectors List
  public carsListItems$ = this.carsFacade.carsListItems$;
  public carsListLoading$ = this.carsFacade.carsListLoading$;
  public carsListSuccess$ = this.carsFacade.carsListSuccess$;
  public carsListError$ = this.carsFacade.carsListError$;

  // ========== Selectors Add
  public carAddLoading$ = this.carsFacade.carAddLoading$;
  public carAddSuccess$ = this.carsFacade.carAddSuccess$;
  public carAddError$ = this.carsFacade.carAddError$;

  // ========== Selectors Del
  public carDelLoading$ = this.carsFacade.carDelLoading$;
  public carDelSuccess$ = this.carsFacade.carDelSuccess$;
  public carDelError$ = this.carsFacade.carDelError$;

  // ========== Selectors Update
  public carUpdateLoading$ = this.carsFacade.carUpdateLoading$;
  public carUpdateSuccess$ = this.carsFacade.carUpdateSuccess$;
  public carUpdateError$ = this.carsFacade.carUpdateError$;

  public displayedColumns: string[] = [
    'brand',
    'model',
    'valueOfCar',
    'createdAt',
    'updatedAt',
    'action',
  ];

  constructor(
    private carsFacade: CarsFacade,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.carsFacade.getCarsList();
  }

  public editCar(car: Car): void {
    this.dialog.open(AddEditCarComponent, {
      data: {
        car,
        mode: AddEditMode.edit,
      },
      maxWidth: '500px',
    });
  }

  public delCar(carID: number): void {
    this.dialog.open(ConfirmDialogComponent, {
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
          this.carsFacade.delCar(carID);
        },
      },
      width: '90%',
      maxWidth: '400px',
    });
  }

  public goToDetailsCar(carID: number): void {
    this.router.navigate([`/details/${carID}`]);
  }

}
