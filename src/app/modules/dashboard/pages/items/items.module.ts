import { ItemDetailsComponent } from './pages/car-details/item-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemDetailsInfoComponent } from './pages/car-details/components/item-details-info/item-details-info.component';
import { ItemsComponent } from './items.component';
import { AddEditItemComponent } from './components/add-edit-item/add-edit-item.component';
import { ItemDetailsTitleComponent } from './pages/car-details/components/item-details-title/item-details-title.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsRoutingModule } from './items-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { ItemsTableComponent } from './components/items-table/items-table.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemsTableComponent,
    AddEditItemComponent,
    ItemDetailsComponent,
    ItemDetailsInfoComponent,
    ItemDetailsTitleComponent,
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
    MatSelectModule,
    MatCheckboxModule,
  ],
})
export class ItemsModule {}
