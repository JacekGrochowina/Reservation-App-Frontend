import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Driver } from './interfaces/driver.interface';

export enum DriversActionTypes {
  getList = '[Drivers/List] Get List Drivers',
  getListSuccess = '[Drivers/List] Get List Drivers Success',
  getListFail = '[Drivers/List] Get List Drivers Fail',
  getListClear = '[Drivers/List] Get List Drivers Clear',
  getListClearError = '[Drivers/List] Get List Drivers Clear Error',

  getDetails = '[Drivers/Details] Get Details Drivers',
  getDetailsSuccess = '[Drivers/Details] Get Details Drivers Success',
  getDetailsFail = '[Drivers/Details] Get Details Drivers Fail',
  getDetailsClear = '[Drivers/Details] Get Details Drivers Clear',
  getDetailsClearError = '[Drivers/Details] Get Details Drivers Clear Error',

  add = '[Drivers/Add] Add Driver',
  addSuccess = '[Drivers/Add] Add Driver Success',
  addFail = '[Drivers/Add] Add Driver Fail',
  addClear = '[Drivers/Add] Add Driver Clear',
  addClearError = '[Drivers/Add] Add Driver Clear Error',

  del = '[Drivers/Del] Del Driver',
  delSuccess = '[Drivers/Del] Del Driver Success',
  delFail = '[Drivers/Del] Del Driver Fail',
  delClear = '[Drivers/Del] Del Driver Clear',
  delClearError = '[Drivers/Del] Del Driver Clear Error',

  update = '[Drivers/Update] Update Driver',
  updateSuccess = '[Drivers/Update] Update Driver Success',
  updateFail = '[Drivers/Update] Update Driver Fail',
  updateClear = '[Drivers/Update] Update Driver Clear',
  updateClearError = '[Drivers/Update] Update Driver Clear Error',
}

// ========== Get Drivers
export class GetListDrivers implements Action {
  readonly type = DriversActionTypes.getList;
}

export class GetListDriversSuccess implements Action {
  readonly type = DriversActionTypes.getListSuccess;

  constructor(public payload: Driver[]) {}
}

export class GetListDriversFail implements Action {
  readonly type = DriversActionTypes.getListFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetListDriversClear implements Action {
  readonly type = DriversActionTypes.getListClear;
}

export class GetListDriversClearError implements Action {
  readonly type = DriversActionTypes.getListClearError;
}

// ========== Get Details Driver
export class GetDetailsDriver implements Action {
  readonly type = DriversActionTypes.getDetails;

  constructor(public payload: number) {}
}

export class GetDetailsDriverSuccess implements Action {
  readonly type = DriversActionTypes.getDetailsSuccess;

  constructor(public payload: Driver) {}
}

export class GetDetailsDriverFail implements Action {
  readonly type = DriversActionTypes.getDetailsFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetDetailsDriverClear implements Action {
  readonly type = DriversActionTypes.getDetailsClear;
}

export class GetDetailsDriverClearError implements Action {
  readonly type = DriversActionTypes.getDetailsClearError;
}

// ========== Add Driver
export class AddDriver implements Action {
  readonly type = DriversActionTypes.add;

  constructor(public payload: Driver) {}
}

export class AddDriverSuccess implements Action {
  readonly type = DriversActionTypes.addSuccess;
}

export class AddDriverFail implements Action {
  readonly type = DriversActionTypes.addFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class AddDriverClear implements Action {
  readonly type = DriversActionTypes.addClear;
}

export class AddDriverClearError implements Action {
  readonly type = DriversActionTypes.addClearError;
}

// ========== Del Driver
export class DelDriver implements Action {
  readonly type = DriversActionTypes.del;

  constructor(public payload: number) {}
}

export class DelDriverSuccess implements Action {
  readonly type = DriversActionTypes.delSuccess;
}

export class DelDriverFail implements Action {
  readonly type = DriversActionTypes.delFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class DelDriverClear implements Action {
  readonly type = DriversActionTypes.delClear;
}

export class DelDriverClearError implements Action {
  readonly type = DriversActionTypes.delClearError;
}

// ========== Update Driver
export class UpdateDriver implements Action {
  readonly type = DriversActionTypes.update;

  constructor(public payload: Driver) {}
}

export class UpdateDriverSuccess implements Action {
  readonly type = DriversActionTypes.updateSuccess;
}

export class UpdateDriverFail implements Action {
  readonly type = DriversActionTypes.updateFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateDriverClear implements Action {
  readonly type = DriversActionTypes.updateClear;
}

export class UpdateDriverClearError implements Action {
  readonly type = DriversActionTypes.updateClearError;
}

export type DriversActions =
  | GetListDrivers
  | GetListDriversSuccess
  | GetListDriversFail
  | GetListDriversClear
  | GetListDriversClearError
  | GetDetailsDriver
  | GetDetailsDriverSuccess
  | GetDetailsDriverFail
  | GetDetailsDriverClear
  | GetDetailsDriverClearError
  | AddDriver
  | AddDriverSuccess
  | AddDriverFail
  | AddDriverClear
  | AddDriverClearError
  | DelDriver
  | DelDriverSuccess
  | DelDriverFail
  | DelDriverClear
  | DelDriverClearError
  | UpdateDriver
  | UpdateDriverSuccess
  | UpdateDriverFail
  | UpdateDriverClear
  | UpdateDriverClearError;
