import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Driver } from './interfaces/driver.interface';
import {
  AddDriver,
  DelDriver, GetDetailsDriver,
  GetListDrivers,
  UpdateDriver,
} from './drivers.actions';
import {
  selectDriverDetailsError,
  selectDriverDetailsItems,
  selectDriverDetailsLoading,
  selectDriverDetailsSuccess,
  selectDriversAddError,
  selectDriversAddLoading,
  selectDriversAddSuccess,
  selectDriversDelError,
  selectDriversDelLoading,
  selectDriversDelSuccess,
  selectDriversListError,
  selectDriversListItems,
  selectDriversListLoading,
  selectDriversListSuccess,
  selectDriversUpdateError,
  selectDriversUpdateLoading,
  selectDriversUpdateSuccess,
} from './drivers.selectors';

@Injectable()
export class DriversFacade {

  // ========== Selectors List
  driversListItems$ = this.store.select(selectDriversListItems);
  driversListLoading$ = this.store.select(selectDriversListLoading);
  driversListSuccess$ = this.store.select(selectDriversListSuccess);
  driversListError$ = this.store.select(selectDriversListError);

  // ========== Selectors Details
  driverDetailsItems$ = this.store.select(selectDriverDetailsItems);
  driverDetailsLoading$ = this.store.select(selectDriverDetailsLoading);
  driverDetailsSuccess$ = this.store.select(selectDriverDetailsSuccess);
  driverDetailsError$ = this.store.select(selectDriverDetailsError);

  // ========== Selectors Add
  driverAddLoading$ = this.store.select(selectDriversAddLoading);
  driverAddSuccess$ = this.store.select(selectDriversAddSuccess);
  driverAddError$ = this.store.select(selectDriversAddError);

  // ========== Selectors Del
  driverDelLoading$ = this.store.select(selectDriversDelLoading);
  driverDelSuccess$ = this.store.select(selectDriversDelSuccess);
  driverDelError$ = this.store.select(selectDriversDelError);

  // ========== Selectors Update
  driverUpdateLoading$ = this.store.select(selectDriversUpdateLoading);
  driverUpdateSuccess$ = this.store.select(selectDriversUpdateSuccess);
  driverUpdateError$ = this.store.select(selectDriversUpdateError);

  constructor(private store: Store<AppState>) {}

  getDriversList(): void {
    this.store.dispatch(new GetListDrivers());
  }

  getDriverDetails(driverID: number): void {
    this.store.dispatch(new GetDetailsDriver(driverID));
  }

  addDriver(driver: Driver): void {
    this.store.dispatch(new AddDriver(driver));
  }

  delDriver(driverID: number): void {
    this.store.dispatch(new DelDriver(driverID));
  }

  updateDriver(driver: Driver): void {
    this.store.dispatch(new UpdateDriver(driver));
  }
}
