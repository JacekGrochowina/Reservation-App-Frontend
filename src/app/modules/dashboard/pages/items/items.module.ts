import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarDetailsInfoComponent } from './pages/car-details/components/car-details-info/car-details-info.component';
import { ItemsComponent } from './items.component';
import { AddEditCarComponent } from './components/add-edit-car/add-edit-car.component';
import { CarDetailsTitleComponent } from './pages/car-details/components/car-details-title/car-details-title.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsRoutingModule } from './items-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { CarsTableComponent } from './components/cars-table/cars-table.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ItemsComponent,
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
    ItemsRoutingModule,
    SharedModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ItemsModule {}
