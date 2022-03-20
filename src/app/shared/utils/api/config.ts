import { HttpHeaders } from '@angular/common/http';

export class ConfigAPI {

  public static readonly apiURL = 'https://czprogramy.cba.pl/php/php_rest_myblog-master';

  public static readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

}
