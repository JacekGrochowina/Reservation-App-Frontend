import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from 'src/app/+state/app.state';
import { catchError, map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { DriversService } from '../services/drivers.service';
import {
  AddDriver,
  AddDriverClear,
  AddDriverFail,
  AddDriverSuccess,
  DelDriver,
  DelDriverClear,
  DelDriverFail,
  DelDriverSuccess,
  DriversActionTypes,
  GetDriversFail,
  GetDriversSuccess,
  UpdateDriver,
  UpdateDriverClear,
  UpdateDriverFail,
  UpdateDriverSuccess,
} from './drivers.actions';

@Injectable()
export class DriversEffects {
  constructor(
    private actions$: Actions,
    private driversService: DriversService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  getDrivers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DriversActionTypes.get),
      switchMap(() =>
        this.driversService.getDrivers().pipe(
          map((response) => new GetDriversSuccess(response)),
          catchError((error) => of(new GetDriversFail(error)))
        )
      )
    )
  );

  // getDriversSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(DriversActionTypes.getSuccess),
  //       map(() =>
  //         this.snackBar.open('Wczytano pomyślnie listę kierowców', 'Ok', {
  //           duration: 1000,
  //         })
  //       )
  //     ),
  //   { dispatch: false }
  // );

  addDriver$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DriversActionTypes.add),
      mergeMap((action: AddDriver) =>
        this.driversService.addDriver(action.payload).pipe(
          tap((response) => {
            this.store.dispatch(new AddDriverSuccess());
          }),
          catchError((error) => of(new AddDriverFail(error)))
        )
      ),
      switchMap(() =>
        this.driversService.getDrivers().pipe(
          map((response) => new GetDriversSuccess(response)),
          catchError((error) => of(new GetDriversFail(error)))
        )
      )
    )
  );

  addDriverSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DriversActionTypes.addSuccess),
        map(() => {
          this.snackBar.open('Dodano pomyślnie nowego kierowcę', 'Ok', {
            duration: 3500,
          });
          this.store.dispatch(new AddDriverClear());
        })
      ),
    { dispatch: false }
  );

  delDriver$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DriversActionTypes.del),
      mergeMap((action: DelDriver) =>
        this.driversService.delDriver(action.payload).pipe(
          tap((response) => {
            this.store.dispatch(new DelDriverSuccess());
          }),
          catchError((error) => of(new DelDriverFail(error)))
        )
      ),
      switchMap(() =>
        this.driversService.getDrivers().pipe(
          map((response) => new GetDriversSuccess(response)),
          catchError((error) => of(new GetDriversFail(error)))
        )
      )
    )
  );

  delDriverSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DriversActionTypes.delSuccess),
        map(() => {
          this.snackBar.open('Pomyślnie usunięto kierowcę', 'Ok', {
            duration: 3500,
          });
          this.store.dispatch(new DelDriverClear());
        })
      ),
    { dispatch: false }
  );

  updateDriver$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DriversActionTypes.update),
      mergeMap((action: UpdateDriver) =>
        this.driversService.updateDriver(action.payload).pipe(
          tap((response) => {
            this.store.dispatch(new UpdateDriverSuccess());
          }),
          catchError((error) => of(new UpdateDriverFail(error)))
        )
      ),
      switchMap(() =>
        this.driversService.getDrivers().pipe(
          map((response) => new GetDriversSuccess(response)),
          catchError((error) => of(new GetDriversFail(error)))
        )
      )
    )
  );

  updateDriverSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DriversActionTypes.updateSuccess),
        map(() => {
          this.snackBar.open('Pomyślnie edytowano dane kierowcy', 'Ok', {
            duration: 3500,
          });
          this.store.dispatch(new UpdateDriverClear());
        })
      ),
    { dispatch: false }
  );
}
