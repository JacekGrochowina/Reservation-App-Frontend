import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  AddReservation,
  DelReservation,
  GetDetailsReservation,
  GetDetailsReservationClear,
  GetListReservations,
  UpdateReservation,
} from './reservations.actions';
import {
  selectReservationDetailsError,
  selectReservationDetailsItem,
  selectReservationDetailsLoading,
  selectReservationDetailsSuccess,
  selectReservationAddError,
  selectReservationAddLoading,
  selectReservationAddSuccess,
  selectReservationDelError,
  selectReservationDelLoading,
  selectReservationDelSuccess,
  selectReservationsListError,
  selectReservationsListItems,
  selectReservationsListLoading,
  selectReservationsListSuccess,
  selectReservationUpdateError,
  selectReservationUpdateLoading,
  selectReservationUpdateSuccess,
} from './reservations.selectors';
import { ReservationUpdatePayload } from './interfaces/payloads/reservation-update.payload';
import { ReservationAddPayload } from './interfaces/payloads/reservation-add.payload';

@Injectable()
export class ReservationsFacade {

  // ========== Selectors List
  reservationsListItems$ = this.store.select(selectReservationsListItems);
  reservationsListLoading$ = this.store.select(selectReservationsListLoading);
  reservationsListSuccess$ = this.store.select(selectReservationsListSuccess);
  reservationsListError$ = this.store.select(selectReservationsListError);

  // ========== Selectors Details
  reservationDetailsItems$ = this.store.select(selectReservationDetailsItem);
  reservationDetailsLoading$ = this.store.select(selectReservationDetailsLoading);
  reservationDetailsSuccess$ = this.store.select(selectReservationDetailsSuccess);
  reservationDetailsError$ = this.store.select(selectReservationDetailsError);

  // ========== Selectors Add
  reservationAddLoading$ = this.store.select(selectReservationAddLoading);
  reservationAddSuccess$ = this.store.select(selectReservationAddSuccess);
  reservationAddError$ = this.store.select(selectReservationAddError);

  // ========== Selectors Del
  reservationDelLoading$ = this.store.select(selectReservationDelLoading);
  reservationDelSuccess$ = this.store.select(selectReservationDelSuccess);
  reservationDelError$ = this.store.select(selectReservationDelError);

  // ========== Selectors Update
  reservationUpdateLoading$ = this.store.select(selectReservationUpdateLoading);
  reservationUpdateSuccess$ = this.store.select(selectReservationUpdateSuccess);
  reservationUpdateError$ = this.store.select(selectReservationUpdateError);

  constructor(private store: Store<AppState>) {}

  public getReservationsList(): void {
    this.store.dispatch(new GetListReservations());
  }

  public getReservationDetails(reservationID: number): void {
    this.store.dispatch(new GetDetailsReservation(reservationID));
  }

  public clearReservationDetails(): void {
    this.store.dispatch(new GetDetailsReservationClear());
  }

  public addReservation(reservation: ReservationAddPayload): void {
    this.store.dispatch(new AddReservation(reservation));
  }

  public delReservation(reservationID: number): void {
    this.store.dispatch(new DelReservation(reservationID));
  }

  public updateReservation(reservation: ReservationUpdatePayload): void {
    this.store.dispatch(new UpdateReservation(reservation));
  }

}
