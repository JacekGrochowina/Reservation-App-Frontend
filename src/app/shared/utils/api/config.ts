import { HttpHeaders } from '@angular/common/http';

export class ConfigAPI {

  public static readonly apiURL = 'https://cars-list-sequelize-backend.herokuapp.com';

  public static readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

}
