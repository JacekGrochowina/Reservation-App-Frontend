import { HttpHeaders } from '@angular/common/http';

export class ConfigAPI {
  static readonly apiURL =
    'https://czprogramy.cba.pl/php/php_rest_myblog-master';

  static readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
}
