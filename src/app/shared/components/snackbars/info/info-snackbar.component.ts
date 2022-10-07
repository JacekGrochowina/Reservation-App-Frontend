import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '../../../services/snackbar.service';

@Component({
  selector: 'app-info-snackbar',
  templateUrl: './info-snackbar.component.html',
  styleUrls: ['./info-snackbar.component.scss'],
})
export class InfoSnackbarComponent {

  constructor(
    private snackbarRef: MatSnackBarRef<InfoSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) {}

  public close(): void {
    this.snackbarRef.dismiss();
  }

}
