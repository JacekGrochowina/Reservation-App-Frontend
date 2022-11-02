import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { Loading } from '../../shared/utils/interfaces/loading.interface';
import { JwtState } from './interfaces/jwt.interface';

const selectAuth = (state: AppState) => state.auth;

// ========== Selectors Login
const selectAuthLogin = createSelector(
  selectAuth,
  (state: AuthState) => state.login
);

// Loading
export const selectAuthLoginLoading = createSelector(
  selectAuthLogin,
  (state: Loading) => state.loading
);

// Success
export const selectAuthLoginSuccess = createSelector(
  selectAuthLogin,
  (state: Loading) => state.success
);

// Error
export const selectAuthLoginError = createSelector(
  selectAuthLogin,
  (state: Loading) => state.error
);

// ========== Selectors Register
const selectAuthRegister = createSelector(
  selectAuth,
  (state: AuthState) => state.register
);

// Loading
export const selectAuthRegisterLoading = createSelector(
  selectAuthRegister,
  (state: Loading) => state.loading
);

// Success
export const selectAuthRegisterSuccess = createSelector(
  selectAuthRegister,
  (state: Loading) => state.success
);

// Error
export const selectAuthRegisterError = createSelector(
  selectAuthRegister,
  (state: Loading) => state.error
);

// ========== Selectors IsLogged
export const selectAuthIsLogged = createSelector(
  selectAuth,
  (state: AuthState) => state.isLogged
);

// ========== Selectors Jwt
const selectAuthJwt = createSelector(
  selectAuth,
  (state: AuthState) => state.jwt
);

// Token
export const selectAuthJwtToken = createSelector(
  selectAuthJwt,
  (state: JwtState) => state.token
);

