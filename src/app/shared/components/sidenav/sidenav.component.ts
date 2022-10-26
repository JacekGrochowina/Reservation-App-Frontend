import { Component } from '@angular/core';
import { SidenavItemInterface } from './interfaces/sidenav-item.interface';
import { Routing } from '../../utils/enums/routing.enum';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  sidenavList: SidenavItemInterface[] = [
    {
      name: 'Samochody',
      icon: 'directions_car',
      path: Routing.main,
    },
    {
      name: 'O programie',
      icon: 'info',
      path: Routing.info,
    },
  ];

}
