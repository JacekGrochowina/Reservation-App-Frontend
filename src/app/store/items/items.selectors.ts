import { createSelector } from '@ngrx/store';
import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { AppState } from '../app.state';
import { ItemsState } from './items.state';
import { ItemsListState } from './interfaces/items-list.interface';
import { ItemDetailsState } from './interfaces/item-details.interface';

const selectItems = (state: AppState) => state.items;

// ========== Selectors List
const selectItemsList = createSelector(
  selectItems,
  (state: ItemsState) => state.list
);

// Items
export const selectItemsListItems = createSelector(
  selectItemsList,
  (state: ItemsListState) => state.items
);

// Loading
export const selectItemsListLoading = createSelector(
  selectItemsList,
  (state: ItemsListState) => state.loading
);

// Success
export const selectItemsListSuccess = createSelector(
  selectItemsList,
  (state: ItemsListState) => state.success
);

// Error
export const selectItemsListError = createSelector(
  selectItemsList,
  (state: ItemsListState) => state.error
);


// ========== Selectors Details
const selectItemDetails = createSelector(
  selectItems,
  (state: ItemsState) => state.details
);

// Item
export const selectItemDetailsItem = createSelector(
  selectItemDetails,
  (state: ItemDetailsState) => state.item
);

// Loading
export const selectItemDetailsLoading = createSelector(
  selectItemDetails,
  (state: ItemDetailsState) => state.loading
);

// Success
export const selectItemDetailsSuccess = createSelector(
  selectItemDetails,
  (state: ItemDetailsState) => state.success
);

// Error
export const selectItemDetailsError = createSelector(
  selectItemDetails,
  (state: ItemDetailsState) => state.error
);


// ========== Selectors Add
const selectItemAdd = createSelector(
  selectItems,
  (state: ItemsState) => state.add
);

// Loading
export const selectItemAddLoading = createSelector(
  selectItemAdd,
  (state: Loading) => state.loading
);

// Success
export const selectItemAddSuccess = createSelector(
  selectItemAdd,
  (state: Loading) => state.success
);

// Error
export const selectItemAddError = createSelector(
  selectItemAdd,
  (state: Loading) => state.error
);


// ========== Selectors Del
const selectItemDel = createSelector(
  selectItems,
  (state: ItemsState) => state.del
);

// Loading
export const selectItemDelLoading = createSelector(
  selectItemDel,
  (state: Loading) => state.loading
);

// Success
export const selectItemDelSuccess = createSelector(
  selectItemDel,
  (state: Loading) => state.success
);

// Error
export const selectItemDelError = createSelector(
  selectItemDel,
  (state: Loading) => state.error
);


// ========== Selectors Update
const selectItemUpdate = createSelector(
  selectItems,
  (state: ItemsState) => state.update
);

// Loading
export const selectItemUpdateLoading = createSelector(
  selectItemUpdate,
  (state: Loading) => state.loading
);

// Success
export const selectItemUpdateSuccess = createSelector(
  selectItemUpdate,
  (state: Loading) => state.success
);

// Error
export const selectItemUpdateError = createSelector(
  selectItemUpdate,
  (state: Loading) => state.error
);
