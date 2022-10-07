import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '../../../services/snackbar.service';

@Component({
  selector: 'app-fail-snackbar',
  templateUrl: './fail-snackbar.component.html',
  styleUrls: ['./fail-snackbar.component.scss'],
})
export class FailSnackbarComponent {

  constructor(
    private snackbarRef: MatSnackBarRef<FailSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) {}

  public close(): void {
    this.snackbarRef.dismiss();
  }

}
