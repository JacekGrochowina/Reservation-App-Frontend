import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from '../app.state';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { ItemsService } from './items.service';
import {
  AddItem,
  AddItemClear,
  AddItemFail,
  AddItemSuccess,
  DelItem,
  DelItemClear,
  DelItemFail,
  DelItemSuccess,
  ItemsActionTypes,
  GetListItemsFail,
  GetListItemsSuccess,
  UpdateItem,
  UpdateItemClear,
  UpdateItemFail,
  UpdateItemSuccess,
  GetDetailsItemSuccess,
  GetDetailsItemFail,
  GetDetailsItem,
  GetListItems,
} from './items.actions';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable()
export class ItemsEffects {

  constructor(
    private actions$: Actions,
    private itemsService: ItemsService,
    private snackbarService: SnackbarService,
    private store: Store<AppState>,
  ) {}

  getGroupsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.getList),
      switchMap(() =>
        this.itemsService.getItemsList().pipe(
          map((response) => new GetListItemsSuccess(response)),
          catchError((error) => of(new GetListItemsFail(error)))
        )
      )
    )
  );

  getGroupDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.getDetails),
      switchMap((action: GetDetailsItem) =>
        this.itemsService.getItemDetails(action.payload).pipe(
          map((response) => new GetDetailsItemSuccess(response)),
          catchError((error) => of(new GetDetailsItemFail(error)))
        )
      )
    )
  );

  addGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.add),
      switchMap((action: AddItem) =>
        this.itemsService.addItem(action.payload).pipe(
          switchMap((response) => [
            new AddItemSuccess(),
            new GetListItems(),
          ]),
          catchError((error) => of(new AddItemFail(error)))
        )
      )
    )
  );

  addGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.addSuccess),
      map(() => {
        this.snackbarService.openSuccess('Dodano nowe przedmiot');
        this.store.dispatch(new AddItemClear());
      })
    ),
  { dispatch: false }
  );

  addGroupFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ItemsActionTypes.addFail),
        map(() => {
          this.snackbarService.openFail('Nie dodano nowego przedmiotu');
          this.store.dispatch(new AddItemClear());
        })
      ),
    { dispatch: false }
  );

  delGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.del),
      switchMap((action: DelItem) =>
        this.itemsService.delItem(action.payload).pipe(
          switchMap((response) => [
            new DelItemSuccess(),
            new GetListItems(),
          ]),
          catchError((error) => of(new DelItemFail(error)))
        )
      ),
    )
  );

  delGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.delSuccess),
      map(() => {
        this.snackbarService.openSuccess('Usunięto przedmiot');
        this.store.dispatch(new DelItemClear());
      })
    ),
  { dispatch: false }
  );

  delGroupFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ItemsActionTypes.delFail),
        map(() => {
          this.snackbarService.openFail('Nie usunięto przedmiotu');
          this.store.dispatch(new DelItemClear());
        })
      ),
    { dispatch: false }
  );

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.update),
      mergeMap((action: UpdateItem) =>
        this.itemsService.updateItem(action.payload).pipe(
          switchMap((response) => [
            new UpdateItemSuccess(),
            new GetListItems(),
          ]),
          catchError((error) => of(new UpdateItemFail(error)))
        )
      ),
    )
  );

  updateGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.updateSuccess),
      map(() => {
        this.snackbarService.openSuccess('Edytowano przedmiot');
        this.store.dispatch(new UpdateItemClear());
      })
    ),
  { dispatch: false }
  );

  updateGroupFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ItemsActionTypes.updateFail),
        map(() => {
          this.snackbarService.openFail('Nie edytowano przedmiotu');
          this.store.dispatch(new UpdateItemClear());
        })
      ),
    { dispatch: false }
  );

}
