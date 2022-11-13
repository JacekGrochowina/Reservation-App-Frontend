import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Group } from './interfaces/group.interface';
import { GroupUpdatePayload } from './interfaces/payloads/group-update.payload';
import { GroupAddPayload } from './interfaces/payloads/group-add.payload';

export enum GroupsActionTypes {
  getList = '[Group/List] Get List Groups',
  getListSuccess = '[Group/List] Get List Groups Success',
  getListFail = '[Group/List] Get List Groups Fail',
  getListClear = '[Group/List] Get List Groups Clear',
  getListClearError = '[Group/List] Get List Groups Clear Error',

  getDetails = '[Group/Details] Get Details Group',
  getDetailsSuccess = '[Group/Details] Get Details Group Success',
  getDetailsFail = '[Group/Details] Get Details Group Fail',
  getDetailsClear = '[Group/Details] Get Details Group Clear',
  getDetailsClearError = '[Group/Details] Get Details Group Clear Error',

  add = '[Group/Add] Add Group',
  addSuccess = '[Group/Add] Add Group Success',
  addFail = '[Group/Add] Add Group Fail',
  addClear = '[Group/Add] Add Group Clear',
  addClearError = '[Group/Add] Add Group Clear Error',

  del = '[Group/Del] Del Group',
  delSuccess = '[Group/Del] Del Group Success',
  delFail = '[Group/Del] Del Group Fail',
  delClear = '[Group/Del] Del Group Clear',
  delClearError = '[Group/Del] Del Group Clear Error',

  update = '[Group/Update] Update Group',
  updateSuccess = '[Group/Update] Update Group Success',
  updateFail = '[Group/Update] Update Group Fail',
  updateClear = '[Group/Update] Update Group Clear',
  updateClearError = '[Group/Update] Update Group Clear Error',
}

// ========== Get Groups
export class GetListGroups implements Action {
  readonly type = GroupsActionTypes.getList;
}

export class GetListGroupsSuccess implements Action {
  readonly type = GroupsActionTypes.getListSuccess;

  constructor(public payload: Group[]) {}
}

export class GetListGroupsFail implements Action {
  readonly type = GroupsActionTypes.getListFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetListGroupsClear implements Action {
  readonly type = GroupsActionTypes.getListClear;
}

export class GetListGroupsClearError implements Action {
  readonly type = GroupsActionTypes.getListClearError;
}

// ========== Get Details Group
export class GetDetailsGroup implements Action {
  readonly type = GroupsActionTypes.getDetails;

  constructor(public payload: number) {}
}

export class GetDetailsGroupSuccess implements Action {
  readonly type = GroupsActionTypes.getDetailsSuccess;

  constructor(public payload: Group) {}
}

export class GetDetailsGroupFail implements Action {
  readonly type = GroupsActionTypes.getDetailsFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class GetDetailsGroupClear implements Action {
  readonly type = GroupsActionTypes.getDetailsClear;
}

export class GetDetailsGroupClearError implements Action {
  readonly type = GroupsActionTypes.getDetailsClearError;
}

// ========== Add Group
export class AddGroup implements Action {
  readonly type = GroupsActionTypes.add;

  constructor(public payload: GroupAddPayload) {}
}

export class AddGroupSuccess implements Action {
  readonly type = GroupsActionTypes.addSuccess;
}

export class AddGroupFail implements Action {
  readonly type = GroupsActionTypes.addFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class AddGroupClear implements Action {
  readonly type = GroupsActionTypes.addClear;
}

export class AddGroupClearError implements Action {
  readonly type = GroupsActionTypes.addClearError;
}

// ========== Del Group
export class DelGroup implements Action {
  readonly type = GroupsActionTypes.del;

  constructor(public payload: number) {}
}

export class DelGroupSuccess implements Action {
  readonly type = GroupsActionTypes.delSuccess;
}

export class DelGroupFail implements Action {
  readonly type = GroupsActionTypes.delFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class DelGroupClear implements Action {
  readonly type = GroupsActionTypes.delClear;
}

export class DelGroupClearError implements Action {
  readonly type = GroupsActionTypes.delClearError;
}

// ========== Update Group
export class UpdateGroup implements Action {
  readonly type = GroupsActionTypes.update;

  constructor(public payload: GroupUpdatePayload) {}
}

export class UpdateGroupSuccess implements Action {
  readonly type = GroupsActionTypes.updateSuccess;
}

export class UpdateGroupFail implements Action {
  readonly type = GroupsActionTypes.updateFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateGroupClear implements Action {
  readonly type = GroupsActionTypes.updateClear;
}

export class UpdateGroupClearError implements Action {
  readonly type = GroupsActionTypes.updateClearError;
}

export type GroupsActions =
  | GetListGroups
  | GetListGroupsSuccess
  | GetListGroupsFail
  | GetListGroupsClear
  | GetListGroupsClearError
  | GetDetailsGroup
  | GetDetailsGroupSuccess
  | GetDetailsGroupFail
  | GetDetailsGroupClear
  | GetDetailsGroupClearError
  | AddGroup
  | AddGroupSuccess
  | AddGroupFail
  | AddGroupClear
  | AddGroupClearError
  | DelGroup
  | DelGroupSuccess
  | DelGroupFail
  | DelGroupClear
  | DelGroupClearError
  | UpdateGroup
  | UpdateGroupSuccess
  | UpdateGroupFail
  | UpdateGroupClear
  | UpdateGroupClearError;
