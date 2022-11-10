import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Routing } from '../../shared/utils/enums/routing.enum';
import { matchValidator } from '../../shared/utils/extensions/matchValidator';
import { AuthFacade } from '../../store/auth/auth.facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  // ========== Selectors Register
  authRegisterLoading$ = this.authFacade.authRegisterLoading$;
  authRegisterSuccess$ = this.authFacade.authRegisterSuccess$;
  authRegisterError$ = this.authFacade.authRegisterError$;

  public form!: FormGroup;
  public hide = true;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(): void {
    this.authFacade.register({
      name: this.form.value.name,
      surname: this.form.value.surname,
      email: this.form.value.email,
      password: this.form.value.password,
    });
  }

  public togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  public setPasswordVisibilityIcon(): string {
    return this.hide ? 'visibility_off' : 'visibility';
  }

  public goToLogin(): string {
    return `../${Routing.login}`;
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        matchValidator('confirmPassword', true)
      ]],
      confirmPassword: ['', [
        Validators.required,
        matchValidator('password'),
      ]],
    });
  }

}
