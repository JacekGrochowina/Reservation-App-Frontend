import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent,
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
export class CarsRoutingModule {}
