import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { AddEditDriverComponent } from './components/add-edit-driver/add-edit-driver.component';
import { AddEditDriverDialogData } from './utils/interfaces/add-edit-driver-dialog-data.interface';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddDriverDialog(): void {
    this.dialog.open(AddEditDriverComponent, {
      data: {
        mode: AddEditMode.add,
      } as AddEditDriverDialogData,
      width: '90%',
      maxWidth: '500px',
    });
  }
}
