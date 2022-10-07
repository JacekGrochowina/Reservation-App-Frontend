import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '../../../services/snackbar.service';

@Component({
  selector: 'app-fail-snackbar',
  templateUrl: './base-snackbar.component.html',
  styleUrls: ['./base-snackbar.component.scss'],
})
export class BaseSnackbarComponent {

  constructor(
    private snackbarRef: MatSnackBarRef<BaseSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) {}

  public close(): void {
    this.snackbarRef.dismiss();
  }

}
