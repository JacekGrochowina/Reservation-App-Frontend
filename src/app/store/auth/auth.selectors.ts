import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { Loading } from '../../shared/utils/interfaces/loading.interface';
import { JwtState } from './interfaces/jwt.interface';
import { UserState } from './interfaces/user.interface';

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

// ========== Selectors Current User
const selectAuthCurrentUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

// Name
export const selectAuthCurrentUserName = createSelector(
  selectAuthCurrentUser,
  (state: UserState) => state.name
);

// Surname
export const selectAuthCurrentUserSurname = createSelector(
  selectAuthCurrentUser,
  (state: UserState) => state.surname
);

// Email
export const selectAuthCurrentUserEmail = createSelector(
  selectAuthCurrentUser,
  (state: UserState) => state.email
);

// Loading
export const selectAuthCurrentUserLoading = createSelector(
  selectAuthCurrentUser,
  (state: UserState) => state.loading
);

// Success
export const selectAuthCurrentUserSuccess = createSelector(
  selectAuthCurrentUser,
  (state: UserState) => state.success
);

// Error
export const selectAuthCurrentUserError = createSelector(
  selectAuthCurrentUser,
  (state: UserState) => state.error
);
