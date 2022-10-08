import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from '../components/snackbars/success/success-snackbar.component';
import { FailSnackbarComponent } from '../components/snackbars/fail/fail-snackbar.component';
import { WarningSnackbarComponent } from '../components/snackbars/warning/warning-snackbar.component';
import { InfoSnackbarComponent } from '../components/snackbars/info/info-snackbar.component';
import { BaseSnackbarComponent } from '../components/snackbars/base/base-snackbar.component';

export interface SnackbarData {
  message: string;
  duration: number;
}

export enum SnackbarType {
  base = 'snackbar--base',
  fail = 'snackbar--fail',
  info = 'snackbar--info',
  success = 'snackbar--success',
  warning = 'snackbar--warning',
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  private duration = 4; // seconds

  constructor(private snackBar: MatSnackBar) {}

  get durationInMiliseconds(): number {
    return this.duration * 1000;
  }

  private getBaseSnackbarConfig(message: string, customPanelClass: SnackbarType): MatSnackBarConfig {
    return {
      data: {
        message,
        duration: this.duration,
      },
      panelClass: ['snackbar', customPanelClass],
      duration: this.durationInMiliseconds,
    };
  }

  public openBase(message: string): void {
    this.snackBar.openFromComponent(
      BaseSnackbarComponent,
      this.getBaseSnackbarConfig(message, SnackbarType.base)
    );
  }

  public openFail(message: string): void {
    this.snackBar.openFromComponent(
      FailSnackbarComponent,
      this.getBaseSnackbarConfig(message, SnackbarType.fail)
    );
  }

  public openInfo(message: string): void {
    this.snackBar.openFromComponent(
      InfoSnackbarComponent,
      this.getBaseSnackbarConfig(message, SnackbarType.info)
    );
  }

  public openSuccess(message: string): void {
    this.snackBar.openFromComponent(
      SuccessSnackbarComponent,
      this.getBaseSnackbarConfig(message, SnackbarType.success)
    );
  }

  public openWarning(message: string): void {
    this.snackBar.openFromComponent(
      WarningSnackbarComponent,
      this.getBaseSnackbarConfig(message, SnackbarType.warning)
    );
  }

}
