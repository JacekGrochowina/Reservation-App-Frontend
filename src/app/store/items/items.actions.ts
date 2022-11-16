import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Item } from './interfaces/item.interface';
import { ItemUpdatePayload } from './interfaces/payloads/item-update.payload';
import { ItemAddPayload } from './interfaces/payloads/item-add.payload';
import { ItemsListPayload } from './interfaces/payloads/items-list.payload';

export enum ItemsActionTypes {
  getList = '[Items/List] Get List Items',
  getListSuccess = '[Items/List] Get List Items Success',
  getListFail = '[Items/List] Get List Items Fail',
  getListClear = '[Items/List] Get List Items Clear',
  getListClearError = '[Items/List] Get List Items Clear Error',

  getDetails = '[Items/Details] Get Details Item',
  getDetailsSuccess = '[Items/Details] Get Details Item Success',
  getDetailsFail = '[Items/Details] Get Details Item Fail',
  getDetailsClear = '[Items/Details] Get Details Item Clear',
  getDetailsClearError = '[Items/Details] Get Details Item Clear Error',

  add = '[Items/Add] Add Item',
  addSuccess = '[Items/Add] Add Item Success',
  addFail = '[Items/Add] Add Item Fail',
  addClear = '[Items/Add] Add Item Clear',
  addClearError = '[Items/Add] Add Item Clear Error',

  del = '[Items/Del] Del Item',
  delSuccess = '[Items/Del] Del Item Success',
  delFail = '[Items/Del] Del Item Fail',
  delClear = '[Items/Del] Del Item Clear',
  delClearError = '[Items/Del] Del Item Clear Error',

  update = '[Items/Update] Update Item',
  updateSuccess = '[Items/Update] Update Item Success',
  updateFail = '[Items/Update] Update Item Fail',
  updateClear = '[Items/Update] Update Item Clear',
  updateClearError = '[Items/Update] Update Item Clear Error',
}

// ========== Get Items
export class GetListItems implements Action {
  readonly type = ItemsActionTypes.getList;

  constructor(public payload?: ItemsListPayload) {}
}

export class GetListItemsSuccess implements Action {
  readonly type = ItemsActionTypes.getListSuccess;

  constructor(public payload: Item[]) {}
}

export class GetListItemsFail implements Action {
  readonly type = ItemsActionTypes.getListFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetListItemsClear implements Action {
  readonly type = ItemsActionTypes.getListClear;
}

export class GetListItemsClearError implements Action {
  readonly type = ItemsActionTypes.getListClearError;
}

// ========== Get Details Item
export class GetDetailsItem implements Action {
  readonly type = ItemsActionTypes.getDetails;

  constructor(public payload: number) {}
}

export class GetDetailsItemSuccess implements Action {
  readonly type = ItemsActionTypes.getDetailsSuccess;

  constructor(public payload: Item) {}
}

export class GetDetailsItemFail implements Action {
  readonly type = ItemsActionTypes.getDetailsFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetDetailsItemClear implements Action {
  readonly type = ItemsActionTypes.getDetailsClear;
}

export class GetDetailsItemClearError implements Action {
  readonly type = ItemsActionTypes.getDetailsClearError;
}

// ========== Add Item
export class AddItem implements Action {
  readonly type = ItemsActionTypes.add;

  constructor(public payload: ItemAddPayload) {}
}

export class AddItemSuccess implements Action {
  readonly type = ItemsActionTypes.addSuccess;
}

export class AddItemFail implements Action {
  readonly type = ItemsActionTypes.addFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class AddItemClear implements Action {
  readonly type = ItemsActionTypes.addClear;
}

export class AddItemClearError implements Action {
  readonly type = ItemsActionTypes.addClearError;
}

// ========== Del Item
export class DelItem implements Action {
  readonly type = ItemsActionTypes.del;

  constructor(public payload: number) {}
}

export class DelItemSuccess implements Action {
  readonly type = ItemsActionTypes.delSuccess;
}

export class DelItemFail implements Action {
  readonly type = ItemsActionTypes.delFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class DelItemClear implements Action {
  readonly type = ItemsActionTypes.delClear;
}

export class DelItemClearError implements Action {
  readonly type = ItemsActionTypes.delClearError;
}

// ========== Update Item
export class UpdateItem implements Action {
  readonly type = ItemsActionTypes.update;

  constructor(public payload: ItemUpdatePayload) {}
}

export class UpdateItemSuccess implements Action {
  readonly type = ItemsActionTypes.updateSuccess;
}

export class UpdateItemFail implements Action {
  readonly type = ItemsActionTypes.updateFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateItemClear implements Action {
  readonly type = ItemsActionTypes.updateClear;
}

export class UpdateItemClearError implements Action {
  readonly type = ItemsActionTypes.updateClearError;
}

export type ItemsActions =
  | GetListItems
  | GetListItemsSuccess
  | GetListItemsFail
  | GetListItemsClear
  | GetListItemsClearError
  | GetDetailsItem
  | GetDetailsItemSuccess
  | GetDetailsItemFail
  | GetDetailsItemClear
  | GetDetailsItemClearError
  | AddItem
  | AddItemSuccess
  | AddItemFail
  | AddItemClear
  | AddItemClearError
  | DelItem
  | DelItemSuccess
  | DelItemFail
  | DelItemClear
  | DelItemClearError
  | UpdateItem
  | UpdateItemSuccess
  | UpdateItemFail
  | UpdateItemClear
  | UpdateItemClearError;
