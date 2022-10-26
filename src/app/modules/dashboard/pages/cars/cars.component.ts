import { Component, OnInit } from '@angular/core';
import { AddEditCarComponent } from './components/add-edit-car/add-edit-car.component';
import { DialogService, DialogSize } from '../../../../shared/services/dialog.service';
import { AddEditCarDialogData } from './utils/interfaces/add-edit-car-dialog-data.interface';
import { AddEditMode } from '../../../../shared/utils/enums/add-edit-mode.enum';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    public snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {}

  public openAddCarDialog(): void {
    this.dialogService.open(AddEditCarComponent, DialogSize.sm, {
      data: {
        mode: AddEditMode.add,
      } as AddEditCarDialogData,
    });
  }

}
