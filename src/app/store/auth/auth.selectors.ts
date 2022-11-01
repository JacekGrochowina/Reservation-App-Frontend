import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { Loading } from '../../shared/utils/interfaces/loading.interface';

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
