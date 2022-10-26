import { createSelector } from '@ngrx/store';
import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { AppState } from '../app.state';
import { CarsState } from './cars.state';
import { CarsListState } from './interfaces/cars-list.interface';
import { CarDetailsState } from './interfaces/car-details.interface';

const selectDrivers = (state: AppState) => state.drivers;

// ========== Selectors List
const selectCarsList = createSelector(
  selectDrivers,
  (state: CarsState) => state.list
);

// Items
export const selectCarsListItems = createSelector(
  selectCarsList,
  (state: CarsListState) => state.items
);

// Loading
export const selectCarsListLoading = createSelector(
  selectCarsList,
  (state: CarsListState) => state.loading
);

// Success
export const selectCarsListSuccess = createSelector(
  selectCarsList,
  (state: CarsListState) => state.success
);

// Error
export const selectCarsListError = createSelector(
  selectCarsList,
  (state: CarsListState) => state.error
);


// ========== Selectors Details
const selectCarDetails = createSelector(
  selectDrivers,
  (state: CarsState) => state.details
);

// Items
export const selectCarDetailsItems = createSelector(
  selectCarDetails,
  (state: CarDetailsState) => state.item
);

// Loading
export const selectCarDetailsLoading = createSelector(
  selectCarDetails,
  (state: CarDetailsState) => state.loading
);

// Success
export const selectCarDetailsSuccess = createSelector(
  selectCarDetails,
  (state: CarDetailsState) => state.success
);

// Error
export const selectCarDetailsError = createSelector(
  selectCarDetails,
  (state: CarDetailsState) => state.error
);


// ========== Selectors Add
const selectCarAdd = createSelector(
  selectDrivers,
  (state: CarsState) => state.add
);

// Loading
export const selectCarAddLoading = createSelector(
  selectCarAdd,
  (state: Loading) => state.loading
);

// Success
export const selectCarAddSuccess = createSelector(
  selectCarAdd,
  (state: Loading) => state.success
);

// Error
export const selectCarAddError = createSelector(
  selectCarAdd,
  (state: Loading) => state.error
);


// ========== Selectors Del
const selectCarDel = createSelector(
  selectDrivers,
  (state: CarsState) => state.del
);

// Loading
export const selectCarDelLoading = createSelector(
  selectCarDel,
  (state: Loading) => state.loading
);

// Success
export const selectCarDelSuccess = createSelector(
  selectCarDel,
  (state: Loading) => state.success
);

// Error
export const selectCarDelError = createSelector(
  selectCarDel,
  (state: Loading) => state.error
);


// ========== Selectors Update
const selectCarUpdate = createSelector(
  selectDrivers,
  (state: CarsState) => state.update
);

// Loading
export const selectCarUpdateLoading = createSelector(
  selectCarUpdate,
  (state: Loading) => state.loading
);

// Success
export const selectCarUpdateSuccess = createSelector(
  selectCarUpdate,
  (state: Loading) => state.success
);

// Error
export const selectCarUpdateError = createSelector(
  selectCarUpdate,
  (state: Loading) => state.error
);
