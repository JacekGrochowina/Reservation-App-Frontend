import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './interfaces/reservation.interface';
import { ConfigAPI as api } from '../../shared/utils/api/config';
import { ReservationUpdatePayload } from './interfaces/payloads/reservation-update.payload';
import { ReservationAddPayload } from './interfaces/payloads/reservation-add.payload';
import { ReservationExtendsResponse } from './interfaces/responses/reservation-extends.response';
import { ReservationListPayload } from './interfaces/payloads/reservation-list.payload';
import { isEmpty, isUndefined } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {

  constructor(private http: HttpClient) {}

  public getReservationsList(reservationsList?: ReservationListPayload): Observable<ReservationExtendsResponse[]> {
    const url = `${api.apiURL}/reservations`;

    const isFrom = !(isEmpty(reservationsList?.from) || isUndefined(reservationsList?.from));
    const isTo = !(isEmpty(reservationsList?.to) || isUndefined(reservationsList?.to));

    let params = new HttpParams();
    if (isFrom) params = params.append('from', reservationsList?.from ?? '');
    if (isTo) params = params.append('to', reservationsList?.to ?? '');

    return this.http.get<ReservationExtendsResponse[]>(url, { ...api.headers, params });
  }

  public getReservationDetails(id: number): Observable<ReservationExtendsResponse> {
    const url = `${api.apiURL}/reservations/${id}`;
    return this.http.get<ReservationExtendsResponse>(url, api.headers);
  }

  public addReservation(group: ReservationAddPayload): Observable<Reservation> {
    const url = `${api.apiURL}/reservations/add`;
    return this.http.post<Reservation>(url, group, api.headers);
  }

  public delReservation(id: number): Observable<number> {
    const url = `${api.apiURL}/reservations/delete/${id}`;
    return this.http.delete<number>(url, api.headers);
  }

  public updateReservation({ id, body }: ReservationUpdatePayload): Observable<Reservation> {
    const url = `${api.apiURL}/reservations/update/${id}`;
    return this.http.put<Reservation>(url, body, api.headers);
  }

}
