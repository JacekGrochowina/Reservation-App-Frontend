import { LoadingHandler } from 'src/app/shared/utils/interfaces/loading-handler.interface';
import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { DriversListState } from './interfaces/drivers-list.interface';
import { DriverDetailsState } from './interfaces/driver-details.interface';

export interface DriversState {
  list: DriversListState;
  details: DriverDetailsState;
  add: LoadingHandler;
  del: LoadingHandler;
  update: LoadingHandler;
}

export const driversInitialState: DriversState = {
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
