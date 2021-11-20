import { HttpParams } from '@angular/common/http';

export const createParams = (query: any) => {
  let params: HttpParams = new HttpParams();
  for (const key of Object.keys(query)) {
    if (query[key]) {
      if (query[key] instanceof Array) {
        query[key].forEach((item: string) => {
          params = params.append(`${key.toString()}[]`, item);
        });
      } else {
        params = params.append(key.toString(), query[key]);
      }
    }
  }
  return params;
};
