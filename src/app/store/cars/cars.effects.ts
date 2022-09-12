import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from '../app.state';
import { catchError, map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { CarsService } from './cars.service';
import {
  AddCar,
  AddCarClear,
  AddCarFail,
  AddCarSuccess,
  DelCar,
  DelCarClear,
  DelCarFail,
  DelCarSuccess,
  CarsActionTypes,
  GetListCarsFail,
  GetListCarsSuccess,
  UpdateCar,
  UpdateCarClear,
  UpdateCarFail,
  UpdateCarSuccess,
  GetDetailsCarSuccess,
  GetDetailsCarFail,
  GetDetailsCar,
} from './cars.actions';

@Injectable()
export class CarsEffects {

  constructor(
    private actions$: Actions,
    private driversService: CarsService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  getCarsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarsActionTypes.getList),
      switchMap(() =>
        this.driversService.getCarsList().pipe(
          map((response) => new GetListCarsSuccess(response)),
          catchError((error) => of(new GetListCarsFail(error)))
        )
      )
    )
  );

  getCarDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarsActionTypes.getDetails),
      switchMap((action: GetDetailsCar) =>
        this.driversService.getCarDetails(action.payload).pipe(
          map((response) => new GetDetailsCarSuccess(response)),
          catchError((error) => of(new GetDetailsCarFail(error)))
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

  addCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarsActionTypes.add),
      mergeMap((action: AddCar) =>
        this.driversService.addCar(action.payload).pipe(
          tap((response) => {
            this.store.dispatch(new AddCarSuccess());
          }),
          catchError((error) => of(new AddCarFail(error)))
        )
      ),
      switchMap(() =>
        this.driversService.getCarsList().pipe(
          map((response) => new GetListCarsSuccess(response)),
          catchError((error) => of(new GetListCarsFail(error)))
        )
      )
    )
  );

  addCarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarsActionTypes.addSuccess),
      map(() => {
        this.snackBar.open('Dodano pomyślnie nowy samochód', 'Ok', {
          duration: 3500,
        });
        this.store.dispatch(new AddCarClear());
      })
    ),
  { dispatch: false }
  );

  delCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarsActionTypes.del),
      mergeMap((action: DelCar) =>
        this.driversService.delCar(action.payload).pipe(
          tap((response) => {
            this.store.dispatch(new DelCarSuccess());
          }),
          catchError((error) => of(new DelCarFail(error)))
        )
      ),
      switchMap(() =>
        this.driversService.getCarsList().pipe(
          map((response) => new GetListCarsSuccess(response)),
          catchError((error) => of(new GetListCarsFail(error)))
        )
      )
    )
  );

  delCarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarsActionTypes.delSuccess),
      map(() => {
        this.snackBar.open('Pomyślnie usunięto samochód', 'Ok', {
          duration: 3500,
        });
        this.store.dispatch(new DelCarClear());
      })
    ),
  { dispatch: false }
  );

  updateCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarsActionTypes.update),
      mergeMap((action: UpdateCar) =>
        this.driversService.updateCar(action.payload).pipe(
          tap((response) => {
            this.store.dispatch(new UpdateCarSuccess());
          }),
          catchError((error) => of(new UpdateCarFail(error)))
        )
      ),
      switchMap(() =>
        this.driversService.getCarsList().pipe(
          map((response) => new GetListCarsSuccess(response)),
          catchError((error) => of(new GetListCarsFail(error)))
        )
      )
    )
  );

  updateCarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarsActionTypes.updateSuccess),
      map(() => {
        this.snackBar.open('Pomyślnie edytowano dane samochodu', 'Ok', {
          duration: 3500,
        });
        this.store.dispatch(new UpdateCarClear());
      })
    ),
  { dispatch: false }
  );

}
