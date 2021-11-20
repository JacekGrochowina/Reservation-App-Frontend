import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Driver } from '../utils/interfaces/driver.interface';

export enum DriversActionTypes {
  get = '[Drivers] Get Drivers',
  getSuccess = '[Drivers] Get Drivers Success',
  getFail = '[Drivers] Get Drivers Fail',
  getClear = '[Drivers] Get Drivers Clear',

  add = '[Drivers] Add Driver',
  addSuccess = '[Drivers] Add Driver Success',
  addFail = '[Drivers] Add Driver Fail',
  addClear = '[Drivers] Add Driver Clear',

  del = '[Drivers] Del Driver',
  delSuccess = '[Drivers] Del Driver Success',
  delFail = '[Drivers] Del Driver Fail',
  delClear = '[Drivers] Del Driver Clear',

  update = '[Drivers] Update Driver',
  updateSuccess = '[Drivers] Update Driver Success',
  updateFail = '[Drivers] Update Driver Fail',
  updateClear = '[Drivers] Update Driver Clear',
}

// ========== Get Drivers
export class GetDrivers implements Action {
  readonly type = DriversActionTypes.get;
}

export class GetDriversSuccess implements Action {
  readonly type = DriversActionTypes.getSuccess;

  constructor(public payload: Driver[]) {}
}

export class GetDriversFail implements Action {
  readonly type = DriversActionTypes.getFail;

  constructor(public payload: HttpErrorResponse) {}
}

// ========== Add Driver
export class AddDriver implements Action {
  readonly type = DriversActionTypes.add;

  constructor(public payload: Driver) {}
}

export class AddDriverSuccess implements Action {
  readonly type = DriversActionTypes.addSuccess;

  constructor() {}
}

export class AddDriverFail implements Action {
  readonly type = DriversActionTypes.addFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class AddDriverClear implements Action {
  readonly type = DriversActionTypes.addClear;

  constructor() {}
}

// ========== Del Driver
export class DelDriver implements Action {
  readonly type = DriversActionTypes.del;

  constructor(public payload: number) {}
}

export class DelDriverSuccess implements Action {
  readonly type = DriversActionTypes.delSuccess;

  constructor() {}
}

export class DelDriverFail implements Action {
  readonly type = DriversActionTypes.delFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class DelDriverClear implements Action {
  readonly type = DriversActionTypes.delClear;

  constructor() {}
}

// ========== Update Driver
export class UpdateDriver implements Action {
  readonly type = DriversActionTypes.update;

  constructor(public payload: Driver) {}
}

export class UpdateDriverSuccess implements Action {
  readonly type = DriversActionTypes.updateSuccess;

  constructor() {}
}

export class UpdateDriverFail implements Action {
  readonly type = DriversActionTypes.updateFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateDriverClear implements Action {
  readonly type = DriversActionTypes.updateClear;

  constructor() {}
}

export type DriversActions =
  | GetDrivers
  | GetDriversSuccess
  | GetDriversFail
  | AddDriver
  | AddDriverSuccess
  | AddDriverFail
  | AddDriverClear
  | DelDriver
  | DelDriverSuccess
  | DelDriverFail
  | DelDriverClear
  | UpdateDriver
  | UpdateDriverSuccess
  | UpdateDriverFail
  | UpdateDriverClear;
