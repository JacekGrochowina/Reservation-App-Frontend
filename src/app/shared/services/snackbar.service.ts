import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from '../components/snackbars/success/success-snackbar.component';
import { FailSnackbarComponent } from '../components/snackbars/fail/fail-snackbar.component';
import { WarningSnackbarComponent } from '../components/snackbars/warning/warning-snackbar.component';
import { InfoSnackbarComponent } from '../components/snackbars/info/info-snackbar.component';
import { BaseSnackbarComponent } from '../components/snackbars/base/base-snackbar.component';

export interface SnackbarData {
  message: string;
  duration: number;
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

  public openBase(message: string): void {
    this.snackBar.openFromComponent(BaseSnackbarComponent, {
      data: {
        message,
        duration: this.duration,
      },
      panelClass: ['snackbar', 'snackbar--base'],
      duration: this.durationInMiliseconds,
    });
  }

  public openFail(message: string): void {
    this.snackBar.openFromComponent(FailSnackbarComponent, {
      data: {
        message,
        duration: this.duration,
      },
      panelClass: ['snackbar', 'snackbar--fail'],
      duration: this.durationInMiliseconds,
    });
  }

  public openInfo(message: string): void {
    this.snackBar.openFromComponent(InfoSnackbarComponent, {
      data: {
        message,
        duration: this.duration,
      },
      panelClass: ['snackbar', 'snackbar--info'],
      duration: this.durationInMiliseconds,
    });
  }

  public openSuccess(message: string): void {
    this.snackBar.openFromComponent(SuccessSnackbarComponent, {
      data: {
        message,
        duration: this.duration,
      },
      panelClass: ['snackbar', 'snackbar--success'],
      duration: this.durationInMiliseconds,
    });
  }

  public openWarning(message: string): void {
    this.snackBar.openFromComponent(WarningSnackbarComponent, {
      data: {
        message,
        duration: this.duration,
      },
      panelClass: ['snackbar', 'snackbar--warning'],
      duration: this.durationInMiliseconds,
    });
  }

}
