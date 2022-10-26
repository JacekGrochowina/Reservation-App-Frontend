import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Routing } from './shared/utils/enums/routing.enum';

const routes: Routes = [
  {
    path: Routing.login,
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: Routing.dashboard,
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    useHash: true,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
