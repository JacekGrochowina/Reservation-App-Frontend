import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { ReservationsListState } from './interfaces/reservations-list.interface';
import { ReservationGroupDetailsState } from './interfaces/reservation-details.interface';

export interface ReservationsState {
  list: ReservationsListState;
  details: ReservationGroupDetailsState;
  add: Loading;
  del: Loading;
  update: Loading;
}

export const reservationsInitialState: ReservationsState = {
  list: {
    items: [],
    ...InitialLoadingHandler,
  },
  details: {
    item: null,
    ...InitialLoadingHandler,
  },
  add: InitialLoadingHandler,
  del: InitialLoadingHandler,
  update: InitialLoadingHandler,
};
