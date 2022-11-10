import { Component } from '@angular/core';
import { AuthFacade } from '../../../../store/auth/auth.facade';

@Component({
  selector: 'app-current-user-info',
  templateUrl: './current-user-info.component.html',
  styleUrls: ['./current-user-info.component.scss']
})
export class CurrentUserInfoComponent {

  // ========== Selectors Current User
  authCurrentUserName$ = this.authFacade.authCurrentUserName$;
  authCurrentUserSurname$ = this.authFacade.authCurrentUserSurname$;
  authCurrentUserEmail$ = this.authFacade.authCurrentUserEmail$;
  authCurrentUserLoading$ = this.authFacade.authCurrentUserLoading$;
  authCurrentUserSuccess$ = this.authFacade.authCurrentUserSuccess$;
  authCurrentUserError$ = this.authFacade.authCurrentUserError$;

  constructor(private authFacade: AuthFacade) {}

}
