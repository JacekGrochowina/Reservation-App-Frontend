import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

export enum DialogSize {
  xxs = '300px',
  xs = '400px',
  sm = '500px',
  md = '600px',
  lg = '800px',
  xl = '800px',
  xxl = '1000px',
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  public open(component: ComponentType<any>, dialogSize: DialogSize = DialogSize.md, config?: MatDialogConfig): void {
    this.dialog.open(component, {
      ...this.getBaseDialogConfig(dialogSize),
      ...config,
    });
  }

  private getBaseDialogConfig(dialogSize: DialogSize): MatDialogConfig {
    return {
      width: '90%',
      maxWidth: dialogSize,
    };
  }

}
