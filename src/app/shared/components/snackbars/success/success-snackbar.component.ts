import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '../../../services/snackbar.service';

@Component({
  selector: 'app-success-snackbar',
  templateUrl: './success-snackbar.component.html',
  styleUrls: ['./success-snackbar.component.scss'],
})
export class SuccessSnackbarComponent {

  constructor(
    private snackbarRef: MatSnackBarRef<SuccessSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) {}

  public close(): void {
    this.snackbarRef.dismiss();
  }

}
