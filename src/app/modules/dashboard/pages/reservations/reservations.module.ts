import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ReservationsComponent } from './reservations.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { ReservationsGridComponent } from './components/reservations-grid/reservations-grid.component';
import { AddEditReservationComponent } from './components/add-edit-reservation/add-edit-reservation.component';
import { ItemsModule } from '../items/items.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { CustomDateAdapter } from '../../../../shared/utils/adapters/custom-date.adapter';

@NgModule({
  declarations: [
    ReservationsComponent,
    ReservationsGridComponent,
    AddEditReservationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReservationsRoutingModule,
    SharedModule,
    TextMaskModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ItemsModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSelectModule,
    MatSliderModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
})
export class ReservationsModule {}
