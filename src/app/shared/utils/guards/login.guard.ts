import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {

  constructor(private authFacade: AuthFacade) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.authFacade.authIsLogged$.pipe(
        map((authIsLogged) => {
          if (!authIsLogged) { return true; }

          return false;
        }),
        first(),
      );
  }

}
