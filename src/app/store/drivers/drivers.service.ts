import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from './interfaces/driver.interface';
import { ConfigAPI as api } from '../../shared/utils/api/config';

@Injectable({
  providedIn: 'root',
})
export class DriversService {

  constructor(private http: HttpClient) {}

  public getDrivers(): Observable<Driver[]> {
    const url = `${api.apiURL}/api/driver/read.php`;
    return this.http.get<Driver[]>(url, api.headers);
  }

  public addDriver(driver: Driver): Observable<Driver> {
    const url = `${api.apiURL}/api/driver/create.php`;
    return this.http.post<Driver>(url, driver, api.headers);
  }

  public delDriver(driverID: number): Observable<number> {
    const options = {
      ...api.headers,
      body: {
        id: driverID,
      },
    };

    const url = `${api.apiURL}/api/driver/delete.php`;
    return this.http.delete<number>(url, options);
  }

  public updateDriver(driver: Driver): Observable<Driver> {
    const url = `${api.apiURL}/api/driver/update.php`;
    return this.http.post<Driver>(url, driver, api.headers);
  }

}
