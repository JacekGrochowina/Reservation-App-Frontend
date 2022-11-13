import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups.component';
import { GroupDetailsComponent } from './pages/group-details/group-details.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
  },
  {
    path: ':id',
    component: GroupDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
