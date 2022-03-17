import { Component, OnInit } from '@angular/core';
import { SidenavItemInterface } from './interfaces/sidenav-item.interface';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  sidenavList: SidenavItemInterface[] = [
    {
      name: 'Podsumowanie',
      icon: 'analytics',
      path: '',
    },
    {
      name: 'Kierowcy',
      icon: 'people',
      path: 'kierowcy',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

}
