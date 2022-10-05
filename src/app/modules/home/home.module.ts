import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddEditCarComponent } from './components/add-edit-car/add-edit-car.component';
import { CarsTableComponent } from './components/cars-table/cars-table.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { CarDetailsInfoComponent } from './pages/car-details/components/car-details-info/car-details-info.component';
import { CarDetailsTitleComponent } from './pages/car-details/components/car-details-title/car-details-title.component';

@NgModule({
  declarations: [
    HomeComponent,
    CarsTableComponent,
    AddEditCarComponent,
    CarDetailsComponent,
    CarDetailsInfoComponent,
    CarDetailsTitleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    SharedModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class HomeModule {}
