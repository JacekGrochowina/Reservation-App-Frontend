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
        path: DashboardRouting.reservations,
        loadChildren: () =>
          import('./pages/reservations/reservations.module').then((m) => m.ReservationsModule),
      },
      {
        path: DashboardRouting.items,
        loadChildren: () =>
          import('./pages/items/items.module').then((m) => m.ItemsModule),
      },
      {
        path: DashboardRouting.groups,
        loadChildren: () =>
          import('./pages/groups/groups.module').then((m) => m.GroupsModule),
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
