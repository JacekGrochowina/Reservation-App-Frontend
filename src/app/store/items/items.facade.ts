import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  AddItem,
  DelItem,
  GetDetailsItem,
  GetDetailsItemClear,
  GetListItems,
  UpdateItem,
} from './items.actions';
import {
  selectItemDetailsError,
  selectItemDetailsItem,
  selectItemDetailsLoading,
  selectItemDetailsSuccess,
  selectItemAddError,
  selectItemAddLoading,
  selectItemAddSuccess,
  selectItemDelError,
  selectItemDelLoading,
  selectItemDelSuccess,
  selectItemsListError,
  selectItemsListItems,
  selectItemsListLoading,
  selectItemsListSuccess,
  selectItemUpdateError,
  selectItemUpdateLoading,
  selectItemUpdateSuccess,
} from './items.selectors';
import { ItemUpdatePayload } from './interfaces/payloads/item-update.payload';
import { ItemAddPayload } from './interfaces/payloads/item-add.payload';

@Injectable()
export class ItemsFacade {

  // ========== Selectors List
  itemsListItems$ = this.store.select(selectItemsListItems);
  itemsListLoading$ = this.store.select(selectItemsListLoading);
  itemsListSuccess$ = this.store.select(selectItemsListSuccess);
  itemsListError$ = this.store.select(selectItemsListError);

  // ========== Selectors Details
  itemDetailsItems$ = this.store.select(selectItemDetailsItem);
  itemDetailsLoading$ = this.store.select(selectItemDetailsLoading);
  itemDetailsSuccess$ = this.store.select(selectItemDetailsSuccess);
  itemDetailsError$ = this.store.select(selectItemDetailsError);

  // ========== Selectors Add
  itemAddLoading$ = this.store.select(selectItemAddLoading);
  itemAddSuccess$ = this.store.select(selectItemAddSuccess);
  itemAddError$ = this.store.select(selectItemAddError);

  // ========== Selectors Del
  itemDelLoading$ = this.store.select(selectItemDelLoading);
  itemDelSuccess$ = this.store.select(selectItemDelSuccess);
  itemDelError$ = this.store.select(selectItemDelError);

  // ========== Selectors Update
  itemUpdateLoading$ = this.store.select(selectItemUpdateLoading);
  itemUpdateSuccess$ = this.store.select(selectItemUpdateSuccess);
  itemUpdateError$ = this.store.select(selectItemUpdateError);

  constructor(private store: Store<AppState>) {}

  public getItemsList(): void {
    this.store.dispatch(new GetListItems());
  }

  public getItemDetails(itemID: number): void {
    this.store.dispatch(new GetDetailsItem(itemID));
  }

  public clearItemDetails(): void {
    this.store.dispatch(new GetDetailsItemClear());
  }

  public addItem(item: ItemAddPayload): void {
    this.store.dispatch(new AddItem(item));
  }

  public delItem(itemID: number): void {
    this.store.dispatch(new DelItem(itemID));
  }

  public updateItem(item: ItemUpdatePayload): void {
    this.store.dispatch(new UpdateItem(item));
  }

}
