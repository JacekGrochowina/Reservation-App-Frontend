import { createSelector } from '@ngrx/store';
import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { AppState } from '../app.state';
import { GroupsState } from './groups.state';
import { GroupsListState } from './interfaces/groups-list.interface';
import { GroupDetailsState } from './interfaces/group-details.interface';

const selectGroups = (state: AppState) => state.groups;

// ========== Selectors List
const selectGroupsList = createSelector(
  selectGroups,
  (state: GroupsState) => state.list
);

// Items
export const selectGroupsListItems = createSelector(
  selectGroupsList,
  (state: GroupsListState) => state.items
);

// Loading
export const selectGroupsListLoading = createSelector(
  selectGroupsList,
  (state: GroupsListState) => state.loading
);

// Success
export const selectGroupsListSuccess = createSelector(
  selectGroupsList,
  (state: GroupsListState) => state.success
);

// Error
export const selectGroupsListError = createSelector(
  selectGroupsList,
  (state: GroupsListState) => state.error
);


// ========== Selectors Details
const selectGroupDetails = createSelector(
  selectGroups,
  (state: GroupsState) => state.details
);

// Item
export const selectGroupDetailsItem = createSelector(
  selectGroupDetails,
  (state: GroupDetailsState) => state.item
);

// Loading
export const selectGroupDetailsLoading = createSelector(
  selectGroupDetails,
  (state: GroupDetailsState) => state.loading
);

// Success
export const selectGroupDetailsSuccess = createSelector(
  selectGroupDetails,
  (state: GroupDetailsState) => state.success
);

// Error
export const selectGroupDetailsError = createSelector(
  selectGroupDetails,
  (state: GroupDetailsState) => state.error
);


// ========== Selectors Add
const selectGroupAdd = createSelector(
  selectGroups,
  (state: GroupsState) => state.add
);

// Loading
export const selectGroupAddLoading = createSelector(
  selectGroupAdd,
  (state: Loading) => state.loading
);

// Success
export const selectGroupAddSuccess = createSelector(
  selectGroupAdd,
  (state: Loading) => state.success
);

// Error
export const selectGroupAddError = createSelector(
  selectGroupAdd,
  (state: Loading) => state.error
);


// ========== Selectors Del
const selectGroupDel = createSelector(
  selectGroups,
  (state: GroupsState) => state.del
);

// Loading
export const selectGroupDelLoading = createSelector(
  selectGroupDel,
  (state: Loading) => state.loading
);

// Success
export const selectGroupDelSuccess = createSelector(
  selectGroupDel,
  (state: Loading) => state.success
);

// Error
export const selectGroupDelError = createSelector(
  selectGroupDel,
  (state: Loading) => state.error
);


// ========== Selectors Update
const selectGroupUpdate = createSelector(
  selectGroups,
  (state: GroupsState) => state.update
);

// Loading
export const selectGroupUpdateLoading = createSelector(
  selectGroupUpdate,
  (state: Loading) => state.loading
);

// Success
export const selectGroupUpdateSuccess = createSelector(
  selectGroupUpdate,
  (state: Loading) => state.success
);

// Error
export const selectGroupUpdateError = createSelector(
  selectGroupUpdate,
  (state: Loading) => state.error
);
