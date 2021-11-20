import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { DriversFacade } from '../../+state/drivers.facade';
import { Driver } from '../../utils/interfaces/driver.interface';
import { AddEditDriverComponent } from '../add-edit-driver/add-edit-driver.component';

@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
})
export class DriversTableComponent implements OnInit {
  // ========== Selectors List
  driversListItems$ = this.driversFacade.driversListItems$;
  driversListLoading$ = this.driversFacade.driversListLoading$;
  driversListSuccess$ = this.driversFacade.driversListSuccess$;
  driversListError$ = this.driversFacade.driversListError$;

  // ========== Selectors Add
  driverAddLoading$ = this.driversFacade.driverAddLoading$;
  driverAddSuccess$ = this.driversFacade.driverAddSuccess$;
  driverAddError$ = this.driversFacade.driverAddError$;

  // ========== Selectors Del
  driverDelLoading$ = this.driversFacade.driverDelLoading$;
  driverDelSuccess$ = this.driversFacade.driverDelSuccess$;
  driverDelError$ = this.driversFacade.driverDelError$;

  // ========== Selectors Update
  driverUpdateLoading$ = this.driversFacade.driverUpdateLoading$;
  driverUpdateSuccess$ = this.driversFacade.driverUpdateSuccess$;
  driverUpdateError$ = this.driversFacade.driverUpdateError$;

  displayedColumns: string[] = [
    'name',
    'surname',
    'pesel',
    'hireDate',
    'firedDate',
    'action',
  ];

  constructor(
    private driversFacade: DriversFacade,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.driversFacade.getDrivers();
  }

  editDriver(driver: Driver): void {
    const dialogRef = this.dialog.open(AddEditDriverComponent, {
      data: {
        driver,
        mode: AddEditMode.edit,
      },
      maxWidth: '500px',
    });
  }

  delDriver(driverID: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Usuwanie kierowcy',
        message: 'Czy napewno chcesz usunąć tego kierowcę?',
        confirmLabel: 'Usuń',
        dismissLabel: 'Anuluj',
        isAsync: true,
        close$: this.driverDelSuccess$,
        loading$: this.driverDelLoading$,
        errors$: this.driverDelError$,
        confirmed: () => {
          this.driversFacade.delDriver(driverID);
        },
      },
      width: '90%',
      maxWidth: '400px',
    });
  }
}
