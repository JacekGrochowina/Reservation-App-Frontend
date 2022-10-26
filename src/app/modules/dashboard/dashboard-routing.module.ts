import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardRouting } from './utils/dashboard-routing.enum';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: DashboardRouting.home,
        component: HomeComponent,
      },
      {
        path: DashboardRouting.cars,
        loadChildren: () =>
          import('./pages/cars/cars.module').then((m) => m.CarsModule),
      },
      {
        path: DashboardRouting.info,
        loadChildren: () =>
          import('./pages/info/info.module').then((m) => m.InfoModule),
      },
      {
        path: '**',
        component: HomeComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
