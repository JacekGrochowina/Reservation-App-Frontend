import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from './interfaces/group.interface';
import { ConfigAPI as api } from '../../shared/utils/api/config';
import { GroupUpdatePayload } from './interfaces/payloads/group-update.payload';
import { GroupAddPayload } from './interfaces/payloads/group-add.payload';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {

  constructor(private http: HttpClient) {}

  public getGroupsList(): Observable<Group[]> {
    const url = `${api.apiURL}/groups`;
    return this.http.get<Group[]>(url, api.headers);
  }

  public getGroupDetails(id: number): Observable<Group> {
    const url = `${api.apiURL}/groups/${id}`;
    return this.http.get<Group>(url, api.headers);
  }

  public addGroup(car: GroupAddPayload): Observable<Group> {
    const url = `${api.apiURL}/groups/add`;
    return this.http.post<Group>(url, car, api.headers);
  }

  public delGroup(id: number): Observable<number> {
    const url = `${api.apiURL}/groups/delete/${id}`;
    return this.http.delete<number>(url, api.headers);
  }

  public updateGroup({ id, body }: GroupUpdatePayload): Observable<Group> {
    const url = `${api.apiURL}/groups/update/${id}`;
    return this.http.put<Group>(url, body, api.headers);
  }

}
