import { createSelector } from '@ngrx/store';
import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { AppState } from '../app.state';
import { ReservationsState } from './reservations.state';
import { ReservationsListState } from './interfaces/reservations-list.interface';
import { ReservationGroupDetailsState } from './interfaces/reservation-details.interface';

const selectReservations = (state: AppState) => state.reservations;

// ========== Selectors List
const selectReservationsList = createSelector(
  selectReservations,
  (state: ReservationsState) => state.list
);

// Items
export const selectReservationsListItems = createSelector(
  selectReservationsList,
  (state: ReservationsListState) => state.items
);

// Loading
export const selectReservationsListLoading = createSelector(
  selectReservationsList,
  (state: ReservationsListState) => state.loading
);

// Success
export const selectReservationsListSuccess = createSelector(
  selectReservationsList,
  (state: ReservationsListState) => state.success
);

// Error
export const selectReservationsListError = createSelector(
  selectReservationsList,
  (state: ReservationsListState) => state.error
);


// ========== Selectors Details
const selectReservationDetails = createSelector(
  selectReservations,
  (state: ReservationsState) => state.details
);

// Item
export const selectReservationDetailsItem = createSelector(
  selectReservationDetails,
  (state: ReservationGroupDetailsState) => state.item
);

// Loading
export const selectReservationDetailsLoading = createSelector(
  selectReservationDetails,
  (state: ReservationGroupDetailsState) => state.loading
);

// Success
export const selectReservationDetailsSuccess = createSelector(
  selectReservationDetails,
  (state: ReservationGroupDetailsState) => state.success
);

// Error
export const selectReservationDetailsError = createSelector(
  selectReservationDetails,
  (state: ReservationGroupDetailsState) => state.error
);


// ========== Selectors Add
const selectReservationAdd = createSelector(
  selectReservations,
  (state: ReservationsState) => state.add
);

// Loading
export const selectReservationAddLoading = createSelector(
  selectReservationAdd,
  (state: Loading) => state.loading
);

// Success
export const selectReservationAddSuccess = createSelector(
  selectReservationAdd,
  (state: Loading) => state.success
);

// Error
export const selectReservationAddError = createSelector(
  selectReservationAdd,
  (state: Loading) => state.error
);


// ========== Selectors Del
const selectReservationDel = createSelector(
  selectReservations,
  (state: ReservationsState) => state.del
);

// Loading
export const selectReservationDelLoading = createSelector(
  selectReservationDel,
  (state: Loading) => state.loading
);

// Success
export const selectReservationDelSuccess = createSelector(
  selectReservationDel,
  (state: Loading) => state.success
);

// Error
export const selectReservationDelError = createSelector(
  selectReservationDel,
  (state: Loading) => state.error
);


// ========== Selectors Update
const selectReservationUpdate = createSelector(
  selectReservations,
  (state: ReservationsState) => state.update
);

// Loading
export const selectReservationUpdateLoading = createSelector(
  selectReservationUpdate,
  (state: Loading) => state.loading
);

// Success
export const selectReservationUpdateSuccess = createSelector(
  selectReservationUpdate,
  (state: Loading) => state.success
);

// Error
export const selectReservationUpdateError = createSelector(
  selectReservationUpdate,
  (state: Loading) => state.error
);
