import { Component, OnInit } from '@angular/core';
import { AddEditMode } from '../../shared/utils/enums/add-edit-mode.enum';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCarComponent } from './components/add-edit-car/add-edit-car.component';
import { AddEditCarDialogData } from './utils/interfaces/add-edit-car-dialog-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public openAddCarDialog(): void {
    this.dialog.open(AddEditCarComponent, {
      data: {
        mode: AddEditMode.add,
      } as AddEditCarDialogData,
      width: '90%',
      maxWidth: '500px',
    });
  }

}
