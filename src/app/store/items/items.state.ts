import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { ItemsListState } from './interfaces/items-list.interface';
import { ItemDetailsState } from './interfaces/item-details.interface';

export interface ItemsState {
  list: ItemsListState;
  details: ItemDetailsState;
  add: Loading;
  del: Loading;
  update: Loading;
}

export const groupsInitialState: ItemsState = {
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
