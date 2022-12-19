import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { ReservationUpdatePayload } from './interfaces/payloads/reservation-update.payload';
import { ReservationAddPayload } from './interfaces/payloads/reservation-add.payload';
import { ReservationExtendsResponse } from './interfaces/responses/reservation-extends.response';
import { ReservationListPayload } from './interfaces/payloads/reservation-list.payload';

export enum ReservationsActionTypes {
  getList = '[Reservations/List] Get List Reservations',
  getListSuccess = '[Reservations/List] Get List Reservations Success',
  getListFail = '[Reservations/List] Get List Reservations Fail',
  getListClear = '[Reservations/List] Get List Reservations Clear',
  getListClearError = '[Reservations/List] Get List Reservations Clear Error',

  getDetails = '[Reservations/Details] Get Details Reservation',
  getDetailsSuccess = '[Reservations/Details] Get Details Reservation Success',
  getDetailsFail = '[Reservations/Details] Get Details Reservation Fail',
  getDetailsClear = '[Reservations/Details] Get Details Reservation Clear',
  getDetailsClearError = '[Reservations/Details] Get Details Reservation Clear Error',

  add = '[Reservations/Add] Add Reservation',
  addSuccess = '[Reservations/Add] Add Reservation Success',
  addFail = '[Reservations/Add] Add Reservation Fail',
  addClear = '[Reservations/Add] Add Reservation Clear',
  addClearError = '[Reservations/Add] Add Reservation Clear Error',

  del = '[Reservations/Del] Del Reservation',
  delSuccess = '[Reservations/Del] Del Reservation Success',
  delFail = '[Reservations/Del] Del Reservation Fail',
  delClear = '[Reservations/Del] Del Reservation Clear',
  delClearError = '[Reservations/Del] Del Reservation Clear Error',

  update = '[Reservations/Update] Update Reservation',
  updateSuccess = '[Reservations/Update] Update Reservation Success',
  updateFail = '[Reservations/Update] Update Reservation Fail',
  updateClear = '[Reservations/Update] Update Reservation Clear',
  updateClearError = '[Reservations/Update] Update Reservation Clear Error',
}

// ========== Get Reservations
export class GetListReservations implements Action {
  readonly type = ReservationsActionTypes.getList;

  constructor(public payload?: ReservationListPayload) {}
}

export class GetListReservationsSuccess implements Action {
  readonly type = ReservationsActionTypes.getListSuccess;

  constructor(public payload: ReservationExtendsResponse[]) {}
}

export class GetListReservationsFail implements Action {
  readonly type = ReservationsActionTypes.getListFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetListReservationsClear implements Action {
  readonly type = ReservationsActionTypes.getListClear;
}

export class GetListReservationsClearError implements Action {
  readonly type = ReservationsActionTypes.getListClearError;
}

// ========== Get Details Reservation
export class GetDetailsReservation implements Action {
  readonly type = ReservationsActionTypes.getDetails;

  constructor(public payload: number) {}
}

export class GetDetailsReservationSuccess implements Action {
  readonly type = ReservationsActionTypes.getDetailsSuccess;

  constructor(public payload: ReservationExtendsResponse) {}
}

export class GetDetailsReservationFail implements Action {
  readonly type = ReservationsActionTypes.getDetailsFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetDetailsReservationClear implements Action {
  readonly type = ReservationsActionTypes.getDetailsClear;
}

export class GetDetailsReservationClearError implements Action {
  readonly type = ReservationsActionTypes.getDetailsClearError;
}

// ========== Add Reservation
export class AddReservation implements Action {
  readonly type = ReservationsActionTypes.add;

  constructor(public payload: ReservationAddPayload) {}
}

export class AddReservationSuccess implements Action {
  readonly type = ReservationsActionTypes.addSuccess;
}

export class AddReservationFail implements Action {
  readonly type = ReservationsActionTypes.addFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class AddReservationClear implements Action {
  readonly type = ReservationsActionTypes.addClear;
}

export class AddReservationClearError implements Action {
  readonly type = ReservationsActionTypes.addClearError;
}

// ========== Del Reservation
export class DelReservation implements Action {
  readonly type = ReservationsActionTypes.del;

  constructor(public payload: number) {}
}

export class DelReservationSuccess implements Action {
  readonly type = ReservationsActionTypes.delSuccess;
}

export class DelReservationFail implements Action {
  readonly type = ReservationsActionTypes.delFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class DelReservationClear implements Action {
  readonly type = ReservationsActionTypes.delClear;
}

export class DelReservationClearError implements Action {
  readonly type = ReservationsActionTypes.delClearError;
}

// ========== Update Reservation
export class UpdateReservation implements Action {
  readonly type = ReservationsActionTypes.update;

  constructor(public payload: ReservationUpdatePayload) {}
}

export class UpdateReservationSuccess implements Action {
  readonly type = ReservationsActionTypes.updateSuccess;
}

export class UpdateReservationFail implements Action {
  readonly type = ReservationsActionTypes.updateFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateReservationClear implements Action {
  readonly type = ReservationsActionTypes.updateClear;
}

export class UpdateReservationClearError implements Action {
  readonly type = ReservationsActionTypes.updateClearError;
}

export type ReservationsActions =
  | GetListReservations
  | GetListReservationsSuccess
  | GetListReservationsFail
  | GetListReservationsClear
  | GetListReservationsClearError
  | GetDetailsReservation
  | GetDetailsReservationSuccess
  | GetDetailsReservationFail
  | GetDetailsReservationClear
  | GetDetailsReservationClearError
  | AddReservation
  | AddReservationSuccess
  | AddReservationFail
  | AddReservationClear
  | AddReservationClearError
  | DelReservation
  | DelReservationSuccess
  | DelReservationFail
  | DelReservationClear
  | DelReservationClearError
  | UpdateReservation
  | UpdateReservationSuccess
  | UpdateReservationFail
  | UpdateReservationClear
  | UpdateReservationClearError;
