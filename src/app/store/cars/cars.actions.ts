import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Car } from './interfaces/car.interface';
import { CarUpdatePayload } from './interfaces/payloads/car-update.payload';
import { CarAddPayload } from './interfaces/payloads/car-add.payload';

export enum CarsActionTypes {
  getList = '[Cars/List] Get List Cars',
  getListSuccess = '[Cars/List] Get List Cars Success',
  getListFail = '[Cars/List] Get List Cars Fail',
  getListClear = '[Cars/List] Get List Cars Clear',
  getListClearError = '[Cars/List] Get List Cars Clear Error',

  getDetails = '[Cars/Details] Get Cars Drivers',
  getDetailsSuccess = '[Cars/Details] Get Cars Drivers Success',
  getDetailsFail = '[Cars/Details] Get Details Cars Fail',
  getDetailsClear = '[Cars/Details] Get Details Cars Clear',
  getDetailsClearError = '[Cars/Details] Get Details Cars Clear Error',

  add = '[Cars/Add] Add Car',
  addSuccess = '[Cars/Add] Add Car Success',
  addFail = '[Cars/Add] Add Car Fail',
  addClear = '[Cars/Add] Add Car Clear',
  addClearError = '[Cars/Add] Add Car Clear Error',

  del = '[Cars/Del] Del Car',
  delSuccess = '[Cars/Del] Del Car Success',
  delFail = '[Cars/Del] Del Car Fail',
  delClear = '[Cars/Del] Del Car Clear',
  delClearError = '[Cars/Del] Del Car Clear Error',

  update = '[Cars/Update] Update Car',
  updateSuccess = '[Cars/Update] Update Car Success',
  updateFail = '[Cars/Update] Update Car Fail',
  updateClear = '[Cars/Update] Update Car Clear',
  updateClearError = '[Cars/Update] Update Car Clear Error',
}

// ========== Get Cars
export class GetListCars implements Action {
  readonly type = CarsActionTypes.getList;
}

export class GetListCarsSuccess implements Action {
  readonly type = CarsActionTypes.getListSuccess;

  constructor(public payload: Car[]) {}
}

export class GetListCarsFail implements Action {
  readonly type = CarsActionTypes.getListFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetListCarsClear implements Action {
  readonly type = CarsActionTypes.getListClear;
}

export class GetListCarsClearError implements Action {
  readonly type = CarsActionTypes.getListClearError;
}

// ========== Get Details Car
export class GetDetailsCar implements Action {
  readonly type = CarsActionTypes.getDetails;

  constructor(public payload: number) {}
}

export class GetDetailsCarSuccess implements Action {
  readonly type = CarsActionTypes.getDetailsSuccess;

  constructor(public payload: Car) {}
}

export class GetDetailsCarFail implements Action {
  readonly type = CarsActionTypes.getDetailsFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetDetailsCarClear implements Action {
  readonly type = CarsActionTypes.getDetailsClear;
}

export class GetDetailsCarClearError implements Action {
  readonly type = CarsActionTypes.getDetailsClearError;
}

// ========== Add Car
export class AddCar implements Action {
  readonly type = CarsActionTypes.add;

  constructor(public payload: CarAddPayload) {}
}

export class AddCarSuccess implements Action {
  readonly type = CarsActionTypes.addSuccess;
}

export class AddCarFail implements Action {
  readonly type = CarsActionTypes.addFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class AddCarClear implements Action {
  readonly type = CarsActionTypes.addClear;
}

export class AddCarClearError implements Action {
  readonly type = CarsActionTypes.addClearError;
}

// ========== Del Car
export class DelCar implements Action {
  readonly type = CarsActionTypes.del;

  constructor(public payload: number) {}
}

export class DelCarSuccess implements Action {
  readonly type = CarsActionTypes.delSuccess;
}

export class DelCarFail implements Action {
  readonly type = CarsActionTypes.delFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class DelCarClear implements Action {
  readonly type = CarsActionTypes.delClear;
}

export class DelCarClearError implements Action {
  readonly type = CarsActionTypes.delClearError;
}

// ========== Update Car
export class UpdateCar implements Action {
  readonly type = CarsActionTypes.update;

  constructor(public payload: CarUpdatePayload) {}
}

export class UpdateCarSuccess implements Action {
  readonly type = CarsActionTypes.updateSuccess;
}

export class UpdateCarFail implements Action {
  readonly type = CarsActionTypes.updateFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateCarClear implements Action {
  readonly type = CarsActionTypes.updateClear;
}

export class UpdateCarClearError implements Action {
  readonly type = CarsActionTypes.updateClearError;
}

export type CarsActions =
  | GetListCars
  | GetListCarsSuccess
  | GetListCarsFail
  | GetListCarsClear
  | GetListCarsClearError
  | GetDetailsCar
  | GetDetailsCarSuccess
  | GetDetailsCarFail
  | GetDetailsCarClear
  | GetDetailsCarClearError
  | AddCar
  | AddCarSuccess
  | AddCarFail
  | AddCarClear
  | AddCarClearError
  | DelCar
  | DelCarSuccess
  | DelCarFail
  | DelCarClear
  | DelCarClearError
  | UpdateCar
  | UpdateCarSuccess
  | UpdateCarFail
  | UpdateCarClear
  | UpdateCarClearError;
