import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './auth.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthActionTypes, AuthLogin, AuthLoginClear, AuthLoginFail, AuthLoginSuccess, AuthSetJwtToken } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private store: Store<AppState>,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.login),
      switchMap((action: AuthLogin) =>
        this.authService.login(action.payload).pipe(
          switchMap((response) => [
            new AuthLoginSuccess(response),
          ]),
          catchError((error) => of(new AuthLoginFail(error)))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.loginSuccess),
      switchMap((action: AuthLoginSuccess) => [
        this.store.dispatch(new AuthSetJwtToken(action.payload)),
        this.snackbarService.openSuccess('Zalogowano pomyślnie'),
      ])
    ),
    { dispatch: false }
  );

  loginFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActionTypes.loginFail),
        map(() => this.snackbarService.openFail('Nie udało się zalogować'))
      ),
    { dispatch: false }
  );

  setJwtToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.setJwtToken),
      switchMap((action: AuthSetJwtToken) => [
        this.authService.setJwtToken(action.payload),
      ])
    ),
    { dispatch: false }
  );

}
