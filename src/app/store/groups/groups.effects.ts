import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from '../app.state';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { GroupsService } from './groups.service';
import {
  AddGroup,
  AddGroupClear,
  AddGroupFail,
  AddGroupSuccess,
  DelGroup,
  DelGroupClear,
  DelGroupFail,
  DelGroupSuccess,
  GroupsActionTypes,
  GetListGroupsFail,
  GetListGroupsSuccess,
  UpdateGroup,
  UpdateGroupClear,
  UpdateGroupFail,
  UpdateGroupSuccess,
  GetDetailsGroupSuccess,
  GetDetailsGroupFail,
  GetDetailsGroup,
  GetListGroups,
} from './groups.actions';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable()
export class GroupsEffects {

  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private snackbarService: SnackbarService,
    private store: Store<AppState>,
  ) {}

  getGroupsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActionTypes.getList),
      switchMap(() =>
        this.groupsService.getGroupsList().pipe(
          map((response) => new GetListGroupsSuccess(response)),
          catchError((error) => of(new GetListGroupsFail(error)))
        )
      )
    )
  );

  getGroupDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActionTypes.getDetails),
      switchMap((action: GetDetailsGroup) =>
        this.groupsService.getGroupDetails(action.payload).pipe(
          map((response) => new GetDetailsGroupSuccess(response)),
          catchError((error) => of(new GetDetailsGroupFail(error)))
        )
      )
    )
  );

  addGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActionTypes.add),
      switchMap((action: AddGroup) =>
        this.groupsService.addGroup(action.payload).pipe(
          switchMap((response) => [
            new AddGroupSuccess(),
            new GetListGroups(),
          ]),
          catchError((error) => of(new AddGroupFail(error)))
        )
      )
    )
  );

  addGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActionTypes.addSuccess),
      map(() => {
        this.snackbarService.openSuccess('Dodano nową grupę');
        this.store.dispatch(new AddGroupClear());
      })
    ),
  { dispatch: false }
  );

  addGroupFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(GroupsActionTypes.addFail),
        map(() => this.snackbarService.openFail('Nie dodano nowej grupy')),
      ),
    { dispatch: false }
  );

  delGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActionTypes.del),
      switchMap((action: DelGroup) =>
        this.groupsService.delGroup(action.payload).pipe(
          switchMap((response) => [
            new DelGroupSuccess(),
            new GetListGroups(),
          ]),
          catchError((error) => of(new DelGroupFail(error)))
        )
      ),
    )
  );

  delGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActionTypes.delSuccess),
      map(() => {
        this.snackbarService.openSuccess('Usunięto grupę');
        this.store.dispatch(new DelGroupClear());
      })
    ),
  { dispatch: false }
  );

  delGroupFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(GroupsActionTypes.delFail),
        map(() => this.snackbarService.openFail('Nie usunięto grupy')),
      ),
    { dispatch: false }
  );

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActionTypes.update),
      mergeMap((action: UpdateGroup) =>
        this.groupsService.updateGroup(action.payload).pipe(
          switchMap((response) => [
            new UpdateGroupSuccess(),
            new GetListGroups(),
          ]),
          catchError((error) => of(new UpdateGroupFail(error)))
        )
      ),
    )
  );

  updateGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActionTypes.updateSuccess),
      map(() => {
        this.snackbarService.openSuccess('Edytowano grupę');
        this.store.dispatch(new UpdateGroupClear());
      })
    ),
  { dispatch: false }
  );

  updateGroupFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(GroupsActionTypes.updateFail),
        map(() => this.snackbarService.openFail('Nie edytowano grupy')),
      ),
    { dispatch: false }
  );

}
