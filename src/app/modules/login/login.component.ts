import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routing } from '../../shared/utils/enums/routing.enum';
import { AuthService } from '../../store/auth/auth.service';
import { AuthFacade } from '../../store/auth/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // ========== Selectors Login
  authLoginLoading$ = this.authFacade.authLoginLoading$;
  authLoginSuccess$ = this.authFacade.authLoginSuccess$;
  authLoginError$ = this.authFacade.authLoginError$;

  public form!: FormGroup;
  public hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authFacade: AuthFacade,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(): void {
    this.authFacade.login({
      email: this.form.value.email,
      password: this.form.value.password,
    });

    // this.authService.login({
    //   email: this.form.value.email,
    //   password: this.form.value.password,
    // } as LoginPayload)
    //   .subscribe((response) => console.log(response));
  }

  public togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  public setPasswordVisibilityIcon(): string {
    return this.hide ? 'visibility_off' : 'visibility';
  }

  public goToRegister(): string {
    return `../${Routing.register}`;
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

}
