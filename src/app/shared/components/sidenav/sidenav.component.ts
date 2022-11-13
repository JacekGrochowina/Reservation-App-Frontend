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
      name: 'Rezerwacje',
      icon: 'event_note',
      path: DashboardRouting.reservations,
    },
    {
      name: 'Przedmioty',
      icon: 'category',
      path: DashboardRouting.items,
    },
    {
      name: 'Grupy',
      icon: 'dynamic_feed',
      path: DashboardRouting.groups,
    },
    {
      name: 'O programie',
      icon: 'info',
      path: DashboardRouting.info,
    },
  ];

}
