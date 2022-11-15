import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  AddGroup,
  DelGroup,
  GetDetailsGroup,
  GetDetailsGroupClear,
  GetListGroups,
  UpdateGroup,
} from './groups.actions';
import {
  selectGroupDetailsError,
  selectGroupDetailsItem,
  selectGroupDetailsLoading,
  selectGroupDetailsSuccess,
  selectGroupAddError,
  selectGroupAddLoading,
  selectGroupAddSuccess,
  selectGroupDelError,
  selectGroupDelLoading,
  selectGroupDelSuccess,
  selectGroupsListError,
  selectGroupsListItems,
  selectGroupsListLoading,
  selectGroupsListSuccess,
  selectGroupUpdateError,
  selectGroupUpdateLoading,
  selectGroupUpdateSuccess,
} from './groups.selectors';
import { GroupUpdatePayload } from './interfaces/payloads/group-update.payload';
import { GroupAddPayload } from './interfaces/payloads/group-add.payload';

@Injectable()
export class GroupsFacade {

  // ========== Selectors List
  groupsListItems$ = this.store.select(selectGroupsListItems);
  groupsListLoading$ = this.store.select(selectGroupsListLoading);
  groupsListSuccess$ = this.store.select(selectGroupsListSuccess);
  groupsListError$ = this.store.select(selectGroupsListError);

  // ========== Selectors Details
  groupDetailsItems$ = this.store.select(selectGroupDetailsItem);
  groupDetailsLoading$ = this.store.select(selectGroupDetailsLoading);
  groupDetailsSuccess$ = this.store.select(selectGroupDetailsSuccess);
  groupDetailsError$ = this.store.select(selectGroupDetailsError);

  // ========== Selectors Add
  groupAddLoading$ = this.store.select(selectGroupAddLoading);
  groupAddSuccess$ = this.store.select(selectGroupAddSuccess);
  groupAddError$ = this.store.select(selectGroupAddError);

  // ========== Selectors Del
  groupDelLoading$ = this.store.select(selectGroupDelLoading);
  groupDelSuccess$ = this.store.select(selectGroupDelSuccess);
  groupDelError$ = this.store.select(selectGroupDelError);

  // ========== Selectors Update
  groupUpdateLoading$ = this.store.select(selectGroupUpdateLoading);
  groupUpdateSuccess$ = this.store.select(selectGroupUpdateSuccess);
  groupUpdateError$ = this.store.select(selectGroupUpdateError);

  constructor(private store: Store<AppState>) {}

  public getGroupsList(): void {
    this.store.dispatch(new GetListGroups());
  }

  public getGroupDetails(groupID: number): void {
    this.store.dispatch(new GetDetailsGroup(groupID));
  }

  public clearGroupDetails(): void {
    this.store.dispatch(new GetDetailsGroupClear());
  }

  public addGroup(group: GroupAddPayload): void {
    this.store.dispatch(new AddGroup(group));
  }

  public delGroup(groupID: number): void {
    this.store.dispatch(new DelGroup(groupID));
  }

  public updateGroup(group: GroupUpdatePayload): void {
    this.store.dispatch(new UpdateGroup(group));
  }

}
