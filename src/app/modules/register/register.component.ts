import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Routing } from '../../shared/utils/enums/routing.enum';
import { matchValidator } from '../../shared/utils/extensions/matchValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public loginLoading$: Observable<boolean> = of(false);

  public form!: FormGroup;
  public hide = true;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(): void {
    console.log(this.form.value);
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
