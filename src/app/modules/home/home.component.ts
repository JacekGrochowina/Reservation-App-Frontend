import { Component, OnInit } from '@angular/core';
import { AddEditCarComponent } from './components/add-edit-car/add-edit-car.component';
import { DialogService, DialogSize } from '../../shared/services/dialog.service';
import { AddEditCarDialogData } from './utils/interfaces/add-edit-car-dialog-data.interface';
import { AddEditMode } from '../../shared/utils/enums/add-edit-mode.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  public openAddCarDialog(): void {
    this.dialogService.open(AddEditCarComponent, DialogSize.sm, {
      data: {
        mode: AddEditMode.add,
      } as AddEditCarDialogData,
    });
  }

}
