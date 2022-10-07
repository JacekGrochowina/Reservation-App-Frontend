import { Injectable } from '@angular/core';
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
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable()
export class CarsEffects {

  constructor(
    private actions$: Actions,
    private driversService: CarsService,
    private snackbarService: SnackbarService,
    private store: Store<AppState>,
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

  // getDriversSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(CarsActionTypes.getListSuccess),
  //       map(() =>
  //         this.snackbarService.openBase('Wczytano listę kierowców')
  //       )
  //     ),
  //   { dispatch: false }
  // );

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
        this.snackbarService.openSuccess('Dodano nowy samochód');
        this.store.dispatch(new AddCarClear());
      })
    ),
  { dispatch: false }
  );

  addCarFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CarsActionTypes.addFail),
        map(() => {
          this.snackbarService.openFail('Nie dodano nowego samochodu');
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
        this.snackbarService.openSuccess('Usunięto samochód');
        this.store.dispatch(new DelCarClear());
      })
    ),
  { dispatch: false }
  );

  delCarFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CarsActionTypes.delFail),
        map(() => {
          this.snackbarService.openFail('Nie usunięto samochodu');
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
        this.snackbarService.openSuccess('Edytowano samochód');
        this.store.dispatch(new UpdateCarClear());
      })
    ),
  { dispatch: false }
  );

  updateCarFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CarsActionTypes.updateFail),
        map(() => {
          this.snackbarService.openFail('Nie edytowano samochodu');
          this.store.dispatch(new UpdateCarClear());
        })
      ),
    { dispatch: false }
  );

}
