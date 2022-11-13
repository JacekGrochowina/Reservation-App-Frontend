import { GroupDetailsComponent } from './pages/group-details/group-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GroupDetailsInfoComponent } from './pages/group-details/components/group-details-info/group-details-info.component';
import { GroupsComponent } from './groups.component';
import { AddEditGroupComponent } from './components/add-edit-group/add-edit-group.component';
import { GroupDetailsTitleComponent } from './pages/group-details/components/group-details-title/group-details-title.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsRoutingModule } from './groups-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { GroupsTableComponent } from './components/groups-table/groups-table.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupsTableComponent,
    AddEditGroupComponent,
    GroupDetailsComponent,
    GroupDetailsInfoComponent,
    GroupDetailsTitleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroupsRoutingModule,
    SharedModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class GroupsModule {}
