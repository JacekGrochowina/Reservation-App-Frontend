import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/+state/app.state';
import { LoadingHandler } from 'src/app/shared/utils/interfaces/loading-handler.interface';
import { DriversState } from './drivers.state';
import { DriversListState } from './interfaces/drivers-list.interface';

const selectDrivers = (state: AppState) => state.drivers;

// ========== Selectors List
const selectDriversList = createSelector(
  selectDrivers,
  (state: DriversState) => state.list
);

// Items
export const selectDriversListItems = createSelector(
  selectDriversList,
  (state: DriversListState) => state.items
);

// Loading
export const selectDriversListLoading = createSelector(
  selectDriversList,
  (state: DriversListState) => state.loading
);

// Success
export const selectDriversListSuccess = createSelector(
  selectDriversList,
  (state: DriversListState) => state.success
);

// Error
export const selectDriversListError = createSelector(
  selectDriversList,
  (state: DriversListState) => state.error
);

// ========== Selectors Add
const selectDriversAdd = createSelector(
  selectDrivers,
  (state: DriversState) => state.add
);

// Loading
export const selectDriversAddLoading = createSelector(
  selectDriversAdd,
  (state: LoadingHandler) => state.loading
);

// Success
export const selectDriversAddSuccess = createSelector(
  selectDriversAdd,
  (state: LoadingHandler) => state.success
);

// Error
export const selectDriversAddError = createSelector(
  selectDriversAdd,
  (state: LoadingHandler) => state.error
);

// ========== Selectors Del
const selectDriversDel = createSelector(
  selectDrivers,
  (state: DriversState) => state.del
);

// Loading
export const selectDriversDelLoading = createSelector(
  selectDriversDel,
  (state: LoadingHandler) => state.loading
);

// Success
export const selectDriversDelSuccess = createSelector(
  selectDriversDel,
  (state: LoadingHandler) => state.success
);

// Error
export const selectDriversDelError = createSelector(
  selectDriversDel,
  (state: LoadingHandler) => state.error
);

// ========== Selectors Update
const selectDriversUpdate = createSelector(
  selectDrivers,
  (state: DriversState) => state.update
);

// Loading
export const selectDriversUpdateLoading = createSelector(
  selectDriversUpdate,
  (state: LoadingHandler) => state.loading
);

// Success
export const selectDriversUpdateSuccess = createSelector(
  selectDriversUpdate,
  (state: LoadingHandler) => state.success
);

// Error
export const selectDriversUpdateError = createSelector(
  selectDriversUpdate,
  (state: LoadingHandler) => state.error
);
