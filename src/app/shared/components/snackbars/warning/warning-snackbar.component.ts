import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '../../../services/snackbar.service';

@Component({
  selector: 'app-warning-snackbar',
  templateUrl: './warning-snackbar.component.html',
  styleUrls: ['./warning-snackbar.component.scss'],
})
export class WarningSnackbarComponent {

  constructor(
    private snackbarRef: MatSnackBarRef<WarningSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) {}

  public close(): void {
    this.snackbarRef.dismiss();
  }

}
