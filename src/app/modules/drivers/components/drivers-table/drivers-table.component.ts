import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { DriversFacade } from '../../../../store/drivers/drivers.facade';
import { Driver } from '../../utils/interfaces/driver.interface';
import { AddEditDriverComponent } from '../add-edit-driver/add-edit-driver.component';

@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
})
export class DriversTableComponent implements OnInit {

  // ========== Selectors List
  public driversListItems$ = this.driversFacade.driversListItems$;
  public driversListLoading$ = this.driversFacade.driversListLoading$;
  public driversListSuccess$ = this.driversFacade.driversListSuccess$;
  public driversListError$ = this.driversFacade.driversListError$;

  // ========== Selectors Add
  public driverAddLoading$ = this.driversFacade.driverAddLoading$;
  public driverAddSuccess$ = this.driversFacade.driverAddSuccess$;
  public driverAddError$ = this.driversFacade.driverAddError$;

  // ========== Selectors Del
  public driverDelLoading$ = this.driversFacade.driverDelLoading$;
  public driverDelSuccess$ = this.driversFacade.driverDelSuccess$;
  public driverDelError$ = this.driversFacade.driverDelError$;

  // ========== Selectors Update
  public driverUpdateLoading$ = this.driversFacade.driverUpdateLoading$;
  public driverUpdateSuccess$ = this.driversFacade.driverUpdateSuccess$;
  public driverUpdateError$ = this.driversFacade.driverUpdateError$;

  public displayedColumns: string[] = [
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

  public ngOnInit(): void {
    this.driversFacade.getDriversList();
  }

  public editDriver(driver: Driver): void {
    const dialogRef = this.dialog.open(AddEditDriverComponent, {
      data: {
        driver,
        mode: AddEditMode.edit,
      },
      maxWidth: '500px',
    });
  }

  public delDriver(driverID: number): void {
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
