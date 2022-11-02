import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { filter } from 'rxjs/operators';
import { isNull } from 'lodash';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authFacade: AuthFacade) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.authFacade.authJwtToken$
      .pipe(filter((authJwtToken) => !!authJwtToken))
      .subscribe((authJwtToken) => {
        if (isNull(authJwtToken)) { return; }

        request = request.clone({
          headers: request.headers.set('auth-token', authJwtToken),
        });
      });

    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
