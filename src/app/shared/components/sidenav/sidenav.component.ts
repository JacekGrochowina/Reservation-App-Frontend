import { Component } from '@angular/core';
import { SidenavItemInterface } from './interfaces/sidenav-item.interface';
import { DashboardRouting } from '../../../modules/dashboard/utils/dashboard-routing.enum';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  sidenavList: SidenavItemInterface[] = [
    {
      name: 'Domowa',
      icon: 'home',
      path: DashboardRouting.home,
    },
    {
      name: 'Samochody',
      icon: 'directions_car',
      path: DashboardRouting.cars,
    },
    {
      name: 'O programie',
      icon: 'info',
      path: DashboardRouting.info,
    },
  ];

}
