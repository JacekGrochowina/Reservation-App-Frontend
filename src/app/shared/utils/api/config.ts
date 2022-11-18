import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export class ConfigAPI {

  public static readonly apiURL = environment.apiUrl;

  public static readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

}
