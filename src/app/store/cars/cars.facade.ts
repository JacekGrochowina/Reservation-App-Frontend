import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Car } from './interfaces/car.interface';
import {
  AddCar,
  DelCar, GetDetailsCar, GetDetailsCarClear,
  GetListCars,
  UpdateCar,
} from './cars.actions';
import {
  selectCarDetailsError,
  selectCarDetailsItems,
  selectCarDetailsLoading,
  selectCarDetailsSuccess,
  selectCarAddError,
  selectCarAddLoading,
  selectCarAddSuccess,
  selectCarDelError,
  selectCarDelLoading,
  selectCarDelSuccess,
  selectCarsListError,
  selectCarsListItems,
  selectCarsListLoading,
  selectCarsListSuccess,
  selectCarUpdateError,
  selectCarUpdateLoading,
  selectCarUpdateSuccess,
} from './cars.selectors';
import { CarUpdatePayload } from './interfaces/payloads/car-update.payload';
import { CarAddPayload } from './interfaces/payloads/car-add.payload';

@Injectable()
export class CarsFacade {

  // ========== Selectors List
  carsListItems$ = this.store.select(selectCarsListItems);
  carsListLoading$ = this.store.select(selectCarsListLoading);
  carsListSuccess$ = this.store.select(selectCarsListSuccess);
  carsListError$ = this.store.select(selectCarsListError);

  // ========== Selectors Details
  carDetailsItems$ = this.store.select(selectCarDetailsItems);
  carDetailsLoading$ = this.store.select(selectCarDetailsLoading);
  carDetailsSuccess$ = this.store.select(selectCarDetailsSuccess);
  carDetailsError$ = this.store.select(selectCarDetailsError);

  // ========== Selectors Add
  carAddLoading$ = this.store.select(selectCarAddLoading);
  carAddSuccess$ = this.store.select(selectCarAddSuccess);
  carAddError$ = this.store.select(selectCarAddError);

  // ========== Selectors Del
  carDelLoading$ = this.store.select(selectCarDelLoading);
  carDelSuccess$ = this.store.select(selectCarDelSuccess);
  carDelError$ = this.store.select(selectCarDelError);

  // ========== Selectors Update
  carUpdateLoading$ = this.store.select(selectCarUpdateLoading);
  carUpdateSuccess$ = this.store.select(selectCarUpdateSuccess);
  carUpdateError$ = this.store.select(selectCarUpdateError);

  constructor(private store: Store<AppState>) {}

  public getCarsList(): void {
    this.store.dispatch(new GetListCars());
  }

  public getCarDetails(carID: number): void {
    this.store.dispatch(new GetDetailsCar(carID));
  }

  public clearCarDetails(): void {
    this.store.dispatch(new GetDetailsCarClear());
  }

  public addCar(driver: CarAddPayload): void {
    this.store.dispatch(new AddCar(driver));
  }

  public delCar(driverID: number): void {
    this.store.dispatch(new DelCar(driverID));
  }

  public updateCar(car: CarUpdatePayload): void {
    this.store.dispatch(new UpdateCar(car));
  }

}
