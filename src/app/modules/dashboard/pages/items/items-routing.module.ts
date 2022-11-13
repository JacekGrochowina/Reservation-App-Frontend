import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
  },
  {
    path: ':id',
    component: CarDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
