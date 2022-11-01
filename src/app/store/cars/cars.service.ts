import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './interfaces/car.interface';
import { ConfigAPI as api } from '../../shared/utils/api/config';
import { CarUpdatePayload } from './interfaces/payloads/car-update.payload';
import { CarAddPayload } from './interfaces/payloads/car-add.payload';

@Injectable({
  providedIn: 'root',
})
export class CarsService {

  constructor(private http: HttpClient) {}

  public getCarsList(): Observable<Car[]> {
    const url = `${api.apiURL}/cars`;
    return this.http.get<Car[]>(url, api.headers);
  }

  public getCarDetails(id: number): Observable<Car> {
    const url = `${api.apiURL}/cars/${id}`;
    return this.http.get<Car>(url, api.headers);
  }

  public addCar(car: CarAddPayload): Observable<Car> {
    const url = `${api.apiURL}/cars/add`;
    return this.http.post<Car>(url, car, api.headers);
  }

  public delCar(id: number): Observable<number> {
    const url = `${api.apiURL}/cars/delete/${id}`;
    return this.http.delete<number>(url, api.headers);
  }

  public updateCar({ id, body }: CarUpdatePayload): Observable<Car> {
    const url = `${api.apiURL}/cars/update/${id}`;
    return this.http.put<Car>(url, body, api.headers);
  }

}
