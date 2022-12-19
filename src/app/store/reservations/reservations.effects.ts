import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from '../app.state';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { ReservationsService } from './reservations.service';
import {
  AddReservation,
  AddReservationClear,
  AddReservationFail,
  AddReservationSuccess,
  DelReservation,
  DelReservationClear,
  DelReservationFail,
  DelReservationSuccess,
  ReservationsActionTypes,
  GetListReservationsFail,
  GetListReservationsSuccess,
  UpdateReservation,
  UpdateReservationClear,
  UpdateReservationFail,
  UpdateReservationSuccess,
  GetDetailsReservationSuccess,
  GetDetailsReservationFail,
  GetDetailsReservation,
  GetListReservations,
} from './reservations.actions';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable()
export class ReservationsEffects {

  constructor(
    private actions$: Actions,
    private reservationsService: ReservationsService,
    private snackbarService: SnackbarService,
    private store: Store<AppState>,
  ) {}

  getReservationsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActionTypes.getList),
      switchMap((action: GetListReservations) =>
        this.reservationsService.getReservationsList(action.payload).pipe(
          map((response) => new GetListReservationsSuccess(response)),
          catchError((error) => of(new GetListReservationsFail(error)))
        )
      )
    )
  );

  getReservationDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActionTypes.getDetails),
      switchMap((action: GetDetailsReservation) =>
        this.reservationsService.getReservationDetails(action.payload).pipe(
          map((response) => new GetDetailsReservationSuccess(response)),
          catchError((error) => of(new GetDetailsReservationFail(error)))
        )
      )
    )
  );

  addReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActionTypes.add),
      switchMap((action: AddReservation) =>
        this.reservationsService.addReservation(action.payload).pipe(
          switchMap((response) => [
            new AddReservationSuccess(),
            new GetListReservations(),
          ]),
          catchError((error) => of(new AddReservationFail(error)))
        )
      )
    )
  );

  addReservationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActionTypes.addSuccess),
      map(() => {
        this.snackbarService.openSuccess('Dodano nową rezerwację');
        this.store.dispatch(new AddReservationClear());
      })
    ),
  { dispatch: false }
  );

  addReservationFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ReservationsActionTypes.addFail),
        map(() => {
          this.snackbarService.openFail('Nie dodano nowej rezerwacji');
          this.store.dispatch(new AddReservationClear());
        })
      ),
    { dispatch: false }
  );

  delReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActionTypes.del),
      switchMap((action: DelReservation) =>
        this.reservationsService.delReservation(action.payload).pipe(
          switchMap((response) => [
            new DelReservationSuccess(),
            new GetListReservations(),
          ]),
          catchError((error) => of(new DelReservationFail(error)))
        )
      ),
    )
  );

  delReservationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActionTypes.delSuccess),
      map(() => {
        this.snackbarService.openSuccess('Usunięto rezerwację');
        this.store.dispatch(new DelReservationClear());
      })
    ),
  { dispatch: false }
  );

  delReservationFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ReservationsActionTypes.delFail),
        map(() => {
          this.snackbarService.openFail('Nie usunięto rezerwacji');
          this.store.dispatch(new DelReservationClear());
        })
      ),
    { dispatch: false }
  );

  updateReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActionTypes.update),
      mergeMap((action: UpdateReservation) =>
        this.reservationsService.updateReservation(action.payload).pipe(
          switchMap((response) => [
            new UpdateReservationSuccess(),
            new GetListReservations(),
          ]),
          catchError((error) => of(new UpdateReservationFail(error)))
        )
      ),
    )
  );

  updateReservationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationsActionTypes.updateSuccess),
      map(() => {
        this.snackbarService.openSuccess('Edytowano rezerwację');
        this.store.dispatch(new UpdateReservationClear());
      })
    ),
  { dispatch: false }
  );

  updateReservationFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ReservationsActionTypes.updateFail),
        map(() => {
          this.snackbarService.openFail('Nie edytowano rezerwacji');
          this.store.dispatch(new UpdateReservationClear());
        })
      ),
    { dispatch: false }
  );

}
