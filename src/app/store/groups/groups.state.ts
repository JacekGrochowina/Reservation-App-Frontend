import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { GroupsListState } from './interfaces/groups-list.interface';
import { GroupDetailsState } from './interfaces/group-details.interface';

export interface GroupsState {
  list: GroupsListState;
  details: GroupDetailsState;
  add: Loading;
  del: Loading;
  update: Loading;
}

export const groupsInitialState: GroupsState = {
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
