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
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [ReservationsComponent],
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
  ],
  providers: [MatDatepickerModule],
})
export class ReservationsModule {}
