import { LoadingHandler } from 'src/app/shared/utils/interfaces/loading-handler.interface';
import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { CarsListState } from './interfaces/cars-list.interface';
import { CarDetailsState } from './interfaces/car-details.interface';

export interface CarsState {
  list: CarsListState;
  details: CarDetailsState;
  add: LoadingHandler;
  del: LoadingHandler;
  update: LoadingHandler;
}

export const carsInitialState: CarsState = {
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
