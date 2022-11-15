import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './interfaces/item.interface';
import { ConfigAPI as api } from '../../shared/utils/api/config';
import { ItemUpdatePayload } from './interfaces/payloads/item-update.payload';
import { ItemAddPayload } from './interfaces/payloads/item-add.payload';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {

  constructor(private http: HttpClient) {}

  public getItemsList(): Observable<Item[]> {
    const url = `${api.apiURL}/items`;
    return this.http.get<Item[]>(url, api.headers);
  }

  public getItemDetails(id: number): Observable<Item> {
    const url = `${api.apiURL}/items/${id}`;
    return this.http.get<Item>(url, api.headers);
  }

  public addItem(item: ItemAddPayload): Observable<Item> {
    const url = `${api.apiURL}/items/add`;
    return this.http.post<Item>(url, item, api.headers);
  }

  public delItem(id: number): Observable<number> {
    const url = `${api.apiURL}/items/delete/${id}`;
    return this.http.delete<number>(url, api.headers);
  }

  public updateItem({ id, body }: ItemUpdatePayload): Observable<Item> {
    const url = `${api.apiURL}/items/update/${id}`;
    return this.http.put<Item>(url, body, api.headers);
  }

}
